const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    adminId: {
        type: String,
        unique: true,
        required: [true, 'Admin id is required']
    }
}, { timestamps: true });

const Tenant = mongoose.model("tenant", tenantSchema);

module.exports = Tenant;
