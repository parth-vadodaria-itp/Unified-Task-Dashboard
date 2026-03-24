import { addToken, getTokenById, isExist } from "../repository/tokenRepo.js";
import { decrypt, encrypt } from "../utils/cryptoUtils.js";

const storeEncryptedToken = (id, token) => {
    const { iv, ciphertext, tag } = encrypt(token);
    addToken([id, iv, ciphertext, tag]);
};

const retrieveDecryptedToken = (id) => {
    const encryptedToken = getTokenById(id);
    return decrypt(encryptedToken);
};

const checkTokenExistence = (id) => {
    return isExist(id);
};

export { storeEncryptedToken, retrieveDecryptedToken, checkTokenExistence };
