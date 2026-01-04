
import { GoogleGenAI, Type } from "@google/genai";

export const getFashionAdvice = async (userQuery: string, availableProducts: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      أنت "Aura-Bot"، مبرمج المظهر الذكي والمرافق الرقمي لجيل Z والأطفال في متجر "X-AURA 2026" في مصر.
      متجرنا متخصص في ملابس الأطفال التقنية، ملابس شباب GEN-Z، والإكسسوارات الذكية.
      
      سؤال العميل: "${userQuery}"
      المخزون المتاح: ${JSON.stringify(availableProducts.map(p => ({ id: p.id, name: p.name, category: p.category, rarity: p.rarity, stylePoints: p.stylePoints })))}
      
      المطلوب منك:
      1. تحدث بلغة عصرية، حيوية، ومرحة (امزج بين لغة الجيمرز والذكاء الاصطناعي).
      2. استخدم مصطلحات مثل "Level Up"، "Epic Loot"، "Style Buff"، "Vibes".
      3. إذا كان السائل طفلاً، شجعه واجعله يشعر كأنه بطل خارق (Hero).
      4. قدم ترشيحات محددة من المخزون ترفع "Style Points" الخاصة به.
      5. اجعل الرد قصيراً ومنظماً جداً باستخدام رموز تعبيرية تقنية 🎮⚡🔥.
    `,
  });

  return response.text || "نظام التنسيق الذكي قيد التحديث.. حاول مجدداً لاحقاً!";
};

export const getCompleteTheLook = async (currentProduct: any, availableProducts: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const otherProducts = availableProducts.filter(p => p.id !== currentProduct.id);
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are the X-AURA Outfit Architect for Gen-Z and Kids. 
    Current Item: "${currentProduct.name}" (${currentProduct.category}).
    Task: Select exactly 2 items from the list to create an EPIC look (Style Synergy):
    ${JSON.stringify(otherProducts.map(p => ({ id: p.id, name: p.name, category: p.category })))}
    
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
    return text ? JSON.parse(text) : [];
  } catch {
    return [];
  }
};

export const searchByImage = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: "Analyze this image for Youth/Kids tech-fashion. Return 5 keywords in Arabic describing style, color, and fit. Comma separated." }
      ]
    },
  });

  const text = response.text;
  return text ? text.split(',').map(k => k.trim()) : [];
};
