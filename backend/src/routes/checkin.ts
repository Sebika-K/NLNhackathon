import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { user_id, mood_score, pain_points, hobby, goal, category } = req.body

  // Save the check-in
  const { data: checkin, error: checkinError } = await supabase
    .from('daily_checkins')
    .insert([{ user_id, mood_score, pain_points }])
    .select()

  if (checkinError) {
    return res.status(500).json({ success: false, error: checkinError.message })
  }

  // Save dream entry if provided
  if (hobby || goal) {
    await supabase
      .from('dream_entries')
      .insert([{ user_id, hobby, goal, category }])
  }

  return res.json({ success: true, data: checkin[0] })
})

export default router