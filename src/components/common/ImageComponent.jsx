"use client";

import React, { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";

// Static image imports (require("*.webp")) resolve to StaticImageData objects
// under the Next.js bundler. Normalize them to their URL string so the plain
// <img>-based LazyLoadImage keeps rendering identically to the CRA build.
const resolveSrc = (src) => {
  if (src && typeof src === "object" && "src" in src) return src.src;
  return src;
};

const ImageComponent = forwardRef(
  ({ className, src, alt, onError, onClick, style, ...props }, ref) => {
    return (
      <LazyLoadImage
        className={className}
        wrapperClassName="common-img-wrapper"
        src={resolveSrc(src)}
        alt={alt}
        effect="blur"
        onError={onError}
        draggable={false}
        onClick={onClick}
        style={style}
        ref={ref}
        {...props}
      />
    );
  },
);

ImageComponent.displayName = "ImageComponent";

export default ImageComponent;
