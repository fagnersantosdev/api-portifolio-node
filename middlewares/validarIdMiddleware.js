
const { validarId } = require('../validators/projetoValidator');

function validarIdMiddleware(req, res, next) {
    const id = req.params.id;

    if (!validarId(id)) {
        return res.status(400).json({
            erro: "O ID deve ser um número inteiro positivo"
        });
    }

    next();
}

module.exports = validarIdMiddleware;
