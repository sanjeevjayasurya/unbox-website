"use client";

import React from "react";
import { useRouteError, useRouter } from "next/navigation";
import "./error.css";
import CommonButton from "../../components/common/CommonButton";

const ErrorPage = () => {
  const error = useRouteError();
  const router = useRouter();

  return (
    <>
      <div className="error-div min-h-[60vh] flex flex-col items-center justify-center py-20">
        <h1 className="font-40-regular text-black-1 ">Oops!</h1>
        <p className="font-16-light text-black-1 ">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i className="font-16-light text-black-1">
            {error?.statusText || error?.message}
          </i>
        </p>
        <div className="mt-10">
          <CommonButton
            theme={"white"}
            onClick={() => router.push("/")}
            title={"Go To Home"}
          />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
