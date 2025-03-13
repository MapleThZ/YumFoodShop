export function getCurrentDayMonthAndYear() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    return { day, month, year };
}