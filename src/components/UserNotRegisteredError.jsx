import React from 'react';
import { AlertTriangle, LogOut, UserCheck } from 'lucide-react';

const UserNotRegisteredError = () => {
  const handleResetLogin = () => {
    window.location.href = '/NKG-MATH/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-600 p-4 select-none">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-md w-full p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-white/10 relative z-10 text-center">
        
        {/* Warning Icon Graphic */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200/60 dark:border-amber-900/40 shadow-xs animate-bounce">
          <AlertTriangle className="w-8 h-8 text-amber-500 dark:text-amber-400 stroke-[2.5]" />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-zinc-900 dark:text-white mb-3.5 tracking-wide">
          पहुंच प्रतिबंधित है!
        </h1>
        
        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 font-body font-semibold text-sm sm:text-base mb-6 leading-relaxed">
          आपका मोबाइल नंबर इस एप्लीकेशन में रजिस्टर्ड नहीं है। कृपया ऐप एडमिनिस्ट्रेटर से संपर्क करें।
        </p>
        
        {/* Helpful Tips Box */}
        <div className="p-4 bg-violet-50 dark:bg-zinc-950 rounded-2xl text-left border border-violet-100 dark:border-zinc-800 shadow-inner mb-6">
          <p className="font-body font-black text-xs sm:text-sm text-violet-700 dark:text-violet-400 uppercase tracking-wide flex items-center gap-1.5">
            <UserCheck size={16} className="stroke-[2.5]" /> यदि यह कोई त्रुटि है, तो जांचें:
          </p>
          <ul className="list-disc list-inside mt-2.5 space-y-1.5 font-body font-medium text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <li>सुनिश्चित करें कि आपने सही मोबाइल नंबर डाला है</li>
            <li>एडमिन से अपना नंबर डेटाबेस में जुड़वाएं</li>
            <li>एक बार लॉग आउट करके दोबारा प्रयास करें</li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={handleResetLogin}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-2xl font-heading font-black text-base sm:text-lg hover:shadow-lg hover:scale-105 transition-all"
        >
          <LogOut size={18} className="stroke-[2.5]" /> वापस लॉगिन पर जाएं
        </button>

      </div>
    </div>
  );
};

export default UserNotRegisteredError;
