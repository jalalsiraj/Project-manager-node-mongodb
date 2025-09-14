require('dotenv').config();

CONFIG = {};

CONFIG.db_uri = process.env.DB_URI
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'myencryption'
CONFIG.secret_key = process.env.SECRET_KEY || 'my_secret_key_1234'
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '50000'
CONFIG.permissions = {
    admin: "68c52a1ba62af10580df515d",
    manager: "68c52ae2a62af10580df515e",
    viewer: "68c52b02a62af10580df515f"
}