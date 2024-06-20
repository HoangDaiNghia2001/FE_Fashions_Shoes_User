export const RemoverAccents = (str) => {
    return str("NFD").replace(/[\u0300-\u036f]/g, "")
}