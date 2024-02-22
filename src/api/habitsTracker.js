import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getAllHabitsTrackers() {
  const res = await API.get(`${BACKEND_URL}/habits-tracker`, true);
  return res;
}

async function getHabitsTrackersFromTo(data) {
  const res = await API.get(
    `${BACKEND_URL}/habits-tracker/fromTo?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getDailyHabitsTrackers() {
  const res = await API.get(
    `${BACKEND_URL}/habits-tracker/dailyHabitsTrackers`,
    true,
  );
  return res;
}

async function getHabitsTrackersGroupedByDate() {
  const res = await API.get(
    `${BACKEND_URL}/habits-tracker/groupedByDate`,
    true,
  );
  return res;
}

async function deleteHabitsTracker(id) {
  const res = await API.remove(`${BACKEND_URL}/habits-tracker/${id}`, true);
  return res;
}

async function createHabitsTracker(data) {
  const res = await API.post(`${BACKEND_URL}/habits-tracker`, data, true);
  return res;
}

export default {
  getAllHabitsTrackers,
  getHabitsTrackersGroupedByDate,
  deleteHabitsTracker,
  createHabitsTracker,
  getDailyHabitsTrackers,
  getHabitsTrackersFromTo,
};
