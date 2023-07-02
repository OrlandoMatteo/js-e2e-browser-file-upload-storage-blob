"use client";
import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
const DisplayImagesFromContainer = ({ blobList }) => {
  let modalUrl = "";
  let viewMode = "grid-cols-3";
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
  function toggleList()
  {
    console.log("toggleList");
    //set the state of  viewMode to list if the checkbox is checked
    if (document.getElementById("list").checked){
      document.getElementById("view").classList.remove("grid-cols-3");
      document.getElementById("view").classList.add("grid-cols-1");
    } 
    else {
      document.getElementById("view").classList.remove("grid-cols-1");
      document.getElementById("view").classList.add("grid-cols-3");
    }
  }
  return (
    <div className="">
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
        className=""
      >
        <Modal.Body className="p-0">
          <img
            id="modalImg"
            src={modalUrl}
            alt=""
            className="m-0 rounded-2xl"
          />
        </Modal.Body>
        <Modal.Footer className="p-0 justify-center">
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" id="list" onChange={toggleList}/>
        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          List view
        </span>
      </label>

      <div id="view" className={`grid gap-2 justify-items-center p-2 ${viewMode}`}>
        {blobList.map((item) => {
          return (
            <div className=" flex aspect-square justify-items-center rounded-2xl bg-white bg-opacity-20">
              <img
                src={item.url}
                alt=""
                className="m-auto h-full rounded-2xl object-scale-down"
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                onClick={() => {
                  let modalImg = document.getElementById("modalImg");
                  modalImg.src = item.url;
                  props.setOpenModal("dismissible");
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayImagesFromContainer;
