const crypto = require('crypto');

const encrypt = (password) => {
    /* creating a unique salt */
    const salt = crypto.randomBytes(16).toString('hex');

    /* hashing user's salt and password with 1000 iterations, 64 length and sha512 digest */
    const hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex');

    return {
        hash: hashPassword,
        salt: salt,
    };
};

/* checks for valid password */
const validPassword = (loginPassword, hashPassword, salt) => {
    const hash = crypto.pbkdf2Sync(loginPassword, salt, 1000, 64, `sha512`).toString('hex');
    return hashPassword === hash;
};

module.exports = { encrypt, validPassword };