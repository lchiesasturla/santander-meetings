const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            msg_es: 'El usuario debe estar autenticado para esta funcionalidad.',
            msg_en: 'User must be authenticated for this functionality.'
        })
    }

    try{
        const encrypted = jwt.verify(token, process.env.SECRET_WORD);
        req.user = encrypted.user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg_es: 'El usuario debe estar autenticado para esta funcionalidad.',
            msg_en: 'User must be authenticated for this functionality.'
        });
    }
}