import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useLang } from '@/lib/LanguageContext';

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, authChecked } = useAuth();
  const { t } = useLang();

  // Extract page name from URL path
  const pageName = location.pathname.substring(1) || "unknown";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="text-center space-y-6">
          
          {/* 404 Error Code */}
          <div className="space-y-2">
            <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600 tracking-tight">
              404
            </h1>
            <div className="h-1 w-16 bg-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Main Message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-800">
              पेज नहीं मिला / Page Not Found
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              हमें खेद है, लेकिन <span className="font-semibold text-indigo-600">"/{pageName}"</span> नाम का पेज इस एप्लिकेशन में मौजूद नहीं है।
            </p>
          </div>
          
          {/* Admin Note (केवल एडमिन यूजर को दिखेगा) */}
          {authChecked && isAuthenticated && user?.role === 'admin' && (
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-left">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Admin Note</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This page route exists in your router but doesn't have a component implemented yet. You can ask the AI to code this specific screen!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <div className="pt-4">
            <button 
              onClick={() => navigate('/')} 
              className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-105 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3m-6-6h.01M9 16h.01" />
              </svg>
              {t?.backBtn || 'मुख्य पेज पर जाएं (Go Home)'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
