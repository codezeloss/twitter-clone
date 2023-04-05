import Image from "next/image";
import { useState } from "react";
import { FileDrop } from "react-file-drop";

const EditableImage = ({ type, src, onChange, className, editable }) => {
  [isFileNearby, setIsFileNearby] = useState(false);
  [isFileOver, setIsFileOver] = useState(false);
  [isUploading, setIsUploading] = useState(false);

  //
  let extraClasses = "";
  if (isFileNearby && !isFileOver) extraClasses += " bg-blue-500 opacity-40";
  if (isFileOver) extraClasses += " bg-blue-500 opacity-90";
  if (!editable) extraClasses = "";

  //
  function updateImage(files, e) {
    e.preventDefault();

    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);

    const data = new FormData();
    data.append(type, files[0]);

    fetch("/api/upload", {
      method: "POST",
      body: data,
    }).then(async (res) => {
      const json = await response.json();
      // notify the parent of this file
      onChange(json.src);
      setIsUploading(false);
    });
  }

  return (
    <FileDrop
      onDrop={updateImage}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false);
        setIsFileOver(false);
      }}
    >
      <div className={`bg-twitterBorder text-white relative`}>
        <div className={`absolute inset-0 ${extraClasses}`}></div>
        {isUploading && (
          <div
            className="absolute inset-0 flex items-center justify-center text-center"
            style={{
              backgroundColor: "rgba(48, 140, 216, 0.9)",
            }}
          >
            Uploading
          </div>
        )}

        <div className={`flex items-center overflow-hidden ${className}`}>
          {src && (
            <Image
              className="w-ful"
              src={src}
              alt="Cover picture"
              width="auto"
              height="auto"
            />
          )}
        </div>
      </div>
    </FileDrop>
  );
};

export default EditableImage;
