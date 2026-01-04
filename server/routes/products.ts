import express from 'express';
import { supabaseAdmin } from '../config/database';
import { Product } from '../../types';

const router = express.Router();
const PROFIT_MARGIN = parseFloat(process.env.PROFIT_MARGIN || '0.15');

// Get all products (approved only by default)
router.get('/', async (req, res) => {
  try {
    const { category, status = 'approved', limit, offset } = req.query;
    
    let query = supabaseAdmin
      .from('products')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (category && category !== 'الكل') {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.limit(parseInt(limit as string));
    }

    if (offset) {
      query = query.range(parseInt(offset as string), parseInt(offset as string) + (parseInt(limit as string) || 20) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ products: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ product: data });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Create product (Admin only)
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    
    // Calculate final price with profit margin
    const finalPrice = Math.round(product.original_price * (1 + PROFIT_MARGIN));
    
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{
        ...product,
        final_price: finalPrice,
        profit_margin: PROFIT_MARGIN
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ product: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    // Recalculate final price if original_price changed
    if (updates.original_price) {
      updates.final_price = Math.round(updates.original_price * (1 + PROFIT_MARGIN));
      updates.profit_margin = PROFIT_MARGIN;
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ product: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Approve product (Admin only)
router.patch('/:id/approve', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({ status: 'approved' })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ product: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Reject product (Admin only)
router.patch('/:id/reject', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({ status: 'rejected' })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ product: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

