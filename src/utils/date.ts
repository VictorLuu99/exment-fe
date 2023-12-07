import moment from 'moment';

export const formatMonthYear = (createdAt: string): string => {
    const dateString = new Date(createdAt).toDateString();
    const [, month, , year] = dateString.split(' ');
    return `${month} ${year}`;
};

export const formatFullTimeString = (date: string): string => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};
