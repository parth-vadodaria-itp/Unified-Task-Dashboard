import { db } from "../config/db.js";

const addToken = (data) => {
    db.prepare(
        `INSERT INTO tokens(id, iv, ciphertext, auth_tag) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET iv=excluded.iv, ciphertext=excluded.ciphertext, auth_tag=excluded.auth_tag`
    ).run(data);
};

const getTokenById = (id) => {
    const { iv, ciphertext, auth_tag } = db
        .prepare(`SELECT * FROM tokens WHERE id=?`)
        .get(id);
    return { iv, ciphertext, tag: auth_tag };
};

const isExist = (id) => {
    const row = db
        .prepare(
            `SELECT EXISTS ( SELECT 1 FROM tokens WHERE id=? ) AS is_exist`
        )
        .get(id);

    return Boolean(row.is_exist);
};

export { addToken, getTokenById, isExist };
