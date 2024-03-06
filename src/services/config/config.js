import moment from "moment";

export const API_URL = 'http://localhost:8800/api/v1';
export const USER_TOKEN = 'sampleToken';

export const getFormattedDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };