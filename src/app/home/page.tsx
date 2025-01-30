"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/img/NRLogo.png";
import title from "../../../public/img/title.png";
import kv from "../../../public/img/KV.png";
import button from "../../../public/img/Button.png";
import bottom from "../../../public/img/BottomSHieldHR.png";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [userInteracted, setUserInteracted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Muted agar autoplay bekerja tanpa interaksi
      videoRef.current.play();
    }
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
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [isIdle]);

  useEffect(() => {
    if (isIdle && videoRef.current) {
      videoRef.current.muted = !userInteracted;
      videoRef.current.play();
    }
  }, [isIdle, userInteracted]);

  const requestFullscreen = () => {
    const elem = document.documentElement as HTMLElement & {
      requestFullscreen?: () => void;
      webkitRequestFullscreen?: () => void;
      mozRequestFullScreen?: () => void;
      msRequestFullscreen?: () => void;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      // Safari
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    const documentElement = document as Document & {
      exitFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
      mozCancelFullScreen?: () => void;
      msExitFullscreen?: () => void;
    };

    if (documentElement.exitFullscreen) {
      documentElement.exitFullscreen();
    } else if (documentElement.webkitExitFullscreen) {
      // Safari
      documentElement.webkitExitFullscreen();
    } else if (documentElement.mozCancelFullScreen) {
      // Firefox
      documentElement.mozCancelFullScreen();
    } else if (documentElement.msExitFullscreen) {
      // IE/Edge
      documentElement.msExitFullscreen();
    }
  };

  const handleFullscreenToggle = () => {
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
  };

  return (
    <div
      className="relative h-svh w-full"
      onClick={() => setUserInteracted(true)}
    >
      <Image
        src={logo}
        alt="logo"
        width={273}
        height={188}
        className="absolute w-[136px] h-[94px] top-[10%] left-1/2 -translate-x-1/2"
      />
      <Image
        src={title}
        alt="title"
        width={273}
        height={188}
        className="absolute w-[50%] h-auto top-[20%] left-1/2 -translate-x-1/2"
      />
      <Image
        src={kv}
        alt="kv"
        width={273}
        height={188}
        className="absolute w-[50%] h-auto top-[30%] left-1/2 -translate-x-1/2"
      />
      <div className="absolute bottom-0 inset-x-0">
        <Image src={bottom} alt="" />
      </div>
      <Link href={"/login"}>
        <Image
          src={button}
          alt="button"
          width={300}
          height={70}
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2"
        />
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cd990a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute bottom-10 right-10 lucide lucide-expand"
        onClick={handleFullscreenToggle}
      >
        <path d="m15 15 6 6" />
        <path d="m15 9 6-6" />
        <path d="M21 16.2V21h-4.8" />
        <path d="M21 7.8V3h-4.8" />
        <path d="M3 16.2V21h4.8" />
        <path d="m3 21 6-6" />
        <path d="M3 7.8V3h4.8" />
        <path d="M9 9 3 3" />
      </svg>
      <div
        className={
          isIdle
            ? `relative flex justify-center items-center h-screen bg-black`
            : `-z-10`
        }
      >
        {isIdle && (
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
