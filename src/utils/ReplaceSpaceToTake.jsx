export const ReplaceSpaceToTake = (str) => {
    return str.trim().split(' ').toString().replaceAll(',', '-');
}