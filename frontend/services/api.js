const BASE_URL = 'http://localhost:3000';
const USER_ID = 'demo_user';

export const submitCheckin = async ({ mood_score, pain_points, hobby, goal, category }) => {
  const response = await fetch(`${BASE_URL}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, mood_score, pain_points, hobby, goal, category }),
  });
  return response.json();
};

export const getRecommendation = async ({ mood_score, dream_space }) => {
  const response = await fetch(`${BASE_URL}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood_score, dream_space }),
  });
  return response.json();
};

export const getDashboard = async () => {
  const response = await fetch(`${BASE_URL}/dashboard/${USER_ID}`);
  return response.json();
};
