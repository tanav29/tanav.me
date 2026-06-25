"use client";

import { XIcon } from "lucide-react";
import { useState, useEffect } from "react";

const ImgBlock = ({ src, alt, className }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div>
      <div className="w-full">
        <div className="relative w-full flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="rounded-md object-cover w-full max-w-2xl cursor-zoom-in"
            onClick={openModal}
          />
        </div>
        <p className="caption-bottom text-center text-sm text-[var(--text-muted)] mt-2">
          {alt}
        </p>
      </div>
      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
          isModalOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        onClick={closeModal}
      >
        <div className="relative max-w-full max-h-full">
          <img
            src={src}
            alt={alt}
            className="max-w-screen max-h-[90vh] min-w-[60vw] h-fit object-contain transition-all duration-100 ease-out cursor-zoom-out"
          />
        </div>
      </div>
    </div>
  );
};

export default ImgBlock;
