const { TE, to } = require('../../global-functions');
const Tenant = require('../../models/tenant');
const User = require('../../models/user');

const registerTenant = async function (registerData) {
    if (registerData) {
        //creating tenant
        let [tenantCreationerr, registeredTenant] = await to(Tenant.create({
            name: registerData.name,
            adminId: registerData.email
        }));

        if (tenantCreationerr) {
            console.log("inside error", tenantCreationerr);
            return tenantCreationerr;
        }

        //creating an admin user for a tenant
        const userData = {
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            tenantId: registeredTenant._id,
            role: CONFIG.permissions.admin
        }

        let adminDetails = await createUser(userData);

        if (adminDetails?.errors || adminDetails?.errorResponse) {
            console.log("Error while creating user");
            return adminDetails;
        }

        //after successfull creation returning data with jwt token
        else if (adminDetails) {
            // const token = await adminDetails.getJwt();
            // adminDetails._doc['token'] = token;
            delete adminDetails._doc.password;
            return adminDetails;
        }
    }
}

module.exports.registerTenant = registerTenant;


const registerUser = async function (userData) {
    if (userData) {
        userData.role = CONFIG.permissions[userData.role];
        const userDetails = await createUser(userData);
        if (userDetails) {
            if (userDetails.email) return { email: userDetails.email };
            else return userDetails;
        }
    }
}

module.exports.registerUser = registerUser;


const login = async function (authData) {
    if (authData) {
        let [err, userDetails] = await to(User.findOne({ email: authData.email, role: CONFIG.permissions[authData.role], tenantId: authData.tenantId }).populate(['role']));
        if (err) {
            console.log("Error while getting user data", err);
            return TE(err.message);
        }
        if (userDetails) {
            console.log(userDetails);
            let loginSuccess = await userDetails.comparePassword(authData.password);
            if (loginSuccess) {
                let token = await userDetails.getJwt();
                userDetails._doc['token'] = token;
                delete userDetails._doc.password;
                return userDetails;
            } else {
                return { message: "Incorrect Password", code: 1 }
            }
        } else {
            return { message: "User not found or Registered in a different role", code: 2 }
        }
    }
}

module.exports.login = login;


const createUser = async function (userData) {
    if (userData) {
        let [userCreationErr, userDetails] = await to(User.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            tenantId: userData.tenantId,
            role: userData.role
        }));
        if (userCreationErr) {
            console.log("Error while creating user", userCreationErr);
            return userCreationErr;
        }
        if (userDetails) {
            return userDetails;
        }
    }
}


const getOneUserDetails = async function (userData) {
    if (userData) {
        console.log("usersssss", userData);
        const [userErr, user_details] = await to(User.findOne({ _id: userData.id, tenantId: userData.tenantId }).select('-password').populate(['role']));
        if (userErr) {
            return TE(userErr.message);
        } else if (user_details) {
            return user_details;
        }
    }
}

module.exports.getOneUserDetails = getOneUserDetails;

const getAllManagers = async function (tenantId) {
    if (tenantId) {
        const [err, managersList] = await to(User.find({ tenantId: tenantId, role: CONFIG.permissions.manager }).select('-password'));
        if (err) {
            return TE(err.message);
        } else if (managersList) {
            return managersList;
        }
    }
}

module.exports.getAllManagers = getAllManagers;