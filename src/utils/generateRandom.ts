export const generateRandom = (length = 6) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}