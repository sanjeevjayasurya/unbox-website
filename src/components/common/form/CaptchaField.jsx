"use client";

import React from "react";
import ChangeIcon from "../../../assets/icons/rotate-right.svg";

const CaptchaField = ({ imgSrc, onChange }) => (
  <div className="captcha-div">
    <div className="capthca-img-div">
      <img src={imgSrc} alt="Captcha challenge" className="captcha-img" />
    </div>
    <ChangeIcon aria-hidden="true" />
    <div className="captcha-input-div">
      <label htmlFor="captcha-input" className="sr-only">
        Enter Captcha
      </label>
      <input
        id="captcha-input"
        type="text"
        className="field-input-style-2 font-14-regular color-black-1"
        placeholder="Enter Captcha"
        onChange={onChange}
      />
    </div>
  </div>
);

export default CaptchaField;
