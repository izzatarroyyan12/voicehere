'use client';

import api from '@/config/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { IoArrowBack, IoOpen } from 'react-icons/io5';
import { IoOpenOutline } from 'react-icons/io5';

export default function TranscribeHistory() {
  const router = useRouter();
  const [histories, setHistories] = useState([]);
  const getTranscribeHistory = async () => {
    try {
      const response = await api.get('/transcribe', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTranscribeHistory();
  }, []);

  return (
    <div className="flex flex-col px-5 pb-10">
      <div className="flex items-center justify-between text-xl my-4">
        <div className="flex gap-x-2">
          <IoArrowBack size={32} onClick={() => router.push('/')} role="button" />
          Transcribe History
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between w-full p-3 rounded-lg border-2 border-purple-500 ">
          <p>let-it-go.mp3</p>
          <div className="flex gap-x-3">
            <IoOpenOutline size={20} />
            <FaTrashCan size={20} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
