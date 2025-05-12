import { FaRobot, FaCheckCircle } from "react-icons/fa";

function LogoAprovIA({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <span className="relative">
        <FaRobot className="text-cyan-200 text-3xl drop-shadow" />
        <FaCheckCircle
          className="absolute -bottom-1 -right-2 text-green-500 text-xl rounded-full drop-shadow"
        />
      </span>
      <span className="font-bold text-xl text-white tracking-tight drop-shadow">
        Aprov<span className="text-green-500 drop-shadow">IA</span>
      </span>
    </div>
  );
}

export default LogoAprovIA;
