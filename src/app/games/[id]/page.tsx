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

  return (
    <div className="relative h-svh w-full">
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
        <div className="relative max-w-4xl h-svh z-50">
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
          ></iframe>
        </div>
      )}
    </div>
  );
}
