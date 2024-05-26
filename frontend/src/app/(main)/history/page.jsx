'use client';
import api from '@/config/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';
import { IoArrowBack, IoOpenOutline } from 'react-icons/io5';

export default function TranscribeHistory() {
  const router = useRouter();
  const [histories, setHistories] = useState([]);
  const [loadingGetTranscribeHistory, setLoadingGetTranscribeHistory] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const getTranscribeHistory = async () => {
    try {
      const response = await api.get('/transcribe', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      if (response.status === 200) {
        setHistories(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGetTranscribeHistory(false);
    }
  };

  useEffect(() => {
    getTranscribeHistory();
  }, []);

  const handleDeleteHistory = async () => {
    try {
      const response = await api.delete(`/transcribe/${selectedHistoryId}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      if (response.status === 200) {
        setHistories(histories.filter((history) => history.transcription_id !== selectedHistoryId));
      }
    } catch (error) {
      console.log(error);
      toast.error('Gagal menghapus riwayat');
    } finally {
      setIsDeleteModalOpen(false);
      toast.success('Riwayat berhasil dihapus');
    }
  };

  return (
    <div className="flex flex-col px-5 pb-10">
      <div className="flex items-center justify-between text-xl my-4">
        <div className="flex gap-x-2">
          <IoArrowBack size={32} onClick={() => router.push('/')} role="button" />
          Transcribe History
        </div>
      </div>

      {loadingGetTranscribeHistory ? (
        <div className="animate-pulse">
          <div className="flex flex-col gap-4">
            <div className="h-12 bg-gray-300 rounded-lg"></div>
            <div className="h-12 bg-gray-300 rounded-lg"></div>
            <div className="h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ) : histories.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <p>Belum ada riwayat</p>
        </div>
      ) : (
        histories.map((history) => {
          return (
            <div className="flex flex-col" key={history.timestamp}>
              <div className="flex justify-between w-full p-3 rounded-lg border-2 border-purple-500 ">
                <p>{history.audio_name}</p>
                <div className="flex gap-x-3">
                  <IoOpenOutline
                    size={20}
                    onClick={() => router.push(`/result/${history.transcription_id}`)}
                  />
                  <FaTrashCan
                    size={20}
                    color="red"
                    onClick={() => {
                      setSelectedHistoryId(history.transcription_id);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}

      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <FaTrashCan className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Konfirmasi Hapus
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Apakah Anda yakin ingin menghapus riwayat ini?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={handleDeleteHistory}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
