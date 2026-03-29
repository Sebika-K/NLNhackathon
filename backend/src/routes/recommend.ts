import { Router, Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { mood_score, dream_space } = req.body

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are DIDI, a warm and supportive mental health companion for Nepalese women.
  The user's current mood score is ${mood_score} out of 5 (1=very bad, 5=very happy) and their dream is: ${dream_space}.
  Give one short, inspiring tip or story (3-4 sentences max) in a warm, sisterly tone to encourage them.`

    const result = await geminiModel.generateContent(prompt)
    const text = result.response.text()

    return res.json({ success: true, recommendation: text })
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Gemini error' })
  }
})

export default router
