const mongoose = require('mongoose');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bcypt_p = require('bcrypt-promise');
const { to } = require('../global-functions');
const cryptoService = require('../services/crypto.service');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [String]
});

const Role = mongoose.model("role", roleSchema);

const userSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenant",
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    let err, hash;

    let rounds = crypto.randomInt(4, 10);

    [err, salt] = await to(bcrypt.genSalt(rounds));
    if (err) console.log("error in generating salt");

    [err, hash] = await to(bcrypt.hash(this.password, salt));

    this.password = hash;

    next();
});

const User = mongoose.model("user", userSchema);

User.prototype.getJwt = async function () {
    await this.populate("role");
    let token = "Bearer " +
        jwt.sign(
            {
                id: this._id,
                tenantId: this.tenantId,
                role: this.role.name
            },
            CONFIG.secret_key,
            { expiresIn: CONFIG.jwt_expiration }
        );
    const encryptedToken = cryptoService.encryptDetails(token);
    if (encryptedToken) return encryptedToken;
};

User.prototype.comparePassword = async function (password) {
    if (password) {
        let [err, legitUser] = await to(bcypt_p.compare(password, this.password));
        if (err) {
            console.log("Error in comparing", err.message);
            return false;
        } else if (legitUser) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = User;