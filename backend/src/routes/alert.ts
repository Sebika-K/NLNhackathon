import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.post('/check', async (req: Request, res: Response) => {
  const { userId } = req.body

  // Get last 5 check-ins
  const { data, error } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('user_id', userId)
    .order('checked_in_at', { ascending: false })
    .limit(5)

  if (error) {
    return res.status(500).json({ success: false, error: error.message })
  }

  // If 3 or more have mood_score of 1 or 2 (bad), trigger alert
  const badDays = data.filter((c: any) => c.mood_score <= 2)

  if (badDays.length >= 3) {
    await supabase
      .from('alerts')
      .insert([{
        user_id: userId,
        alert_type: 'consecutive_bad_days'
      }])

    return res.json({ success: true, triggered: true })
  }

  return res.json({ success: true, triggered: false })
})

export default router