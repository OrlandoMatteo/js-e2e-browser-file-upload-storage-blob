"use client";
import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
const DisplayImagesFromContainer = ({ blobList }) => {
  let modalUrl = "";
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
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
        <Modal.Footer className="p-0">
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 justify-items-center">
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
