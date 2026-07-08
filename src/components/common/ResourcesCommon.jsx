"use client";

import React from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import BlogCard from "./BlogCard";

const ResourcesCommon = ({ data, onClick }) => {
  return (
    <div className="blogs-data-map-div">
      {data.map((item, index) => {
        return <BlogCard item={item} key={index} onClick={onClick} />;
      })}
    </div>
  );
};

export default ResourcesCommon;
