'use client';

import AudioPlayer from '@/app/components/AudioPlayer';
import api from '@/config/api';
import { getAudioFromLocalStorage } from '@/helper/local-storage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';

export default function Result() {
  const router = useRouter();
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState('');

  console.log(audio);

  const saveTranscriptionResult = async () => {
    const transcription = sessionStorage.getItem('transcription');

    try {
      const response = await api.post(
        '/transcribe/save',
        {
          audio_file: audio.url,
          audio_name: audio.name,
          text: transcription,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
      );

      if (response.status === 201) {
        localStorage.removeItem('audio');
        toast.success('Transkripsi berhasil disimpan');
        router.push('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const audio = getAudioFromLocalStorage();
    if (audio) {
      setAudio(audio);
    } else {
      router.push('/');
    }

    const transcription = sessionStorage.getItem('transcription');
    setText(transcription);
  }, []);

  return (
    <div className="flex flex-col px-5 pb-10">
      <div className="flex items-center justify-between text-xl mt-4">
        <div className="flex gap-x-2">
          <IoArrowBack size={32} onClick={() => router.push('/')} role="button" />
          {audio?.name}
        </div>

        <button
          onClick={saveTranscriptionResult}
          className="mt-4 px-4 py-2 bg-[#204A77] text-white rounded-xl"
        >
          Save
        </button>
      </div>
      <div className="mt-4 border p-2">{text}</div>

      {audio && <AudioPlayer publicUrl={audio.url} />}
    </div>
  );
}
