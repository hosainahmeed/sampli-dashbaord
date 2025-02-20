import React, { useState } from 'react';
import { Upload, Button, Table } from 'antd';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Papa from 'papaparse'; // CSV parsing library
import './UploadCsv.css'; // Custom CSS for styling
import toast from 'react-hot-toast';

const UploadCsv = ({ setOpenCsv }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [csvPreview, setCsvPreview] = useState([]);

  const handleFileSelect = (file) => {
    const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
    if (!isCsv) {
      setErrorMessage('Only CSV files are allowed.');
      return false;
    }

    setErrorMessage('');
    setSelectedFile(file);

    // Read file content for preview
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsedData.errors.length > 0) {
        setErrorMessage('Error parsing CSV file. Please check the format.');
        return;
      }

      setCsvPreview(parsedData.data.slice(0, 10)); // Show first 10 rows for preview
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Simulate file upload and log data
    console.log('Submitting file:', selectedFile.name);
    console.log('File data:', csvPreview);

    // Uncomment this section to handle actual file upload
    // upload(formData)
    //   .then((response) => {
    //     antMessage.success('File uploaded successfully!');
    //     setSelectedFile(null);
    //     setCsvPreview([]);
    //   })
    //   .catch((error) => {
    //     antMessage.error(error?.data || 'Upload failed.');
    //   });

    toast.success('File submitted successfully (check console for data).');
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCsvPreview([]);
    setOpenCsv(false);
  };

  const columns =
    csvPreview.length > 0
      ? Object.keys(csvPreview[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }))
      : [];

  return (
    <div className="upload-csv-container">
      <Upload.Dragger
        name="file"
        accept=".csv"
        beforeUpload={handleFileSelect}
        showUploadList={false}
        className="upload-dragger"
      >
        <div className="upload-placeholder">
          <FaPlus className="upload-icon" />
          <span className="upload-text">
            {selectedFile ? 'File Selected' : 'Click or drag CSV file here'}
          </span>
        </div>
      </Upload.Dragger>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {selectedFile && (
        <div className="file-details">
          <p className="file-name">Selected File: {selectedFile.name}</p>
          <p className="file-size">
            Size: {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {csvPreview.length > 0 && (
        <div className="csv-preview">
          <h3 className="preview-title">CSV Preview (First 10 Rows)</h3>
          <Table
            dataSource={csvPreview}
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
            className="preview-table"
          />
        </div>
      )}

      <div className="action-buttons">
        <Button
          type="primary"
          className="upload-button"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload File
        </Button>
        <Button
          type="default"
          className="close-button"
          icon={<FaTimes />}
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default UploadCsv;
