export const convertStringToNumber = (numberstr) => {
    return parseFloat(numberstr.replace(/,/g, ''))
}