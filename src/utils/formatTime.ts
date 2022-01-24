import moment from 'moment-timezone';

/**
 * //根据传入的UTC时间串和现在的时间对比，找出时间差
 * @param create_time
 * @returns
 */
export const renderDiffNow = (create_time: string) => {
  const count = moment().diff(moment(create_time), 'days');
  if (count < 1) {
    return `Published ${moment().diff(moment(create_time), 'hours')}}`;
  } else if (count === 1) {
    return `Published ${count} day ago`;
  } else if (count <= 3) {
    return `Published ${count} days ago`;
  } else {
    return `Published on ${moment(create_time).format('YYYY:MM:DD')}`;
  }
};
