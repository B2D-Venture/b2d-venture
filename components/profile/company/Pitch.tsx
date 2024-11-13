import React from "react";

const Pitch = ({ pitchData }: { pitchData: string }) => {
  const formattedPitchData = pitchData.replace(/<p><\/p>/g, "<br />");

  return (
    <div className="ml-8 md:ml-[80px]">
      <div className="mt-5 mr-4 max-w-full overflow-auto p-2">
        <div
          className="mt-2 break-words"
          dangerouslySetInnerHTML={{ __html: formattedPitchData }}
        />
      </div>
    </div>
  );
};

export default Pitch;
