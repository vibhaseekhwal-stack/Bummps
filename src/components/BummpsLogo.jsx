import logoImg from "../assets/logo.png";

export default function BummpsLogo({ className = "h-9" }) {
  return (
    <div
      className={`flex items-center gap-2.5 select-none ${className}`}
    >
      <img
        src={logoImg}
        alt="Bummps Logo"
        className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(218,178,90,0.5)]"
      />

      <span
        style={{ fontFamily: '"Playfair Display", serif' }}
        className="text-2xl font-bold tracking-tight text-[#DAB25A]"
      >
        bummps<span className="text-[#DAB25A]">.</span>
      </span>
    </div>
  );
}