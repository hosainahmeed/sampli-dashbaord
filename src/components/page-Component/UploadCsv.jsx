import React from "react";
import { Spin, Upload } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const UploadCsv = ({ setOpenCsv }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileSelect = (file) => {
    const isCsv = file.type === "text/csv" || file.name.endsWith(".csv");
    if (!isCsv) {
      setMessage("Only CSV files are allowed.");
      return false;
    }

    setMessage("");
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // upload(formData)
    //   .unwrap()
    //   .then((response) => {
    //     toast.success("File uploaded successfully!");
    //     setSelectedFile(null);
    //   })
    //   .catch((error) => {
    //     toast.error(error?.data || "Upload failed.");
    //   });
  };

  return (
    <div className="flex flex-col gap-2">
      <Upload.Dragger
        name="file"
        accept=".csv"
        beforeUpload={handleFileSelect}
        showUploadList={false}
        className="border-dashed  rounded-lg p-6"
      >
        <div className="flex flex-col items-center">
          <FaPlus className="text-3xl text-[#437FF4] mb-2" />
          <span className="text-lg text-[#437FF4]">
            {selectedFile ? "File Selected" : "Add CSV File"}
          </span>
        </div>
      </Upload.Dragger>
      {message && <p className="text-red-500">{message}</p>}
      {selectedFile && (
        <div className="text-[#437FF4]">
          <p className="text-lg">Selected File: {selectedFile.name}</p>
          <p className="text-sm">
            Size: {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
      <button
        type="button"
        className={`w-full ${
          !selectedFile ? "cursor-not-allowed" : "cursor-pointer"
        } bg-[#437FF4] mt-4 py-2 rounded-md !text-white`}
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload File
      </button>
      <button
        type="button"
        className="w-full bg-transparent border-[1px] border-[red] !text-[red] cursor-pointer mt-4 py-2 rounded-md"
        onClick={() => {
          setSelectedFile(null);
          setOpenCsv(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default UploadCsv;
