import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Heart } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">WedPlanner</h1>
        <p className="text-slate-500 mb-8">
          Track your marriage timeline and Subclass 485 Visa application steps securely across your devices.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
