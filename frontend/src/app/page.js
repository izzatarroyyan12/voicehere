'use client';
import { useCallback, useEffect, useState } from 'react';
import { MdAudioFile } from 'react-icons/md';
import { BsFileEarmarkTextFill, BsCheckCircleFill } from 'react-icons/bs';
import { IoCloudUploadOutline, IoCloseCircle } from 'react-icons/io5';

const Mode = {
  IDLE: 'idle',
  UPLOAD: 'upload',
  PROCESS: 'process',
  DONE: 'done',
};

export default function Home() {
  const [mode, setMode] = useState(Mode.IDLE);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const file = getFileFromLocalStorage();
    if (file) {
      setAudio(file);
      setMode(Mode.UPLOAD);
    }
  }, []);

  useEffect(() => {
    if (mode == Mode.PROCESS) {
      setTimeout(() => {
        setMode(Mode.DONE);
      }, 3000);
    }
  }, [mode]);

  const storeFileToLocalStorage = (file) => {
    localStorage.setItem('audio', JSON.stringify(file));
  };

  const getFileFromLocalStorage = () => {
    const file = JSON.parse(localStorage.getItem('audio'));
    return file;
  };

  const uploadAudioFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0] ? e.target.files[0] : null;

    if (!file) return;

    setAudio(file);
    reader.onload = (e) => {
      storeFileToLocalStorage({
        name: file.name,
        type: file.type,
        content: e.target.result,
      });
    };
    reader.readAsDataURL(file);
    setMode(Mode.UPLOAD);
  };

  const dropAudioFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const files = [...e.dataTransfer.files];

    if (files.length > 1) return;

    const file = files[0];
    setAudio(file);
    reader.onload = (e) => {
      storeFileToLocalStorage({
        name: file.name,
        type: file.type,
        content: e.target.result,
      });
    };
    reader.readAsDataURL(file);
    setMode(Mode.UPLOAD);
  };

  return (
    <div className="flex justify-center px-5 pb-10">
      <div className="w-full max-w-[1280px] p-2">
        <h1 className="text-center text-4xl my-8 font-semibold">Audio to Text Converter</h1>
        <div
          className={`w-full grid place-content-center bg-slate-50 min-h-[500px] border-2 border-dashed border-black rounded-3xl ${audio ? '' : 'cursor-pointer'}`}
        >
          {mode == Mode.HOMR && (
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

          {mode == Mode.UPLOAD && (
            <div data-name="fileUploaded" className="flex flex-col items-center gap-y-8">
              <div className="relative flex flex-col items-center gap-y-3 pt-16 pb-8 bg-[#304FFE]/10 px-5 rounded-lg">
                <IoCloseCircle
                  size={24}
                  color="black"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => {
                    setAudio(null);
                    storeFileToLocalStorage(null);
                  }}
                />
                <MdAudioFile size={128} color="black" />
                <div className="text-center font-medium text-lg">
                  <p>{audio?.name}</p>
                  <p>file ready to be transcribed! 🚀</p>
                </div>
              </div>
              <button
                className="w-fit rounded-md font-semibold text-lg px-3 py-1 bg-[#304FFE] text-white"
                onClick={() => setMode(Mode.PROCESS)}
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
                onClick={() => setMode(Mode.IDLE)}
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
          <div className="border border-[#204A77] min-h-[320px] rounded-lg sm:col-span-2 md:col-span-1"></div>
          <div className="border border-[#204A77] min-h-[320px] rounded-lg"></div>
          <div className="border border-[#204A77] min-h-[320px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
