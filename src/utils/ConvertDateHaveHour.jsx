export const ConvertDateHaveHour = (value) => {
    const date = new Date(value);

    const hours = date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${formattedHours}:${minutes} ${amOrPm}`;

    return formattedDate;
}