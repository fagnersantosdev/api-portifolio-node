
function tratarErros(err, req, res, next) {
    console.error("Erro no servidor:", err);

    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({
        erro: "Erro interno do servidor"
    });
}

module.exports = tratarErros;
