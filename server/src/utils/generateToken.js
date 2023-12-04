import jwt from 'jsonwebtoken';

const jwtsecret = 'YOUR JWT SECRET';

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, jwtsecret, {
        expiresIn: '30d',
    });

    return token;
};

export default generateToken;
