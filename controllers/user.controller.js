const { to, ReE, ReS } = require('../global-functions');
const userService = require('../services/user/user.service');
const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const rbac = require('../middlewares/rbac');

const registerTenant = async function (req, res) {
    const registerData = req?.body ?? null;
    if (registerData) {
        let registeredTenant = await userService.registerTenant(registerData);
        if (registeredTenant?.errorResponse || registeredTenant?.errors) {
            return ReE(res, registeredTenant, 422)
        }
        else if (registeredTenant) {
            return ReS(res, { message: "Tenant registered successfully", registeredTenant }, 200);
        }
    }
}

const registerUser = async function (req, res) {
    let registerData = req?.body ?? null;
    if (registerData) {
        registerData['tenantId'] = req?.params?.tenantId;
        const registeredUser = await userService.registerUser(registerData);
        if (registeredUser?.errorResponse || registeredUser?.errors) {
            return ReE(res, { message: "Failed to create user", error: registeredUser, success: false }, 422)
        }
        else if (registeredUser) {
            return ReS(res, { message: "User registered successfully", userDetails: registeredUser, success: true }, 200);
        }
    }
}

const login = async function (req, res) {
    const loginData = req?.body ?? null;
    if (loginData) {
        const loginSuccess = await userService.login(loginData);
        if (loginSuccess?.errorResponse || loginSuccess?.errors || loginSuccess?.code) {
            console.log("Error while sigining in", loginSuccess);
            return ReE(res, { message: "Failed to login", error: loginSuccess.message, success: false }, 422)
        }
        else if (loginSuccess) {
            return ReS(res, { message: "Login Successfull", userData: loginSuccess, success: true }, 200);
        }
    }
}

const getOneUserDetails = async function (req, res) {
    const userId = req?.user?.id;
    const tenantId = req?.params?.tenantId;
    if (userId && tenantId) {
        const userDetails = await userService.getOneUserDetails({ id: userId, tenantId });
        if (userDetails?.errorResponse) {
            console.log("Error while getting user Details", userDetails);
            return ReE(res, { message: "Failed to get user details", error: loginSuccess.message, success: false }, 422)
        }
        else if (userDetails) {
            return ReS(res, { message: "User data fetched successfully", userDetails, success: true }, 200);
        }
    }
}

const getAllManagers = async function (req, res) {
    const tenantId = req?.params?.tenantId;
    if (tenantId) {
        const managersDetails = await userService.getAllManagers(tenantId);
        if (managersDetails?.errorResponse) {
            console.log("Error while getting all managers", userDetails);
            return ReE(res, { message: "Failed to get Managers list", error: loginSuccess.message, success: false }, 422)
        }
        else if (managersDetails) {
            return ReS(res, { message: "Managers data fetched successfully", managersList: managersDetails, success: true }, 200);
        }
    }
}

router.post('/register', registerTenant);
router.post('/:tenantId/user', registerUser);
router.post('/auth/login', login);
router.get('/:tenantId/user_details/:id', passport.authenticate('jwt', { session: false }), rbac(['admin', 'manager', 'viewer']), getOneUserDetails);
router.get('/:tenantId/managers', passport.authenticate('jwt', { session: false }), rbac(['admin', 'manager', 'viewer']), getAllManagers)

module.exports = { router }