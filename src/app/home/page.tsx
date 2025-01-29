"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/img/NRLogo.png";
import title from "../../../public/img/title.png";
import kv from "../../../public/img/KV.png";
import button from "../../../public/img/Button.png";
import bottom from "../../../public/img/BottomSHieldHR.png";

export default function HomePage() {
  return (
    <div className="relative h-svh w-full">
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
          className="absolute bottom-36 left-1/2 -translate-x-1/2"
        />
      </Link>
    </div>
  );
}
