const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

async function createToken(user) {
    const { role, id } = user;
    const payload = { data: { id, role } };
    const token = jwt.sign(payload, secret);
    return token;
}

const readToken = async (token) => {
    let data;
    jwt.verify(token, secret, (_err, decoded) => {
      data = decoded.data;
    });
    return data;
};

module.exports = { createToken, readToken };