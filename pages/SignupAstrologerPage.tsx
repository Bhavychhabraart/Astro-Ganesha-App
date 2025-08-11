import React from 'react';
import { UserPlusIcon } from '../components/Icons';

export const SignupAstrologerPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
      <UserPlusIcon className="w-16 h-16 text-brand-primary mb-4" />
      <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Join Our Panel</h1>
      <p className="mt-4 text-lg text-brand-text-secondary max-w-md mx-auto">
        Are you an expert astrologer? We're building a platform for you to connect with users and share your wisdom.
      </p>
      <p className="mt-2 text-brand-text-secondary">(Coming Soon)</p>
    </div>
  );
};