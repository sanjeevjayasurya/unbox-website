"use client";

import React from "react";
import ExportIcon from "../../../assets/icons/Export.svg";
import TrashIcon from "../../../assets/icons/Trash.svg";

const FileUpload = ({ label, file, onUpload, onRemove, accept }) => {
  const formatFileSize = (bytes) =>
    bytes >= 1024 * 1024
      ? (bytes / (1024 * 1024)).toFixed(2) + " mb"
      : (bytes / 1024).toFixed(2) + " kb";

  return (
    <>
      {!!file ? (
        <div className="uploaded-doc-div">
          <div className="file-data-div">
            <p className="resume-file-name">{file?.name}</p>
            <p className="resume-file-size">{formatFileSize(file?.size)}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove file"
            className="bg-transparent border-0 p-0 cursor-pointer"
          >
            <TrashIcon aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div
          className="upload-doc-div cursor-pointer"
          onClick={() => document.getElementById(label).click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && document.getElementById(label).click()}
        >
          <ExportIcon />
          <input
            id={label}
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => onUpload(e.target.files[0])}
          />
          <div>
            <p className="upload-txt">
              {label}
              <span className="text-[#DC2743]">*</span>
              <br />
              <br />
              <span className="upload-txt-span">
                {/* This will auto fill the details below.
                <br /> */}
                .doc, .pdf, .docx, .rtf, .odt ; max size - 10 MB
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
