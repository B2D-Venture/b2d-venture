import { Label } from "@/components/ui/label";

export function BannerImageForm() {
  return (
    <>
      <div className="relative">
        <div className="h-52 overflow-hidden flex items-center justify-center text-center rounded-md">
          <img
            id="preview-image"
            src=""
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>
        <label
          htmlFor="picture"
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-[#bfbfbf] text-black"
        >
          Upload Image
        </label>
        <input
          id="picture"
          type="file"
          className="opacity-0 absolute inset-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const imgElement = document.getElementById(
                  "preview-image"
                ) as HTMLImageElement;
                if (imgElement) imgElement.src = reader.result as string;
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
    </>
  );
}
