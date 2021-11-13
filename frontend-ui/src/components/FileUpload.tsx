import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import FileService from "../services/FileService";
import Alert from "./Alert";
import Loader from "./Loader";
import Icon from "./svg/Icon";

interface FileUploadProps {
  acceptType?: Array<String>
}

const FILE_UPLOAD_SUCESS = "File uploaded Successfully";
const FILE_UPLOAD_FAILURE = "File upload failed";

export default function FileUpload({ acceptType }: FileUploadProps) {

  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<String>("");
  const [isFileSupported, setFileSupported] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(true);
  const [uploadFileMutation, { loading }] = useMutation(FileService.uploadFileGQL);


  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [loading])

  const uploadFile = (e: any): void => {
    e.preventDefault();
    resetFormFields();

    uploadFileMutation({
      variables: { input: file },
    }).then((res: any) => {
      let isUploaded = res?.data?.uploadFile;
      setError(!isUploaded)
      setFile(null)
      setMessage(isUploaded ? FILE_UPLOAD_SUCESS : FILE_UPLOAD_FAILURE)

    }).catch((err: any) => {
      setError(true)
      setMessage(FILE_UPLOAD_FAILURE)
    })
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let fileName = event.target.files[0];
    setFile(fileName);
    validateFileType(fileName?.name);
    resetFormFields();
  };

  const resetFormFields = () => {
    setError(false)
    setMessage(null)
  }

  const validateFileType = (fileName: String) => {
    let fileExtension = fileName.split(".");
    if (!acceptType.includes("." + fileExtension[1])) {
      setFileSupported(true)
    } else {
      setFileSupported(false)
    }
  }

  return (
    <>
      <div 
      id="toast"
      className="max-w-12  flex 
       border-0
      text-white bottom-12 right-4 
                    absolute" role="alert">
        <Alert message={message} isError={isError} />
      </div>
      <div className="justify-center mt-4 w-full mb-2 rounded-lg ">
        <form onSubmit={uploadFile}>

          <div className="text-gray-700 flex-col flex items-center font-bold mb-3">File Upload</div>
          <div className="rounded-lg py-2 bg-gray-50">
            <div className="m-4">
              <div className="flex  w-full ">
                <label
                  className="flex flex-col w-full h-32 border-4 cursor-pointer border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center pt-7 ">
                    <Icon.FileUpload />
                    <p className="pt-1 text-sm truncate font-medium  text-gray-400">
                      {file?.name ? file.name : "Attach a file"}
                    </p>
                    {loading && <Loader />}
                  </div>
                  <input type="file"
                    disabled={loading}
                    accept={acceptType.toString()}
                    className="opacity-0  " onChange={handleChange} />
                </label>
              </div>
            </div>
          </div>
          <span className="flex items-center flex-col mb-1 error-text mt-1">{isFileSupported ? `Only ${acceptType} are supported` : ""}</span>
          <div className="flex p-2">
            <button
              type="submit"
              disabled={isDisabled()}
              className="w-full btn">
              Upload
            </button>
          </div>

        </form>
      </div>

    </>
  );

  function isDisabled(): boolean {
    return file?.name == null || isFileSupported || loading;
  }
}
