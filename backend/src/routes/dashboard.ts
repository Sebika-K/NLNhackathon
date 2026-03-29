import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params

  // Get last 7 check-ins
  const { data: checkins, error: checkinError } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('user_id', userId)
    .order('checked_in_at', { ascending: false })
    .limit(7)

  if (checkinError) {
    return res.status(500).json({ success: false, error: checkinError.message })
  }

  // Get dream entries
  const { data: dreams, error: dreamError } = await supabase
    .from('dream_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5)

  if (dreamError) {
    return res.status(500).json({ success: false, error: dreamError.message })
  }

  return res.json({ success: true, data: { checkins, dreams } })
})

export default router