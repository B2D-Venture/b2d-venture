import { Label } from "@/components/ui/label";

export function BannerImageForm() {
  return (
    <div className="relative">
      <input
        id="banner"
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imgElement = document.getElementById(
                "banner-image"
              ) as HTMLImageElement;
              if (imgElement) imgElement.src = reader.result as string;
            };
            reader.readAsDataURL(file);
            const bannerText = document.querySelector(".banner-text");
            if (bannerText) {
              bannerText.textContent = "";
            }
          }
        }}
      />
      <div className="h-52 overflow-hidden flex items-center justify-center text-center rounded-md bg-[#bfbfbf]">
        <img
          id="banner-image"
          src=""
        />
      </div>
      <label
        htmlFor="banner"
        className="absolute inset-0 flex items-center justify-center text-center cursor-pointer text-gray-600 bg-transparent"
      >
        <p className="banner-text">Upload Image</p>
      </label>
    </div>
  );
}
