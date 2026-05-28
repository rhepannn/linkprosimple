import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  textColor?: string; // Kept for compatibility, though not used by image
  whiteMode?: boolean;
}

export function Logo({
  className = "",
  height = 36,
  textColor = "#004AAD",
  whiteMode = false,
}: LogoProps) {
  return (
    <Image
      src="/logo-linkpro.png"
      alt="Link Productive Logo"
      width={height * 3}
      height={height}
      style={{ height: `${height}px`, width: "auto" }}
      className={`object-contain ${className}`}
      priority
    />
  );
}
