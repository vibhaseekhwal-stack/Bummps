import logoImg from "../assets/img.png";

export default function BummpsLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Full Logo Image (Icon + Text Combined) */}
      <img
        src={logoImg}
        alt="Bummps Logo"
        className="h-full w-auto object-contain shrink-0"
      />
    </div>
  );
}