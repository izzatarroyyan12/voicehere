'use client';

import api from '@/config/api';
import VoicehereLogo from '@public/voicehere.png';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const loginDefaultValue = {
  username: '',
  password: '',
};

export default function Login() {
  const router = useRouter();

  const [loginValue, setLoginValue] = useState(loginDefaultValue);
  const [waitingLoginResponse, setWaitingLoginResponse] = useState(false);

  const handleLogin = async () => {
    if (loginValue.username === '' && loginValue.password === '') {
      toast.error('username dan password tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    if (loginValue.username === '') {
      toast.error('username tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    if (loginValue.password === '') {
      toast.error('password tidak boleh kosong', {
        duration: 2000,
      });
      return;
    }

    setWaitingLoginResponse(true);
    try {
      const response = await api.post('/user/login', loginValue);
      if (response.status === 200) {
        Cookies.set('token', response.data.token);
        setLoginValue(loginDefaultValue);
        router.push('/');
      }
      setWaitingLoginResponse(false);
    } catch (error) {
      toast.error(error);
      setWaitingLoginResponse(false);
    }
  };

  const handleValueChange = (e) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center shadow-2xl p-10 rounded-lg hover:shadow-md bg-opacity-5 border border-collapse sm:shadow-none sm:p-0 sm:rounded-none sm:hover:shadow-none sm:bg-transparent sm:bg-opacity-100 sm:border-none">
      <Image src={VoicehereLogo} alt="voicehere logo" />
      <span className="font-semibold">here to help</span>
      <div className="flex flex-col gap-y-2 my-2">
        <input
          type="text"
          name="username"
          placeholder="username"
          className="px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleValueChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleValueChange}
        />
      </div>
      <button
        onClick={handleLogin}
        className={`w-full px-4 py-2 text-white rounded-lg bg-[#2B579A] ${
          waitingLoginResponse ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={waitingLoginResponse}
      >
        {waitingLoginResponse ? (
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
            <span>Loading...</span>
          </div>
        ) : (
          'Login'
        )}
      </button>
      <span>
        register your account &nbsp;
        <a href="/signup" className="underline">
          here
        </a>
      </span>
    </div>
  );
}
