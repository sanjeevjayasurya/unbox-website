"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import "./index.css";

// Static image imports (require("*.webp")) resolve to StaticImageData objects
// under the Next.js bundler. Normalize them to their URL string.
const resolveSrc = (src) => {
  if (src && typeof src === "object" && "src" in src) return src.src;
  return src;
};

const isSvgSrc = (src) =>
  typeof src === "string" &&
  (src.endsWith(".svg") || src.includes(".svg?") || src.startsWith("data:image/svg"));

/**
 * Drop-in image helper that preserves existing layout CSS (common-img /
 * common-img-wrapper) while using next/image for optimization.
 */
const ImageComponent = forwardRef(
  (
    {
      className,
      src,
      alt,
      onError,
      onClick,
      style,
      priority = false,
      sizes = "100vw",
      fill = true,
      width,
      height,
      ...props
    },
    ref,
  ) => {
    const resolved = resolveSrc(src);
    if (!resolved) return null;

    const useFill = fill && width == null && height == null;
    const objectFit = className?.includes("object-contain")
      ? "contain"
      : className?.includes("object-cover")
        ? "cover"
        : "cover";

    return (
      <span
        className="common-img-wrapper"
        style={
          useFill
            ? { position: "relative", display: "block", width: "100%", height: "100%" }
            : undefined
        }
        onClick={onClick}
      >
        <Image
          ref={ref}
          className={className}
          src={resolved}
          alt={alt || ""}
          onError={onError}
          draggable={false}
          style={{
            objectFit,
            objectPosition: "center",
            ...style,
          }}
          priority={priority}
          sizes={sizes}
          unoptimized={isSvgSrc(resolved)}
          {...(useFill
            ? { fill: true }
            : { width: width || 800, height: height || 600 })}
          {...props}
        />
      </span>
    );
  },
);

ImageComponent.displayName = "ImageComponent";

export default ImageComponent;
