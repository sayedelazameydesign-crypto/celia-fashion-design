import express from 'express';
import { supabaseAdmin } from '../config/database';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { user_id, status } = req.query;
    
    let query = supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(*))')
      .order('created_at', { ascending: false });

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ orders: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Order not found' });

    res.json({ order: data });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { user_id, items, shipping_address, billing_address, payment_method, vodafone_cash_number } = req.body;

    // Calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('final_price')
        .eq('id', item.product_id)
        .single();

      if (!product) throw new Error(`Product ${item.product_id} not found`);

      const unitPrice = product.final_price;
      const itemTotal = unitPrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        selected_size: item.selected_size,
        selected_color: item.selected_color,
        unit_price: unitPrice,
        total_price: itemTotal
      });
    }

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([{
        user_id,
        total_amount: totalAmount,
        status: 'pending',
        payment_method,
        vodafone_cash_number: vodafone_cash_number || process.env.VODAFONE_CASH_NUMBER,
        shipping_address,
        billing_address
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItemsWithOrderId);

    if (itemsError) throw itemsError;

    // Clear user cart
    if (user_id) {
      await supabaseAdmin
        .from('carts')
        .delete()
        .eq('user_id', user_id);
    }

    // Fetch complete order with items
    const { data: completeOrder, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('id', order.id)
      .single();

    if (fetchError) throw fetchError;

    res.status(201).json({ order: completeOrder });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Order not found' });

    res.json({ order: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

