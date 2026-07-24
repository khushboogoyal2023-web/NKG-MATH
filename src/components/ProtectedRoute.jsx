import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Default Fallback Loading Screen
const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-xs select-none">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-violet-100 dark:border-violet-950 border-t-violet-600 dark:border-t-violet-400 rounded-full animate-spin"></div>
      <p className="font-body font-black text-xs uppercase tracking-widest text-violet-600/70 dark:text-violet-400/70 animate-pulse">
        लोड हो रहा है...
      </p>
    </div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  return <Outlet />;
}
