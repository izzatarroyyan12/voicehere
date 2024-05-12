export default function Layout({ children }) {
  return (
    <div className="grid place-content-center h-[100dvh] px-5 bg-[#204A77] text-white">
      <h1 className="absolute top-5 text-2xl ">Voicehere</h1>
      {children}
    </div>
  );
}
