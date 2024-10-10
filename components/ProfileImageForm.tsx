import { UploadButton } from '@/src/utils/uploadthing';
import React, { useState } from 'react';

export function ProfileImageForm({ setProfileImage }: { setProfileImage: (image: string) => void }) {
  const [imageSrc, setImageSrc] = useState("");

  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s";

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-40 h-40 max-sm:w-20 max-sm:h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="w-full h-full object-cover" />
        ) : (
          <img src={defaultImage} alt="Default" className="w-full h-full object-cover opacity-50" />
        )}
      </div>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            const uploadedFile = res[0];
            setImageSrc(uploadedFile.url);
            setProfileImage(uploadedFile.url);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
          className="mt-4 bg-[#F5F5F7] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#B7B7B7] transition duration-200 ease-in-out"
      />
    </div>
  );
}
