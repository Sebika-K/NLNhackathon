# 🌼 DIDI (दिदी) — A Safe Space for You

DIDI is a mobile-first application designed to provide a gentle, supportive, and culturally sensitive digital companion for Nepali women.

The app helps users:
- reflect on their emotions  
- understand their mental and physical state  
- express thoughts safely  
- receive supportive, AI-powered guidance  

---

## ✨ Features

### Frontend
- 🌿 Calm and aesthetic onboarding experience  
- 💭 Emotion selection (internal feelings)  
- 🧠 Body awareness (physical discomfort check)  
- 🌸 “Sapana Space” for expression and dreams  
- 📱 Smooth multi-screen navigation  
- 🎨 Clean, soft, user-centered UI  

### Backend
- 🔐 User authentication (Supabase Auth)  
- 📊 Daily check-in system (mood + pain points + dream space)  
- 🧠 AI-powered recommendations (Claude + Gemini)  
- 📖 Curated story feed based on user state  
- 📈 Emotional dashboard + Hope Notes  
- 🚨 Smart alert system for consecutive low moods  

---

## 🏗️ Architecture Overview

```
Mobile App (React Native + Expo)
        │
        ▼
Express REST API (TypeScript, Vercel Serverless)
        │
   ┌────┴───────────────┐
   │                    │
Supabase           AI Layer
(Database + Auth)  (Claude + Gemini)
```

---

## 🛠️ Tech Stack

### Frontend
- React Native  
- Expo (SDK 54)  
- React Navigation  
- JavaScript  

### Backend
- Node.js (LTS)  
- TypeScript  
- Express 5  
- Supabase (Database + Auth)  
- Anthropic Claude SDK  
- Google Gemini  
- Vercel (Deployment)  

---

## 📂 Project Structure

```
NLNhackathon/
│
├── frontend/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── FeelingsScreen.js
│   │   └── SapanaScreen.js
│   │   ├── StoriesScreen.js
│   │   └── CommunityScreen.js
│   │   ├── ReviewScreen.js
│   │   └── StoryDetailScreen.js
│   │   ├── SuggestionScreen.js
│   ├── assets/
│   ├── App.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── utils/
│   │   └── middleware/
│   └── vercel.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/Sebika-K/NLNhackathon.git
cd NLNhackathon
```

---

## 📱 Frontend Setup

```
cd frontend
npm install
npx expo start
```

### Run on device:
- Download Expo Go  
- Scan QR code  

---

## ⚙️ Backend Setup

```
cd backend
npm install
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 🔐 Environment Variables (Backend)

Create `.env` inside `backend/`:

```
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key

ANTHROPIC_API_KEY=your-key
GOOGLE_GEMINI_API_KEY=your-key

PORT=3000
NODE_ENV=development
```

---

## 🔗 API Overview

### Auth
- POST /api/auth/register  
- POST /api/auth/login  
- PATCH /api/auth/persona  

### Check-In
- POST /api/checkin  
- GET /api/checkin/history  

### Stories
- GET /api/stories  
- GET /api/stories/:id  

### Dashboard
- GET /api/dashboard  

### Alerts
- GET /api/alerts  
- POST /api/alerts/dismiss  

---

## 📱 App Flow

1. Home Screen → User selects intent  
2. Feelings Screen → Select emotions + body discomfort  
3. Sapana Space → Express thoughts and interests  
4. Backend → AI generates insights and recommendations  

---

## 🎨 Design Philosophy

DIDI is built around:
- Emotional safety  
- Cultural sensitivity  
- Simplicity  
- Soft and calming UI  

Goal:

"Make users feel seen, safe, and supported."

---

## 🚀 Deployment

Backend deployed on Vercel (serverless)

---

## 👩‍💻 Team

- Sebika Khulal — Frontend  
- Mariska Rai  - UI/UX +Frontend
- Bimarsha Poudel - Backend 
- Shreshu Bhetuwal  - Backend

---

## 🌱 Future Improvements

- Persistent user journaling  
- Personalized AI companion chat  
- Community support features  
- Crisis support integrations  

---

## 💛 Note

Built with ❤️ at NLN Hackathon 2026  
to create meaningful, human-centered technology for women.
