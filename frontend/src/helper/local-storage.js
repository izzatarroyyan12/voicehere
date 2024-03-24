'use client';

const storeFileToLocalStorage = (file) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('audio', JSON.stringify(file));
  }
};

const getFileFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const file = JSON.parse(localStorage.getItem('audio'));
    return file;
  }
  return null;
};

export { storeFileToLocalStorage, getFileFromLocalStorage };
