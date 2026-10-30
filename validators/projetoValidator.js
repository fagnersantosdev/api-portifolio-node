
const camposPermitidos = [
    "nome",
    "tecnologia",
    "status"
];

const statusPermitidos = [
    "Em desenvolvimento",
    "Concluído",
    "Em planejamento"
];

// Verifica se os valores são textos não vazios
function validarValores(dados) {
    const camposRecebidos = Object.keys(dados);

    return camposRecebidos.some(campo => {
        return typeof dados[campo] !== 'string' ||
               dados[campo].trim() === '';
    });
}

// Identifica campos que não são permitidos
function verificarCamposInvalidos(dados) {
    const camposRecebidos = Object.keys(dados);

    return camposRecebidos.filter(
        campo => !camposPermitidos.includes(campo)
    );
}

// Verifica se o status é permitido
function validarStatus(status) {
    return statusPermitidos.includes(status);
}

// Exporta as funções e constantes
module.exports = {
    validarValores,
    verificarCamposInvalidos,
    validarStatus,
    camposPermitidos,
    statusPermitidos
};
