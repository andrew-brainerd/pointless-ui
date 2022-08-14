import moment from 'moment';

const getRelativeDate = (date: string) => {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  if (moment(date).isSame(today, 'd')) {
    return 'Today at ' + moment(date).format('h:mm A');
  }

  if (moment(date).isSame(yesterday, 'd')) {
    return 'Yesterday at ' + moment(date).format('h:mm A');
  }

  return moment(date).format('MMM DD, YYYY h:mm A');
};

export default getRelativeDate;
