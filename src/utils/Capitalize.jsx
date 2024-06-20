export const Capitelize = (arr) => {
    return arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
}