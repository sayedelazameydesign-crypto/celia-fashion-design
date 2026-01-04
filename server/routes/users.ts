import express from 'express';
import { supabaseAdmin } from '../config/database';

const router = express.Router();

// Get all users (Admin only)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.json({ user: data });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ user: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.json({ user: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by email
router.get('/email/:email', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', req.params.email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ user: data || null });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

