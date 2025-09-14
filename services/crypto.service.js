const cryptoJS = require('crypto-js');

const encryptDetails = function (plainText) {
    const cipherText = cryptoJS.AES.encrypt(plainText.toString(), CONFIG.secret_key).toString();
    return cipherText
}

module.exports.encryptDetails = encryptDetails;

const decryptDetails = function (cipherText) {
    const bytes = cryptoJS.AES.decrypt(cipherText.toString(), CONFIG.secret_key);
    let plainText = bytes.toString(cryptoJS.enc.Utf8);
    return plainText;
}

module.exports.decryptDetails = decryptDetails;
