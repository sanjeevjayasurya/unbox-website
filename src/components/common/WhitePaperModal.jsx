"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Close from "../../assets/icons/Close_SM.svg";
import CommonButton from "./CommonButton";
import WhitePaperCalendar from "../../assets/icons/whitePaperCalendar.svg";

const WhitePaperModal = ({ visible, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{7,15}$/;

  useEffect(() => {
    const isFormValid =
      firstName.trim() && lastName.trim() && emailRegex.test(emailId);

    setDisabled(!isFormValid);
  }, [firstName, lastName, phNumber, emailId, company, location]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setPhNumber("");
    setEmailId("");
    setCompany("");
    setLocation("");
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      dialogClassName="common-modal"
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
      keyboard={true} // Esc works
      backdrop={true} // Click should work
      scrollable={false} // Prevent internal scroll causing jump
      // onClick={(e) => {
      //   // If clicked outside the modal-content, close
      //   if (e.target.classList.contains("custom-backdrop")) {
      //     handleClose();
      //   }
      // }}
    >
      <div className="modal-main overflow-visible">
        <div className="modal-header-div">
          <div className="flex flex-row gap-2 items-center">
            <div className="p-[12px] bg-[#079D921A] rounded-full">
              <WhitePaperCalendar />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-20-medium color-black-1">
                Get The White Paper
              </p>
              <p className="font-light text-[10px] text-[#818382]">
                Fill in your details to download
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              clearFields();
            }}
            className="cursor-pointer bg-transparent border-0 p-0"
            aria-label="Close modal"
          >
            <Close stroke="black" aria-hidden="true" />
          </button>
        </div>
        <div className="modal-form-div">
          <div className="modal-input-div">
            <div className="modal-title-input">
              <label htmlFor="wp-firstName" className="font-14-regular color-black-1">
                First Name<span className="text-[#DC2743]">*</span>
              </label>
              <div className="modal-input">
                <input
                  id="wp-firstName"
                  type="text"
                  className="modal-text-input font-14-regular color-black-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
              </div>
            </div>
            <div className="modal-title-input">
              <label htmlFor="wp-lastName" className="font-14-regular color-black-1">
                Last Name<span className="text-[#DC2743]">*</span>
              </label>
              <div className="modal-input">
                <input
                  id="wp-lastName"
                  type="text"
                  className="modal-text-input font-14-regular color-black-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
          </div>
          <div className="modal-input-div">
            {/* <div className="modal-title-input">
              <p className="font-14-regular color-black-1">Phone Number</p>
              <div className="modal-input">
                <input
                  type="tel"
                  className="modal-text-input font-14-regular color-black-1"
                  value={phNumber}
                  onChange={(e) => setPhNumber(e.target.value)}
                />
              </div>
            </div> */}
            <div className="modal-title-input">
              <label htmlFor="wp-emailId" className="font-14-regular color-black-1">
                Email Id<span className="text-[#DC2743]">*</span>
              </label>
              <div className="modal-input">
                <input
                  id="wp-emailId"
                  type="email"
                  className="modal-text-input font-14-regular color-black-1"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Enter Email Id"
                />
              </div>
            </div>
          </div>
          <div className="modal-input-div">
            <div className="modal-title-input">
              <label htmlFor="wp-company" className="font-14-regular color-black-1">
                Company Name
              </label>
              <div className="modal-input">
                <input
                  id="wp-company"
                  type="text"
                  className="modal-text-input font-14-regular color-black-1"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter Company Name"
                />
              </div>
            </div>
            {/* <div className="modal-title-input">
              <p className="font-14-regular color-black-1">Location</p>
              <div className="modal-input">
                <input
                  type="text"
                  className="modal-text-input font-14-regular color-black-1"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-row p-4 items-center bg-[#EFEFEF] rounded-[12px]">
            <p className="font-regular text-[12px] text-[#818382]">
              By providing your details, you consent to our Privacy Policy and
              agree to receive relevant industry insights and updates. You
              reserve the right to withdraw your consent and unsubscribe at any
              time.
            </p>
          </div>
          <div className="fle items-center justify-center">
            <CommonButton
              title={"Send Me Full White Paper"}
              onClick={() => {
                onClose();
                clearFields();
              }}
              theme={disabled ? "white" : "green"}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(WhitePaperModal);
