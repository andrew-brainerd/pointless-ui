import moment from 'moment';

const getRelativeDate = date => {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  console.log({
    date,
    today,
    yesterday
  });

  if (moment(date).isSame(today, 'd')) {
    return 'Today at ' + moment(date).format('hh:mm A');
  }

  if (moment(date).isSame(yesterday, 'd')) {
    return 'Yesterday at ' + moment(date).format('hh:mm A');
  }

  return moment(date).format('MMM DD, YYYY hh:mm A');
};

export default getRelativeDate;
