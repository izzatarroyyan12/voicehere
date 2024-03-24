export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-20 bg-[#204A77] flex items-center px-5">
        <span className="text-2xl text-white">Voicehere</span>
      </div>
      {children}
    </>
  );
}
