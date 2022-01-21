import moment from 'moment-timezone';

export const format = (UTCtime: string) => {
    return moment(UTCtime).format()
};
