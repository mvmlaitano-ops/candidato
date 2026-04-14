"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  nome: string;
  foto?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "w-10 h-10", text: "text-xs", img: 40 },
  md: { box: "w-12 h-12", text: "text-sm", img: 48 },
  lg: { box: "w-14 h-14", text: "text-base", img: 56 },
};

export default function CandidatoAvatar({ nome, foto, size = "sm" }: Props) {
  const [imgError, setImgError] = useState(false);
  const s = sizes[size];
  const initials = nome.split(" ").map((n) => n[0]).slice(0, 2).join("");

  if (foto && !imgError) {
    return (
      <div className={`${s.box} rounded-xl overflow-hidden bg-surface-2 border border-border shrink-0 relative`}>
        <Image
          src={foto}
          alt={nome}
          width={s.img}
          height={s.img}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${s.box} rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0`}>
      <span className={`${s.text} font-bold text-accent`}>{initials}</span>
    </div>
  );
}
