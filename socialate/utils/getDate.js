const getDate = () => {

    const fullDateToday = new Date();
    const dateInfo = {
        fullDate: fullDateToday,
        day: fullDateToday.getDate(),
        month: fullDateToday.getMonth() + 1,
        year: fullDateToday.getFullYear(),
        weekDay:fullDateToday.getDay(),
        hour:fullDateToday.getHours(),
        minute:fullDateToday.getMinutes(),
        second:fullDateToday.getSeconds(),
    }
    return dateInfo
}

export default getDate;