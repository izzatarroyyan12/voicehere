'use client';

import AudioPlayer from '@/app/components/AudioPlayer';
import { getAudioFromLocalStorage } from '@/helper/local-storage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

export default function Result() {
  const router = useRouter();
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audio = getAudioFromLocalStorage();
    if (audio) {
      setAudio(audio);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div className="flex justify-center px-5 pb-10">
      <div className="w-full">
        <div className="flex items-center gap-x-2 text-xl mt-4">
          <IoArrowBack size={32} onClick={() => router.push('/')} role="button" />
          {audio?.name}
        </div>
        <div className="mt-4 border p-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, praesentium enim. Tempore
          ratione non atque eligendi aliquam neque pariatur doloribus, voluptate sit iure! Tempora
          autem ad modi odio magni unde reiciendis nesciunt libero recusandae quam, vero animi.
          Velit voluptatum quos laboriosam harum dicta vel nulla obcaecati ex ab, quaerat, excepturi
          autem eligendi itaque animi. Saepe reprehenderit nam, quas illum, laborum deserunt
          provident ratione harum maiores nobis consequuntur voluptates asperiores exercitationem!
          Quos ipsum animi veritatis rerum inventore molestiae tempora eum similique dolorum
          aliquam, quia unde cumque repellat! Nobis hic reprehenderit praesentium est corporis,
          provident blanditiis qui eveniet itaque atque vel soluta.
        </div>

        {audio && <AudioPlayer publicUrl={audio.url} />}
      </div>
    </div>
  );
}
