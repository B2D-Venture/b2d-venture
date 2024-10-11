"use client";
import React, { useState } from 'react';
import { UploadDropzone } from '@/src/utils/uploadthing';

export function BannerImageForm({ setBannerImage }: { setBannerImage: (image: string) => void }) {
  const [imageSrc, setImageSrc] = useState<string>("");

  return (
    <div className="relative">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Uploaded Banner"
          className="w-full h-52 object-cover rounded-md shadow-md"
        />
      ) : (
        <div className="h-52 flex items-center justify-center text-center rounded-md bg-[#BFBFBF] border border-dashed border-gray-300 shadow-md">
          <label
            htmlFor="banner"
            className="absolute inset-0 flex flex-col items-center justify-center text-center cursor-pointer bg-transparent"
          >
            <UploadDropzone
              endpoint="imageUploader"
              className="border-none"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  const uploadedFile = res[0];
                  setImageSrc(uploadedFile.url);
                  setBannerImage(uploadedFile.url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
        </div>
      )}

      {imageSrc && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-6 py-2 bg-[#d9b834] text-white font-semibold rounded-lg shadow-lg hover:bg-[#c6a329] hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            onClick={() => {
              setImageSrc("");
              setBannerImage("");
            }}
          >
            Remove Banner
          </button>
        </div>
      )}
    </div>
  );
}
