import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export function Login() {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-[24px] paper-shadow p-10 border border-outline-variant/30 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-on-primary-fixed-variant/10 rounded-full flex items-center justify-center border border-on-primary-container/10">
            <span className="material-symbols-outlined text-secondary-fixed text-[32px]">favorite</span>
          </div>
        </div>
        
        <h1 className="font-headline-lg text-headline-lg text-primary mb-3 relative z-10">WedPlanner</h1>
        <p className="font-body-md text-on-surface-variant/80 mb-10 relative z-10 leading-relaxed">
          Track your marriage timeline and Subclass 485 Visa application steps securely across your devices.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm border border-error/20 relative z-10">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="relative z-10 w-full py-4 px-6 bg-surface-container-lowest border border-outline-variant/50 hover:border-secondary hover:bg-surface-container transition-all duration-300 rounded-xl text-on-surface font-nav-link text-[15px] flex items-center justify-center gap-4 group shadow-sm hover:shadow-md"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
