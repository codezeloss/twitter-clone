import { FileDrop } from "react-file-drop";
import { useState } from "react";

const Upload = ({ children, onUploadFinish }) => {
  [isFileNearby, setIsFileNearby] = useState(false);
  [isFileOver, setIsFileOver] = useState(false);
  [isUploading, setIsUploading] = useState(false);

  //
  function uploadImage(file, e) {
    e.preventDefault();

    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);

    const data = new FormData();
    data.append("post", file[0]);

    fetch("/api/upload", {
      method: "POST",
      body: data,
    }).then(async (res) => {
      const json = await res.json();
      const src = json.src;
      onUploadFinish(src);
      setIsUploading(false);
    });
  }

  return (
    <FileDrop
      onDrop={uploadImage}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false);
        setIsFileOver(false);
      }}
    >
      <div>
        {(isFileNearby || isFileNearby) && (
          <div className="bg-twitterBlue absolute inset-0 flex items-center justify-center">
            drop your files here
          </div>
        )}
        {children({ isUploading })}
      </div>
    </FileDrop>
  );
};

export default Upload;
