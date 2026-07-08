"use client";

import React from "react";
import Link from "next/link";
import CommonButton from "./CommonButton";
import { animation } from "../../helpers/utils";

const NotFoundComponent = ({
  title = "Page Not Found",
  description = "The page you are looking for might have been removed, had its name changed, or it doesn't exist.",
  buttonText = "Go Back",
  buttonLink = "/",
}) => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 20px",
      }}>
      <div
        variants={animation?.fadeInUpVariant || {}}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <p
          style={{
            fontSize: "100px",
            lineHeight: "1",
            margin: "0 0 10px 0",
            fontWeight: "700",
          }}
          className="color-green-1">
          404
        </p>
        <p
          className="font-40-medium color-black-1"
          style={{ marginBottom: "15px" }}>
          {title}
        </p>
        <p
          className="font-16-regular color-black-1"
          style={{ marginBottom: "40px", maxWidth: "500px", opacity: 0.7 }}>
          {description}
        </p>
        <Link href={buttonLink}>
          <CommonButton theme={"green"} title={buttonText} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
