import VoicehereLogo from '@public/voicehere.png';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center">
      <Image src={VoicehereLogo} alt="voicehere logo" />
      <span className="font-semibold">here to help</span>
      <a
        href="/signup"
        className="px-5 py-1 flex items-center gap-x-2 bg-[#FAFCF2] text-black rounded-lg"
        role="button"
      >
        <FcGoogle size="1.75rem" />
        Signup with Google
      </a>
      <span>
        or you can login &nbsp;
        <a href="/login" className="underline">
          here
        </a>
      </span>
    </div>
  );
}
