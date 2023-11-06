import Image from "next/image";
import imaje from "./../assets/hands-typing-on-laptop-png.webp";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Heading />
      <p className=" text-center text-gray-500">
        👨‍💻Test Your Typing Speed and <b>Unlock</b> Your Typing Potential{" "}
        <b>now</b> <b aria-hidden>🚀</b>
      </p>
      <Link
        href="/type"
        className=" w-fit h-10 px-3 animate-pulse flex items-center justify-center text-sm rounded-lg cursor-pointer  text-white border-none bg-cyan-900"
      >
        Start Typing ✨
      </Link>
      <Image className=" mt-10" width={400} height={400} src={imaje} alt="" />
    </>
  );
}

const Heading = () => {
  return (
    <h3 className=" mt-24 text-5xl font-semibold font-poppins">
      {"Typeroo".split("").map((letter: string, index: number) => (
        <span
          style={{ animationDelay: `${(index + 1) * 180 + 500}ms` }}
          className={`inline-block animate-bounce-once [&:nth-child(1)]:text-blue-700`}
          key={index}
        >
          {letter}
        </span>
      ))}
    </h3>
  );
};
