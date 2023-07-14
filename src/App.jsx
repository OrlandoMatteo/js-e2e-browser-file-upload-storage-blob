// ./src/App.tsx

import React, { useState, useEffect } from "react";
import uploadFileToBlob, {
  isStorageConfigured,
  getBlobsInContainer,
} from "./azure-storage-blob";
import DisplayImagesFromContainer from "./ContainerImages";
const storageConfigured = isStorageConfigured();

const App = () => {
  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState([]);
  const [fileUploaded, setFileUploaded] = useState("");

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  // *** GET FILES IN CONTAINER ***
  useEffect(() => {
    getBlobsInContainer().then((list) => {
      // prepare UI for results
      setBlobList(list);
    });
  }, [fileUploaded]);

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files);
  };

  const onFileUpload = async () => {
    if (fileSelected.length > 0) {
      // prepare UI

      setUploading(true);

      // Upload all the selected files to Azure blob storage
      for (let i = 0; i < fileSelected.length; i++) {
        await uploadFileToBlob(fileSelected[i]);
        console.log("Uploading file to Azure Blob Storage...");
      }


      // reset state/form
      setFileSelected([]);
      setFileUploaded();
      setUploading(false);
      setInputKey(Math.random().toString(36));
    }
  };

  // display form
  const DisplayForm = () => (
    <div className="fixed bottom-0 p-2 w-full bg-[#4ade80]">
      <input 
        className="bg-white rounded-3xl m-1"
        multiple
        type="file"
        onChange={onFileChange}
        key={inputKey || ""}
      />
      <button type="submit" onClick={onFileUpload} className="bg-green-200 px-5 py-3 text-sm shadow-sm rounded-2xl m-1">
        Upload!
      </button>
    </div>
  );

  return (
    <div className="space-y-2 text-center">
      <h1 className="text-6xl font-semibold sticky top-0 z-30 w-full bg-[#4ade80] p-2">Tzujiagram</h1>
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && (
        <DisplayImagesFromContainer blobList={blobList} />
      )}
      {!storageConfigured && <div>Storage is not configured.</div>}
      {storageConfigured && !uploading && DisplayForm()}

    </div>
  );
};

export default App;
