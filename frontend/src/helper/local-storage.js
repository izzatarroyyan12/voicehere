'use client';

const storeAudioToLocalStorage = (file) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('audio', JSON.stringify(file));
  }
};

const getAudioFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const audioUrl = JSON.parse(localStorage.getItem('audio'));
    return audioUrl;
  }
  return null;
};

export { storeAudioToLocalStorage, getAudioFromLocalStorage };
