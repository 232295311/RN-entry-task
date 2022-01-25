import moment from 'moment-timezone';

/**
 * //根据传入的UTC时间串和现在的时间对比，找出时间差
 * @param create_time
 * @returns
 */
export const renderDiffNow = (create_time: string) => {
  const count = moment().diff(moment(create_time), 'days');
  if (count < 1) {
    const hours = moment().diff(moment(create_time), 'hours');
    if (hours < 1) {
      const mins = moment().diff(moment(create_time), 'minutes');
      if (mins < 1) {
        return `Published just now`;
      } else {
        return `Published ${mins} ${mins > 1 ? 'minutes' : 'minute'} ago`;
      }
    } else {
      return `Published ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    }
  } else if (count <= 3) {
    return `Published ${count} ${count > 1 ? 'days' : 'day'} ago`;
  } else {
    return `Published on ${moment(create_time).format('YYYY:MM:DD')}`;
  }
};
