import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getDailyActivityCounts() {
  const res = await API.get(`${BACKEND_URL}/activity-calendar/daily`, true);
  return res;
}

export default {
  getDailyActivityCounts,
};
