import { UploadButton } from '@/src/utils/uploadthing';
import React, { useState } from 'react';
import Image from 'next/image';

export function ProfileImageForm({ setProfileImage, defaultImage = "/form/default-profile.png" }: { setProfileImage: (image: string) => void, defaultImage?: string }) {
  const [imageSrc, setImageSrc] = useState("");

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-40 h-40 max-sm:w-20 max-sm:h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <Image src={imageSrc} alt="Uploaded" width={1000} height={100} className="w-full h-full object-cover" />
        ) : (
          <Image src={defaultImage} alt="Default" width={1000} height={100} className="w-full h-full object-cover" />
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
