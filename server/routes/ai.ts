import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { supabaseAdmin } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }
  return new GoogleGenAI({ apiKey });
};

// Get fashion advice - Enhanced Aura-Bot
router.post('/advice', async (req, res) => {
  try {
    const { 
      query, 
      age_range, 
      size, 
      favorite_colors, 
      budget,
      lang = 'ar' // default Arabic
    } = req.body;

    // Get all approved products with full details
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('id, name, category, rarity, style_points, original_price, final_price, image, description, sizes, colors, tags')
      .eq('status', 'approved');

    if (!products || products.length === 0) {
      return res.json({
        advice: lang === 'ar' 
          ? '🔥 لا توجد منتجات معتمدة حالياً! جاري تحديث المخزون...' 
          : '🔥 No approved products available! Updating inventory...',
        products: []
      });
    }

    // Filter products by budget if provided
    let filteredProducts = products;
    if (budget) {
      filteredProducts = products.filter(p => p.final_price <= budget);
    }

    // Prepare products data for AI
    const productsForAI = filteredProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      rarity: p.rarity,
      style_points: p.style_points,
      original_price: p.original_price,
      final_price: p.final_price,
      image: p.image,
      sizes: p.sizes || [],
      colors: p.colors || [],
      tags: p.tags || []
    }));

    const ai = getGeminiClient();
    
    // Detect language from query if not provided
    const detectedLang = lang || (query.match(/[a-zA-Z]/g)?.length > query.match(/[ء-ي]/g)?.length ? 'en' : 'ar');
    
    const systemPrompt = detectedLang === 'ar' ? `
أنت "Aura-Bot"، الوكيل الذكي لأزياء جيل Z في Celia Fashion Design 🚀
مهمتك: تقديم نصائح موضة بتنسيق GEN-Z مع مصطلحات مثل "Level Up" 🎮، "Epic Loot" 💎، "Glow Up" ✨

المعايير:
- العمر: ${age_range || 'غير محدد'}
- المقاس: ${size || 'غير محدد'}
- الألوان المفضلة: ${favorite_colors || 'غير محدد'}
- الميزانية: ${budget ? `${budget} ر.س` : 'غير محددة'}

المطلوب:
1. اختر 2-3 منتجات معتمدة فقط (approved) تناسب المعايير
2. تحدث بلغة GEN-Z عصرية ومرحة 🔥
3. أظهر: الاسم، السعر النهائي (final_price)، الصورة
4. إذا لم يوجد منتج مناسب، اقترح بدائل من نفس التصنيف
5. استخدم Emojis: 🔥✨👟👑🎮⚡
6. اجعل الرد قصيراً وحماسياً (150-200 كلمة)

أرجِع الرد كـ JSON:
{
  "advice": "النص الحماسي بالعربي",
  "recommended_product_ids": ["id1", "id2", "id3"]
}
` : `
You are "Aura-Bot", the GEN-Z fashion co-pilot for Celia Fashion Design 🚀
Your mission: Provide GEN-Z fashion advice with terms like "Level Up" 🎮, "Epic Loot" 💎, "Glow Up" ✨

Criteria:
- Age: ${age_range || 'not specified'}
- Size: ${size || 'not specified'}
- Favorite Colors: ${favorite_colors || 'not specified'}
- Budget: ${budget ? `${budget} EGP` : 'not specified'}

Requirements:
1. Select 2-3 approved products only that match criteria
2. Speak in trendy, fun GEN-Z language 🔥
3. Show: name, final_price, image
4. If no match, suggest alternatives from same category
5. Use Emojis: 🔥✨👟👑🎮⚡
6. Keep reply short & hype (150-200 words)

Return response as JSON:
{
  "advice": "Hype text in English",
  "recommended_product_ids": ["id1", "id2", "id3"]
}
`;

    const userQuery = query || (detectedLang === 'ar' ? 'أريد نصائح موضة' : 'I want fashion advice');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp:latest',
      contents: `${systemPrompt}

User Query: "${userQuery}"

Available Products (APPROVED ONLY):
${JSON.stringify(productsForAI, null, 2)}

IMPORTANT: Only recommend products with status='approved'. Show final_price (already includes 15% profit margin).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            recommended_product_ids: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["advice", "recommended_product_ids"]
        }
      }
    });

    let aiResponse;
    try {
      const text = response.text;
      aiResponse = text ? JSON.parse(text) : { advice: 'Error parsing response', recommended_product_ids: [] };
    } catch (e) {
      aiResponse = { advice: response.text || 'System updating...', recommended_product_ids: [] };
    }

    // Get full product details for recommended items
    const recommendedProducts = filteredProducts.filter(p => 
      aiResponse.recommended_product_ids?.includes(p.id)
    ).slice(0, 3).map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      final_price: p.final_price,
      original_price: p.original_price,
      image: p.image,
      description: p.description,
      sizes: p.sizes,
      colors: p.colors,
      tags: p.tags,
      rarity: p.rarity,
      style_points: p.style_points
    }));

    res.json({
      advice: aiResponse.advice || (detectedLang === 'ar' ? '🔥 جاري المعالجة...' : '🔥 Processing...'),
      products: recommendedProducts,
      lang: detectedLang
    });
  } catch (error: any) {
    console.error('AI Advice Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Complete the look
router.post('/complete-look', async (req, res) => {
  try {
    const { product_id } = req.body;

    // Get current product
    const { data: currentProduct } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get other approved products
    const { data: otherProducts } = await supabaseAdmin
      .from('products')
      .select('id, name, category')
      .eq('status', 'approved')
      .neq('id', product_id);

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp:latest',
      contents: `You are the X-AURA Outfit Architect for Gen-Z and Kids. 
      Current Item: "${currentProduct.name}" (${currentProduct.category}).
      Task: Select exactly 2 items from the list to create an EPIC look (Style Synergy):
      ${JSON.stringify(otherProducts?.map(p => ({ id: p.id, name: p.name, category: p.category })) || [])}
      
      Rule: Return ONLY a JSON array of product IDs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    try {
      const text = response.text;
      const productIds = text ? JSON.parse(text) : [];
      res.json({ product_ids: productIds });
    } catch {
      res.json({ product_ids: [] });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Visual search - Enhanced with Gemini Vision
router.post('/visual-search', async (req, res) => {
  try {
    const { image, lang = 'ar' } = req.body; // base64 image

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Get all approved products first
    const { data: allProducts } = await supabaseAdmin
      .from('products')
      .select('id, name, category, description, image, original_price, final_price, tags, colors, sizes')
      .eq('status', 'approved');

    const ai = getGeminiClient();
    
    const analysisPrompt = lang === 'ar' 
      ? `حلل هذه الصورة لأزياء الشباب/الأطفال التقنية. أرجِع 5-7 كلمات مفتاحية بالعربية تصف: النمط، اللون، القطع، التصنيف (أطفال نيون/شباب GEN-Z/إكسسوارات ملكية/أحذية ذكية). مفصولة بفواصل.`
      : `Analyze this image for Youth/Kids tech-fashion. Return 5-7 keywords describing: style, color, items, category (Neon Kids/GEN-Z Youth/Royal Accessories/Smart Kicks). Comma separated.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp:latest',
      contents: {
        parts: [
          { inlineData: { data: image, mimeType: 'image/jpeg' } },
          { text: analysisPrompt }
        ]
      },
    });

    const text = response.text;
    const keywords = text ? text.split(',').map((k: string) => k.trim()) : [];

    // Match products by keywords (simple keyword matching)
    // In production, you'd use vector similarity or more sophisticated matching
    const matchedProducts = allProducts?.filter(product => {
      const searchText = `${product.name} ${product.category} ${product.description || ''} ${(product.tags || []).join(' ')} ${(product.colors || []).join(' ')}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    }) || [];

    // Sort by relevance (simple: products with more keyword matches rank higher)
    const scoredProducts = matchedProducts.map(product => {
      const searchText = `${product.name} ${product.category} ${product.description || ''}`.toLowerCase();
      const score = keywords.filter(k => searchText.includes(k.toLowerCase())).length;
      return { ...product, relevanceScore: score };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Return top 3 products
    const topProducts = scoredProducts.slice(0, 3).map(p => {
      const { relevanceScore, ...product } = p;
      return {
        ...product,
        final_price: p.final_price, // Already includes 15% margin
        ctaUrl: `/product/${p.id}` // Purchase URL
      };
    });

    // If no matches, return top 3 products from any category
    const fallbackProducts = (allProducts || []).slice(0, 3).map(p => ({
      ...p,
      final_price: p.final_price,
      ctaUrl: `/product/${p.id}`
    }));

    res.json({
      keywords,
      products: topProducts.length > 0 ? topProducts : fallbackProducts,
      lang,
      message: lang === 'ar' 
        ? (topProducts.length > 0 ? '🔥 وجدنا منتجات مشابهة!' : '✨ هذه أفضل المنتجات المتاحة')
        : (topProducts.length > 0 ? '🔥 Found similar products!' : '✨ Here are our top products')
    });
  } catch (error: any) {
    console.error('Visual Search Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

