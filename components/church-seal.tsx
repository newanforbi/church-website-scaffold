import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/** Decorative RCCG seal — always paired with text that already names the church. */
export function ChurchSeal({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src={siteConfig.logo}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}
