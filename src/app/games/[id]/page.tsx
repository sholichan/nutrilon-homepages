"use client";
import Image from "next/image";
import milkman from "../../../../public/img/Nutrilon-Milk-Delivery.png";
import battle from "../../../../public/img/battle-of-immunity.png";
import photobooth from "../../../../public/img/photobooth.png";
import judul from "../../../../public/img/JUDUL.png";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Games() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState("");
  const id = params.id;
  const iframeUrls: { [key: string]: string } = {
    milkman: `https://milkman.nutrilon.qyubit.com?id=${id}`,
    battle: `https://beatshield.nutrilon.qyubit.com?id=${id}`,
    photobooth: `https://nutrilon.qyubit.com?id=${id}`,
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const resetTimer = () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      setIsIdle(false);
      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
      }, 10000); // 5 detik tanpa aktivitas
    };

    // Deteksi aktivitas pengguna (gerakan mouse, klik, ketukan layar, tombol keyboard)
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    if (!isIdle) {
      resetTimer(); // Jalankan timer pertama kali
    }

    return () => {
      if (idleTimer.current && selectedImage === "") {
        clearTimeout(idleTimer.current);
      }
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [isIdle, selectedImage]);

  useEffect(() => {
    if (isIdle && videoRef.current) {
      videoRef.current.muted = !userInteracted;
      videoRef.current.play();
    }
  }, [isIdle, userInteracted]);

  return (
    <div
      className="relative h-svh w-full"
      onClick={() => setUserInteracted(true)}
    >
      <Image
        src={judul}
        alt="judul"
        width={273}
        height={188}
        className="absolute w-[40%] h-auto top-[15%] left-[50%] -translate-x-1/2"
      />
      <Image
        src={milkman}
        alt="milkman"
        width={273}
        height={188}
        className="absolute w-[30%] h-auto top-[30%] left-[30%] -translate-x-1/2"
        onClick={() => {
          setSelectedImage("milkman");
        }}
      />
      <Image
        src={battle}
        alt="battle"
        width={273}
        height={188}
        className="absolute w-[30%] h-auto top-[30%] left-[70%] -translate-x-1/2"
        onClick={() => {
          setSelectedImage("battle");
        }}
      />
      <Image
        src={photobooth}
        alt="photobooth"
        width={273}
        height={188}
        className="absolute w-[30%] h-auto top-[60%] left-1/2 -translate-x-1/2"
        onClick={() => {
          setSelectedImage("photobooth");
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cd990a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute bottom-10 right-10 lucide lucide-expand"
        onClick={() => router.push("/")}
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
      {selectedImage && (
        <div className="relative w-screen h-svh z-50">
          <button
            className="absolute w-full bg-yellow-400 text-blue-900 font-bold rounded-md p-2"
            onClick={() => setSelectedImage("")}
          >
            Kembali
          </button>
          <iframe
            src={iframeUrls[selectedImage]}
            className="h-screen w-screen"
            allowFullScreen
            allow="camera; microphone"
            // onClick={() => setUserInteracted(true)}
          ></iframe>
        </div>
      )}
      <div
        className={
          isIdle && selectedImage === ""
            ? `relative flex justify-center items-center h-screen bg-black`
            : `-z-10`
        }
      >
        {isIdle && selectedImage === "" && (
          <video
            ref={videoRef}
            src="/video/nutrilonpendek.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                setIsIdle(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
