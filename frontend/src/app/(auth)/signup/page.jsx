'use client';

import api from '@/config/api';
import VoicehereLogo from '@public/voicehere.png';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

const signupDefaultValue = {
  username: '',
  password: '',
};

export default function Signup() {
  const [signupValue, setSignupValue] = useState(signupDefaultValue);
  const [waitingSignupResponse, setWaitingSignupResponse] = useState(false);

  const handleRegister = async () => {
    if (signupValue.username === '' && signupValue.password === '') {
      toast.error('username dan password tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    if (signupValue.username === '') {
      toast.error('username tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    if (signupValue.password === '') {
      toast.error('password tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    setWaitingSignupResponse(true);
    try {
      const response = await api.post('/user/signup', signupValue);
      if (response.status === 201) {
        toast.success('Berhasil daftar');
        setWaitingSignupResponse(false);
      }
    } catch (error) {
      toast.error(error);
      setWaitingSignupResponse(false);
    }
  };

  const handleValueChange = (e) => {
    setSignupValue({
      ...signupValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center shadow-2xl p-10 rounded-lg hover:shadow-md bg-white bg-opacity-5 border border-collapse sm:shadow-none sm:p-0 sm:rounded-none sm:hover:shadow-none sm:bg-transparent sm:bg-opacity-100 sm:border-none">
      <Image src={VoicehereLogo} alt="voicehere logo" />
      <span className="font-semibold">here to help</span>
      <form className="flex flex-col gap-y-2 my-2">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={signupValue.username}
          className="px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleValueChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={signupValue.password}
          className="px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleValueChange}
        />
      </form>
      <button
        onClick={handleRegister}
        className={`w-full px-4 py-2 text-white rounded-lg bg-[#2B579A] ${
          waitingSignupResponse ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={waitingSignupResponse}
      >
        {waitingSignupResponse ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Signup</span>
          </div>
        ) : (
          'Signup'
        )}
      </button>
      <span>
        or you can login &nbsp;
        <a href="/login" className="underline">
          here
        </a>
      </span>
    </div>
  );
}
