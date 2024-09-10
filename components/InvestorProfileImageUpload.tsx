import Image from "next/image";

const InvestorProfileImageUpload = () => (
  <div className="flex flex-col items-center text-center">
    <div className="w-48 h-48 border-2 border-[#afaeab] rounded-full mb-4">
      <Image
        src="https://placehold.co/200x200.png"
        alt="Profile Avatar"
        layout="responsive"
        width={400}
        height={400}
        className="rounded-full"
      />
    </div>
    <button className="bg-[#bfbfbf] text-[#423f3f] px-4 py-2 rounded-md mb-4 w-full">
      Upload Image
    </button>
    <p className="text-xs text-left text-[#939191] max-w-xs">
      Please upload only a profile image of a real person. Do not upload images
      of cartoons, animals, objects, or any other type of image. Non-compliant
      uploads may be rejected.
    </p>
  </div>
);

export default InvestorProfileImageUpload;
