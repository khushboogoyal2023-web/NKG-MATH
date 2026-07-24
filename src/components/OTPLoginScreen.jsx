import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, KeyRound, ArrowRight, RefreshCw } from 'lucide-react';
import { generateOTP, saveOTPForPhone, verifyOTP } from '@/lib/otpAuth';
import NKGLogo from '@/components/shared/NKGLogo';

export default function OTPLoginScreen({ onLogin }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('कृपया सही मोबाइल नंबर डालें (कम से कम 10 अंक)');
      return;
    }
    setLoading(true);
    setError('');
    const newOtp = generateOTP();
    saveOTPForPhone(cleaned, newOtp);
    setGeneratedOtp(newOtp);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleVerifyOTP = () => {
    const cleaned = phone.replace(/\D/g, '');
    setError('');
    if (otp.length !== 6) {
      setError('OTP 6 अंकों का होना चाहिए');
      return;
    }
    const success = verifyOTP(cleaned, otp);
    if (success) {
      onLogin();
    } else {
      setError('❌ गलत OTP है! दोबारा कोशिश करें।');
      setOtp('');
    }
  };

  const handleResend = () => {
    const cleaned = phone.replace(/\D/g, '');
    const newOtp = generateOTP();
    saveOTPForPhone(cleaned, newOtp);
    setGeneratedOtp(newOtp);
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-sm relative z-10 border border-white/10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <NKGLogo size="lg" />
          <h1 className="font-heading font-black text-xl sm:text-2xl text-zinc-900 dark:text-white mt-3.5 tracking-wide">NKG MATH UNIVERSE</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-body font-bold text-xs sm:text-sm mt-1 text-center">गणित की दुनिया में आपका स्वागत है 🔢</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="text-left"
            >
              <div className="mb-2 flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-body font-black text-sm uppercase tracking-wide">
                <Phone size={16} className="text-violet-600 dark:text-violet-400 stroke-[2.5]" />
                <span>मोबाइल नंबर डालें</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                placeholder="जैसे: 9876543210"
                maxLength={15}
                className="w-full border-2 border-violet-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl px-4 py-3 font-body font-semibold text-lg text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-600/20"
              />
              {error && <p className="text-red-500 font-body font-bold text-xs sm:text-sm mb-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200/40 p-2.5 rounded-xl">{error}</p>}
              
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-2xl font-heading font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-3"
              >
                {loading ? <RefreshCw size={18} className="animate-spin stroke-[2.5]" /> : <> OTP भेजें <ArrowRight size={18} className="stroke-[2.5]" /> </>}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="text-left"
            >
              <div className="mb-2 flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-body font-black text-sm uppercase tracking-wide">
                <KeyRound size={16} className="text-violet-600 dark:text-violet-400 stroke-[2.5]" />
                <span>OTP डालें</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-body font-medium mb-3.5">
                📱 नंबर <span className="font-black text-zinc-800 dark:text-zinc-100">{phone}</span> पर OTP भेजा गया
              </p>

              {/* Demo OTP Alert Box */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200/60 dark:border-amber-900/40 rounded-2xl px-4 py-2.5 mb-4 text-center shadow-xs">
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-body font-black uppercase tracking-wider mb-0.5">📋 आपका OTP (Demo):</p>
                <p className="font-heading font-black text-2xl sm:text-3xl text-amber-600 dark:text-amber-400 tracking-widest">{generatedOtp}</p>
              </div>

              <input
                type="number"
                value={otp}
                onChange={(e) => { setOtp(e.target.value.slice(0, 6)); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                placeholder="6 अंकों का OTP"
                className="w-full border-2 border-violet-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl px-4 py-3 font-body font-black text-xl text-center tracking-widest text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-600/20"
              />
              {error && <p className="text-red-500 font-body font-bold text-xs sm:text-sm mb-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200/40 p-2.5 rounded-xl">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-2xl font-heading font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all mt-3"
              >
                <KeyRound size={18} className="stroke-[2.5]" /> OTP सत्यापित करें
              </button>

              <div className="flex items-center justify-between select-none font-body font-black text-xs sm:text-sm mt-4">
                <button
                  onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                  className="text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer border-none bg-transparent"
                >
                  ← नंबर बदलें
                </button>
                <button
                  onClick={handleResend}
                  className="text-violet-600 dark:text-violet-400 hover:underline cursor-pointer border-none bg-transparent"
                >
                  OTP दोबारा भेजें
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
