import { Label } from "@/components/ui/label";

export function ProfileImageForm() {
  return (
    <>
      <div className="relative">
        <input
          id="picture"
          type="file"
          className="w-40 h-40 max-sm:w-20 max-sm:h-20 rounded-full overflow-hidden absolute inset-0 opacity-0 cursor-pointer"
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
        <div className="w-40 h-40 max-sm:w-20 max-sm:h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-center">
          <img
            id="preview-image"
            src=""
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Label to display centered text */}
        <label
          htmlFor="picture"
          className="absolute inset-0 flex items-center justify-center text-center cursor-pointer text-gray-600"
        >
          Upload Image
        </label>
      </div>
    </>
  );
}
