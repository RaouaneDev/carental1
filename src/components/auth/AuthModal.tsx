import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = useState<'signin' | 'signup'>(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-yellow mb-2">
            {view === 'signin' ? 'Connexion' : 'Inscription'}
          </h2>
        </div>

        {view === 'signin' ? (
          <>
            <SignIn onClose={onClose} />
            <div className="mt-4 text-center text-white text-sm">
              Pas encore de compte ?{' '}
              <button
                onClick={() => setView('signup')}
                className="text-primary-yellow hover:text-yellow-600 font-semibold"
              >
                S'inscrire
              </button>
            </div>
          </>
        ) : (
          <>
            <SignUp onClose={onClose} />
            <div className="mt-4 text-center text-white text-sm">
              Déjà un compte ?{' '}
              <button
                onClick={() => setView('signin')}
                className="text-primary-yellow hover:text-yellow-600 font-semibold"
              >
                Se connecter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
