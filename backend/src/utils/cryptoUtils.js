import crypto from "crypto";

const encrypt = (
    jsonData,
    CRYPTO_KEY = Buffer.from(process.env.CRYPTO_KEY, "hex")
) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", CRYPTO_KEY, iv);

    const jsonString = JSON.stringify(jsonData);

    let encrypted = cipher.update(jsonString, "utf-8", "base64");
    encrypted += cipher.final("base64");

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("base64"),
        ciphertext: encrypted,
        tag: authTag.toString("base64"),
    };
};

const decrypt = (
    encryptedObj,
    CRYPTO_KEY = Buffer.from(process.env.CRYPTO_KEY, "hex")
) => {
    const { iv, ciphertext, tag } = encryptedObj;
    const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        CRYPTO_KEY,
        Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(tag, "base64"));

    let decrypted = decipher.update(ciphertext, "base64", "utf-8");
    decrypted += decipher.final("utf-8");

    return JSON.parse(decrypted);
};

export { encrypt, decrypt };
