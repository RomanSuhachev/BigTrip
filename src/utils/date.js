import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const DAYS_COUNT = 10;

const TimeFormat = {
  HOUR_PER_DAY: 1440,
  MINUTE_PER_HOUR: 60,
  MILLISECOND_PER_MINUTE: 60000,
};

const dateConverter = {
  'D MMM': (date) => dayjs(date).format('D MMM'),
  'HH:mm': (date) => dayjs(date).format('HH:mm'),
  'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
  'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};
const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);


const compareTwoDates = (dateA, dateB) => dayjs(dateA).diff(dateB);


const getTimeDuration = (initialDate, expirationDate) => {
  const difference = compareTwoDates(expirationDate, initialDate);
  const duration = dayjs.duration(difference).$d;

  const day = duration.days < DAYS_COUNT ? `0${duration.days}D` : `${duration.days}D`;
  const hour = duration.hours < DAYS_COUNT ? `0${duration.hours}H` : `${duration.hours}H`;
  const minute = duration.minutes < DAYS_COUNT ? `0${duration.minutes}M` : `${duration.minutes}M`;
  const total = (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.HOUR_PER_DAY ? `${day} ${hour} ${minute}` : (difference / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTE_PER_HOUR ? `${hour} ${minute}` : minute;
  return total;
};

const isDateExpired = (date) => dayjs().isAfter(date, 'm');
const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
const isDateCurrent = (date) => dayjs().isSame(date, 'm');

const isEventContinues = (dateFrom, dateTo) => {
  return isDateExpired(dateFrom) && isDateInFuture(dateTo);
};

export {dateConverter, humanizeDate, getTimeDuration, isEventContinues,isDateCurrent,isDateExpired,isDateInFuture,compareTwoDates};
