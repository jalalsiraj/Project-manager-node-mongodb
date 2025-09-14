const Projects = require('../models/projects');
const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const rbac = require('../middlewares/rbac');
const { to, ReE, ReS } = require('../global-functions');


const getAllProjects = async function (req, res) {
    const tenantId = req?.params?.tenantId;
    const managerId = req?.params?.managerId;
    if (tenantId) {
        let whereClause = {
            tenantId: tenantId
        }
        if (managerId) {
            whereClause['managerId'] = managerId;
        }
        let [getProjectsErr, projects] = await to(Projects.find(whereClause).populate({ path: 'managerId', as: 'manager' }));
        if (getProjectsErr) {
            console.log(getProjectsErr);
            return ReE(res, getProjectsErr, 422);
        } else if (projects) {
            return ReS(res, projects, 200);
        }
    }
}

const updateProject = async function (req, res) {
    const id = req?.params?.id ?? null;
    const data = req?.body ? req.body : null;
    if (id && data) {
        const [updateErr, updatedProject] = await to(Projects.findByIdAndUpdate(id, data, { new: true }));
        if (updateErr) {
            return ReE(res, updateErr, 422);
        } else if (updatedProject) {
            return ReS(res, updatedProject, 200)
        }
    }
}

const deleteProject = async function (req, res) {
    const id = req?.params?.id ?? null;
    if (id) {
        const [updateErr, deletedProject] = await to(Projects.findByIdAndDelete(id));
        if (updateErr) {
            return ReE(res, updateErr, 422);
        } else if (deletedProject) {
            return ReS(res, { message: "Project Deleted successfully", deletedProject }, 200)
        }
    }
}

const createProject = async function (req, res) {
    const projectData = req?.body ? req.body : null;
    if (projectData) {
        let [createProjectErr, newProject] = await to(Projects.create(projectData));
        if (createProjectErr) {
            return ReE(res, createProjectErr, 422);
        }
        else if (newProject) {
            return ReS(res, newProject, 200);
        }
    }
}


router.post('/', passport.authenticate('jwt', { session: false }), rbac(['admin', 'manager']), createProject)
router.get('/', passport.authenticate('jwt', { session: false }), rbac(['admin', 'manager', 'viewer']), getAllProjects)
router.put('/:id', passport.authenticate('jwt', { session: false }), rbac(['admin', 'manager']), updateProject)
router.delete('/:id', passport.authenticate('jwt', { session: false }), rbac(['admin']), deleteProject)

module.exports = { router };