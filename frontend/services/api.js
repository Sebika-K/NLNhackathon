const BASE_URL = 'https://didi-project-6ep4gc17s-rijulpoudel72-9569s-projects.vercel.app';

// Hardcoded user ID for hackathon (no auth system)
export const USER_ID = '00000000-0000-0000-0000-000000000001';

export async function submitCheckin({ mood_score, pain_points, hobby, goal, category }) {
  const res = await fetch(`${BASE_URL}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, mood_score, pain_points, hobby, goal, category }),
  });
  return res.json();
}

export async function getRecommendation({ mood_score, dream_space }) {
  const res = await fetch(`${BASE_URL}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood_score, dream_space }),
  });
  return res.json();
}

export async function getDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard/${USER_ID}`);
  return res.json();
}

export async function checkAlert() {
  const res = await fetch(`${BASE_URL}/alert/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: USER_ID }),
  });
  return res.json();
}
