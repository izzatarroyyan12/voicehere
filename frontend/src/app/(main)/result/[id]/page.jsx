'use client';

import AudioPlayer from '@/app/components/AudioPlayer';
import api from '@/config/api';
import { getAudioFromLocalStorage } from '@/helper/local-storage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';

export default function ResultDetail({ params }) {
  const id = params.id;
  const router = useRouter();

  const [audioData, setAudioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTranscriptionResult = async () => {
    try {
      const response = await api.get(`/transcribe/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAudioData(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Gagal mengambil data transkripsi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTranscriptionResult();
  }, []);

  return (
    <div className="flex flex-col px-5 pb-10">
      {isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-between text-xl mt-4">
            <div className="flex gap-x-2">
              <IoArrowBack size={32} onClick={() => router.push('/history')} role="button" />
              {audioData?.audio_name}
            </div>
          </div>
          <div className="mt-4 border p-2">{audioData?.text}</div>
          {audioData && <AudioPlayer publicUrl={audioData?.audio_url} />}
        </>
      )}
    </div>
  );
}
