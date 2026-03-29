import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

// GET all stories
router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30)

  if (error) {
    return res.status(500).json({ success: false, error: error.message })
  }

  return res.json({ success: true, data })
})

// POST new story
router.post('/', async (req: Request, res: Response) => {
  const { user_id, title, body, emotions, perspectives, anonymous } = req.body

  if (!title || !body) {
    return res.status(400).json({ success: false, error: 'Title and body are required' })
  }

  const { data, error } = await supabase
    .from('stories')
    .insert([{ user_id: user_id || 'anonymous', title, body, emotions: emotions || [], perspectives: perspectives || [], anonymous: anonymous ?? true }])
    .select()

  if (error) {
    return res.status(500).json({ success: false, error: error.message })
  }

  return res.json({ success: true, data: data[0] })
})

export default router
