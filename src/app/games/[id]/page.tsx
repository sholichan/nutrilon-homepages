"use client";
import Image from "next/image";
import milkman from "../../../../public/img/Nutrilon-Milk-Delivery.png";
import battle from "../../../../public/img/battle-of-immunity.png";
import photobooth from "../../../../public/img/photobooth.png";
import judul from "../../../../public/img/JUDUL.png";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Games() {
  const params = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState("");
  const id = params.id;
  const iframeUrls: { [key: string]: string } = {
    milkman: `https://milkman.nutrilon.qyubit.com?id=${id}`,
    battle: `http://beatshield.nutrilon.qyubit.com?id=${id}`,
    photobooth: `https://nutrilon.qyubit.com?id=${id}`,
  };

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
    <div className="relative h-svh w-full" onClick={handleFullscreenToggle}>
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
      {selectedImage && (
        <div className="absolute max-w-4xl h-svh z-50">
          <button
            className="w-full bg-yellow-400 text-blue-900 font-bold rounded-md p-2"
            onClick={() => setSelectedImage("")}
          >
            Kembali
          </button>
          <iframe
            src={iframeUrls[selectedImage]}
            className="h-screen w-screen"
            allowFullScreen
            allow="camera; microphone"
          ></iframe>
        </div>
      )}
    </div>
  );
}
