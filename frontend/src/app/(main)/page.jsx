'use client';

import api from '@/config/api';
import supabaseClient from '@/config/supabase';
import { getAudioFromLocalStorage, storeAudioToLocalStorage } from '@/helper/local-storage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCheckCircleFill, BsFileEarmarkTextFill } from 'react-icons/bs';
import { IoCloseCircle, IoCloudUploadOutline } from 'react-icons/io5';
import { MdAudioFile } from 'react-icons/md';
import { v4 } from 'uuid';

const Mode = {
  INIT: 'init',
  IDLE: 'idle',
  UPLOADED: 'uploaded',
  PROCESS: 'process',
  DONE: 'done',
};

export default function Home() {
  const [mode, setMode] = useState(Mode.INIT);
  const [audio, setAudio] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const file = getAudioFromLocalStorage();
    if (file) {
      setAudio(file);
      setMode(Mode.UPLOADED);
    } else {
      setMode(Mode.IDLE);
    }
  }, []);

  const uploadAudioFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0] ? e.target.files[0] : null;

    if (!file) return;

    const { data, error } = await supabaseClient.storage
      .from('audio-bucket')
      .upload(`${file.name}_${v4()}`, file);

    if (error) return;

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('audio-bucket').getPublicUrl(data.path);

    if (data) {
      setAudio(file);
      storeAudioToLocalStorage({
        name: file.name,
        type: file.type,
        url: publicUrl,
      });
      setMode(Mode.UPLOADED);
    }
  };

  const dropAudioFile = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const files = [...e.dataTransfer.files];

    if (files.length > 1) return;

    const file = files[0];

    const { data, error } = await supabaseClient.storage
      .from('audio-bucket')
      .upload(`${file.name}_${v4()}`, file);

    if (error) return;

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('audio-bucket').getPublicUrl(data.path);

    setAudio(file);

    reader.onload = (e) => {
      storeAudioToLocalStorage({
        name: file.name,
        type: file.type,
        url: publicUrl,
      });
    };
    reader.readAsDataURL(file);

    if (data) {
      setMode(Mode.UPLOADED);
    }
  };

  const transcribeAudioFile = async () => {
    setMode(Mode.PROCESS);
    const form = new FormData();
    form.append('audio', audio);

    try {
      const response = await api.post('/transcribe', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setMode(Mode.DONE);
        sessionStorage.setItem('transcription', response.data.text);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center px-5 pb-10">
      <div className="w-full max-w-[1280px] p-2">
        <h1 className="text-center text-4xl my-8 font-semibold">Audio to Text Converter</h1>
        <div
          className={`w-full grid place-content-center bg-slate-50 min-h-[500px] border-2 border-dashed border-black rounded-3xl ${audio ? '' : 'cursor-pointer'}`}
        >
          {mode === Mode.INIT && null}
          {mode == Mode.IDLE && (
            <div data-name="inputAudioField">
              <input
                type="file"
                id="audioFile"
                accept="audio/*"
                className="hidden"
                onChange={uploadAudioFile}
              />
              <label
                htmlFor="audioFile"
                onDrop={dropAudioFile}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center gap-y-3 py-24">
                  <IoCloudUploadOutline size={128} color="black" />
                  <div className="text-center font-medium text-lg">
                    <p>Drag and drop file here </p>
                    <p>
                      or <span className="text-[#204A77] font-bold">select a file</span> from your
                      computer
                    </p>
                  </div>
                </div>
              </label>
            </div>
          )}

          {mode == Mode.UPLOADED && (
            <div data-name="fileUploaded" className="flex flex-col items-center gap-y-8">
              <div className="relative flex flex-col items-center gap-y-3 pt-16 pb-8 bg-[#304FFE]/10 px-5 rounded-lg">
                <IoCloseCircle
                  size={24}
                  color="black"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => {
                    setAudio(null);
                    storeAudioToLocalStorage(null);
                    setMode(Mode.IDLE);
                  }}
                />
                <MdAudioFile size={128} color="black" />
                <div className="text-center font-medium text-lg">
                  <p>{audio?.name}</p>
                  <p>file ready to be transcribed! 🚀</p>
                </div>
              </div>
              <button
                onClick={transcribeAudioFile}
                className="w-fit rounded-md font-semibold text-lg px-3 py-1 bg-[#304FFE] text-white"
              >
                Transcribe Now
              </button>
            </div>
          )}

          {mode == Mode.PROCESS && (
            <div data-name="transcribingFile">
              <div className="box md:w-[300px] md:h-[300px]">
                <div className="circle">
                  <div className="element h-32 w-32">
                    <MdAudioFile size={104} />
                  </div>
                  <div className="element2">Transcribing your files...</div>
                  <div className="element3 h-32 w-32">
                    <BsFileEarmarkTextFill size={90} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode == Mode.DONE && (
            <div data-name="fileTranscribed" className="flex flex-col items-center gap-y-5">
              <div className="flex flex-col items-center gap-y-3 pt-10 pb-12 px-8 rounded-lg">
                <BsCheckCircleFill size={128} color="black" />
                <div className="text-center font-medium text-lg">
                  <p>Ready to go! 📝</p>
                </div>
              </div>
              <button
                className="w-fit rounded-md font-semibold text-lg px-3 py-1 bg-[#304FFE] text-white"
                onClick={() => {
                  router.push('/result');
                }}
              >
                Check Result
              </button>
            </div>
          )}
        </div>

        <h2 className="text-center text-3xl mt-16 mb-12 font-semibold">
          Convert Audio to Text In 3 Easy Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="border border-[#204A77] min-h-[320px] rounded-lg p-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-[#204A77] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                1
              </div>
              <h3 className="text-lg font-semibold">Unggah File Audio Anda</h3>
            </div>
            <p className="text-gray-600">
              Mulailah dengan mengunggah rekaman atau file audio Anda. Kami mendukung berbagai
              format file seperti MP3, WAV, dan FLAC.
            </p>
          </div>

          <div className="border border-[#204A77] min-h-[320px] rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-[#204A77] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                2
              </div>
              <h3 className="text-lg font-semibold">Transcribe Now!</h3>
            </div>
            <p className="text-gray-600">
              Setelah mengunggah file audio Anda, klik tombol "Transcribe Now!" untuk memulai proses
              konversi dari audio ke teks.
            </p>
          </div>

          <div className="border border-[#204A77] min-h-[320px] rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-[#204A77] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                3
              </div>
              <h3 className="text-lg font-semibold">Tunggu Sebentar</h3>
            </div>
            <p className="text-gray-600">
              Proses konversi mungkin membutuhkan waktu beberapa saat, tergantung pada durasi dan
              kompleksitas file audio Anda. Harap tunggu dengan sabar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
