const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenant",
        required: true
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Projects = mongoose.model("projects", projectSchema);

module.exports = Projects;