import express from 'express';
import { supabaseAdmin } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all affiliates
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('affiliates')
      .select('*, users(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ affiliates: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get affiliate by code
router.get('/code/:code', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('affiliates')
      .select('*, users(*)')
      .eq('affiliate_code', req.params.code)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ affiliate: data || null });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get affiliate dashboard data
router.get('/:id/dashboard', async (req, res) => {
  try {
    const affiliateId = req.params.id;

    // Get affiliate info
    const { data: affiliate, error: affiliateError } = await supabaseAdmin
      .from('affiliates')
      .select('*')
      .eq('id', affiliateId)
      .single();

    if (affiliateError) throw affiliateError;

    // Get commissions
    const { data: commissions, error: commissionsError } = await supabaseAdmin
      .from('affiliate_commissions')
      .select('*')
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false });

    if (commissionsError) throw commissionsError;

    // Get clicks
    const { data: clicks, error: clicksError } = await supabaseAdmin
      .from('affiliate_clicks')
      .select('*')
      .eq('affiliate_id', affiliateId)
      .order('clicked_at', { ascending: false });

    if (clicksError) throw clicksError;

    res.json({
      affiliate,
      commissions: commissions || [],
      clicks: clicks || [],
      stats: {
        total_clicks: affiliate.total_clicks,
        total_sales: affiliate.total_sales,
        total_commission: affiliate.total_commission
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create affiliate
router.post('/', async (req, res) => {
  try {
    const { user_id } = req.body;

    // Generate unique affiliate code
    const affiliateCode = `AFF${uuidv4().substring(0, 8).toUpperCase()}`;

    const { data, error } = await supabaseAdmin
      .from('affiliates')
      .insert([{
        user_id,
        affiliate_code: affiliateCode
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ affiliate: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Track affiliate click
router.post('/:code/click', async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    // Get affiliate by code
    const { data: affiliate, error: affiliateError } = await supabaseAdmin
      .from('affiliates')
      .select('id')
      .eq('affiliate_code', req.params.code)
      .single();

    if (affiliateError || !affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Record click
    const { error: clickError } = await supabaseAdmin
      .from('affiliate_clicks')
      .insert([{
        affiliate_id: affiliate.id,
        product_id,
        user_id
      }]);

    if (clickError) throw clickError;

    // Update affiliate total clicks
    const { data: currentAffiliate } = await supabaseAdmin
      .from('affiliates')
      .select('total_clicks')
      .eq('id', affiliate.id)
      .single();

    if (currentAffiliate) {
      await supabaseAdmin
        .from('affiliates')
        .update({ total_clicks: (currentAffiliate.total_clicks || 0) + 1 })
        .eq('id', affiliate.id);
    }

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

