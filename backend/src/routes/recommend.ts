import { Router, Request, Response } from 'express'
import { geminiModel } from '../lib/claude'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ success: false, error: 'Missing request body' })
  }
  const { mood_score, dream_space } = req.body

  const prompt = `You are DIDI, a warm and supportive mental health companion for Nepalese women. 
  The user's current mood score is ${mood_score} out of 5 (1=very bad, 5=very happy) and their dream is: ${dream_space}. 
  Give one short, inspiring tip or story (3-4 sentences max) in a warm, sisterly tone to encourage them.`

  const result = await geminiModel.generateContent(prompt)
  const text = result.response.text()

  return res.json({ success: true, recommendation: text })
})

export default router