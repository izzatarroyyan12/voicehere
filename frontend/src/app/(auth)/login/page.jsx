import VoicehereLogo from '@public/voicehere.png';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center">
      <Image src={VoicehereLogo} alt="voicehere logo" />
      <span className="font-semibold">here to help</span>
      <a
        href="/login"
        className="px-5 py-1 flex items-center gap-x-2 bg-[#FAFCF2] text-black rounded-lg"
        role="button"
      >
        <FcGoogle size="1.75rem" />
        Login with Google
      </a>
      <span>
        register your account &nbsp;
        <a href="/signup" className="underline">
          here
        </a>
      </span>
    </div>
  );
}
