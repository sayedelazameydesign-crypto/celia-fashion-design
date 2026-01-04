import React, { useState } from 'react';
import { VODAFONE_CASH_NUMBER, WHATSAPP_NUMBER } from '../constants';

interface VodafonePaymentProps {
  total: number;
  orderId?: string;
  onReceiptUpload?: (file: File) => void;
}

const VodafonePayment: React.FC<VodafonePaymentProps> = ({ 
  total, 
  orderId,
  onReceiptUpload 
}) => {
  const [copied, setCopied] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(VODAFONE_CASH_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `مرحباً، أريد تأكيد طلب رقم ${orderId || 'جديد'}\n` +
      `المبلغ: ${total} ر.س\n` +
      `رقم فودافون كاش: ${VODAFONE_CASH_NUMBER}`
    );
    window.open(`https://wa.me/20${WHATSAPP_NUMBER.replace(/^0/, '')}?text=${message}`, '_blank');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (onReceiptUpload) {
        onReceiptUpload(file);
      }
    }
  };

  // حساب المبلغ بالجنيه المصري (تقريبي - سعر الصرف متغير)
  const totalEGP = Math.round(total * 8.5); // تقريبي 1 SAR = 8.5 EGP

  return (
    <div className="space-y-6">
      {/* Payment Instructions */}
      <div className="p-8 bg-gradient-to-br from-rose-600/10 to-rose-600/5 rounded-2xl border-2 border-rose-600/30 animate-reveal">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center font-tech font-black text-white text-lg">
            💳
          </div>
          <div>
            <p className="text-sm font-tech font-bold text-white uppercase tracking-widest">
              VODAFONE CASH PAYMENT
            </p>
            <p className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest">
              Local Transfer Protocol
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Amount Display */}
          <div className="bg-black/40 p-6 rounded-xl border border-white/10">
            <p className="text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">المبلغ المطلوب</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-cyber-acid">{total} ر.س</span>
              <span className="text-sm text-zinc-500">≈ {totalEGP.toLocaleString()} ج.م</span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-black/60 p-6 rounded-xl border-2 border-cyber-acid/30 relative">
            <p className="text-[10px] text-cyber-acid mb-4 uppercase tracking-widest font-bold">
              رقم فودافون كاش
            </p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-4xl font-tech font-black text-white tracking-widest select-all flex-1 text-center">
                {VODAFONE_CASH_NUMBER}
              </span>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-cyber-acid/20 hover:bg-cyber-acid/30 border border-cyber-acid/50 rounded-xl transition-all flex items-center gap-2 text-cyber-acid font-bold text-sm"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    تم النسخ! ✓
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    نسخ
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <p className="text-[10px] font-tech text-cyber-acid uppercase tracking-widest font-bold">
              خطوات الدفع:
            </p>
            <ol className="text-sm text-zinc-300 space-y-3 text-right">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-cyber-acid text-black rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span>افتح تطبيق فودافون كاش على هاتفك</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-cyber-acid text-black rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span>اختر "إرسال أموال" ثم "إرسال لرقم محمول"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-cyber-acid text-black rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <span>أدخل الرقم: <span className="font-black text-cyber-acid">{VODAFONE_CASH_NUMBER}</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-cyber-acid text-black rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <span>أدخل المبلغ: <span className="font-black text-cyber-acid">{total} ر.س</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-cyber-acid text-black rounded-full flex items-center justify-center font-bold text-xs">5</span>
                <span>أكمل عملية التحويل واحفظ الإيصال</span>
              </li>
            </ol>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={openWhatsApp}
            className="w-full py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#25D366]/20"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>إرسال إيصال عبر الواتساب</span>
          </button>

          {/* Receipt Upload */}
          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-cyber-acid/50 transition-all">
            <input
              type="file"
              id="receipt-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="receipt-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              {receiptPreview ? (
                <div className="w-full space-y-3">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="w-full max-h-64 object-contain rounded-xl border border-white/10"
                  />
                  <p className="text-sm text-cyber-acid text-center font-bold">
                    ✓ تم رفع الإيصال - اضغط لتغييره
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border-2 border-dashed border-white/20">
                    <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white mb-1">
                      رفع صورة الإيصال
                    </p>
                    <p className="text-xs text-zinc-400">
                      اضغط لاختيار صورة إيصال الدفع
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ⚠️ ملاحظات مهمة:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1 text-right">
              <li>• تأكد من التحويل للمبلغ الصحيح: <span className="font-bold text-cyber-acid">{total} ر.س</span></li>
              <li>• احفظ إيصال الدفع</li>
              <li>• سيتم تأكيد الطلب خلال 24 ساعة بعد استلام الإيصال</li>
              <li>• للاستفسارات: واتساب <span className="font-bold">{WHATSAPP_NUMBER}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VodafonePayment;

