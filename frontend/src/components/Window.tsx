import Image from "next/image";

export default function Window() {
  return (
    <div className="absolute top-10 right-10">
      <Image src="/window.png" alt="window" width={128} height={128} />
    </div>
  );
}
