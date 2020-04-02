export const convertStringToNumber = (numberstr) => {
    return typeof(numberstr) !== 'number' ?  parseFloat(numberstr.replace(/,/g, '')) : numberstr
}