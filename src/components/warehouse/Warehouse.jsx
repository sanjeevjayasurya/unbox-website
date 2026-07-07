"use client";

// import React, { useEffect, useRef, useState } from "react";
// import "./index.css";
// import { warehouseDummy, warehousemask } from "../../helpers/assets";

// /**
//  * Dot definitions with IDEAL colors
//  * (Actual mask pixels may vary slightly)
//  */
// const DOTS = [
//   {
//     id: "gate_a",
//     title: "Induction Station",
//     info: "Automated station for scanning and placing items into the sortation workflow.",
//     color: { r: 255, g: 0, b: 0 },
//   },
//   {
//     id: "gate_b",
//     title: "Binning System",
//     info: "Modular storage structure designed for organized item placement and high-density sorting.",
//     color: { r: 0, g: 255, b: 0 },
//   },
//   {
//     id: "dock_1",
//     title: "Self Charging Station",
//     info: "Automated docking interface ensuring consistent robot recharging",
//     color: { r: 0, g: 0, b: 255 },
//   },
//   {
//     id: "dock_2",
//     title: "Sorting Robot",
//     // info: "High-performance autonomous mobile robot engineered for precise and efficient sortation.",
//     info: "High-performance autonomous guided vehicle engineered for precise and efficient sortation.",
//     color: { r: 255, g: 255, b: 0 },
//   },
//   {
//     id: "exit",
//     title: "Safety Barricading",
//     info: "A smart safety solution that ensures safe access to the robot work zones without compromising operational efficiency.",
//     color: { r: 255, g: 0, b: 255 },
//   },
// ];

// /**
//  * Utility: color distance
//  */
// const colorDistance = (c1, c2) =>
//   Math.sqrt(
//     Math.pow(c1.r - c2.r, 2) +
//       Math.pow(c1.g - c2.g, 2) +
//       Math.pow(c1.b - c2.b, 2)
//   );

// const COLOR_THRESHOLD = 12;

// /**
//  * Find closest dot by color
//  */
// const findDotByColor = (r, g, b) => {
//   let closest = null;
//   let minDistance = Infinity;

//   DOTS.forEach((dot) => {
//     const dist = colorDistance({ r, g, b }, dot.color);
//     if (dist < minDistance) {
//       minDistance = dist;
//       closest = dot;
//     }
//   });

//   return minDistance <= COLOR_THRESHOLD ? closest : null;
// };

// function Warehouse() {
//   const canvasRef = useRef(null);
//   const maskCanvasRef = useRef(null);
//   const [popup, setPopup] = useState(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const maskCanvas = maskCanvasRef.current;

//     const ctx = canvas.getContext("2d");
//     const maskCtx = maskCanvas.getContext("2d");

//     const img = new Image();
//     const maskImg = new Image();

//     img.src = warehouseDummy;
//     maskImg.src = warehousemask;

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//     };

//     maskImg.onload = () => {
//       maskCanvas.width = maskImg.width;
//       maskCanvas.height = maskImg.height;
//       maskCtx.drawImage(maskImg, 0, 0);
//     };
//   }, []);

//   const handleClick = (e) => {
//     const canvas = canvasRef.current;
//     const maskCanvas = maskCanvasRef.current;
//     const maskCtx = maskCanvas.getContext("2d");

//     const rect = canvas.getBoundingClientRect();

//     const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
//     const y = Math.floor(
//       ((e.clientY - rect.top) / rect.height) * canvas.height
//     );

//     const [r, g, b] = maskCtx.getImageData(x, y, 1, 1).data;

//     const dot = findDotByColor(r, g, b);

//     console.log("dot", dot, r, g, b);

//     if (dot) {
//       setPopup({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//         title: dot.title,
//         info: dot.info,
//       });
//     } else {
//       setPopup(null);
//     }
//   };

//   return (
//     <div className="warehouse-main-div">
//       <div className="warehouse-canvas-wrapper">
//         <canvas ref={canvasRef} onClick={handleClick} />

//         {/* Hidden mask canvas */}
//         <canvas ref={maskCanvasRef} style={{ display: "none" }} />

//         {popup && (
//           <div className="info-box" style={{ left: popup.x, top: popup.y }}>
//             <p className="popup-title">{popup.title}</p>
//             <p className="popup-info">{popup.info}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Warehouse;

import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { warehouseDummy, warehousemask } from "../../helpers/assets";

/**
 * Dot definitions (ideal colors)
 */
const DOTS = [
  {
    id: "gate_a",
    title: "Induction Station",
    info: "Automated station for scanning and placing items into the sortation workflow.",
    color: { r: 255, g: 0, b: 0 },
  },
  {
    id: "gate_b",
    title: "Binning System",
    info: "Modular storage structure designed for organized item placement and high-density sorting.",
    color: { r: 0, g: 255, b: 0 },
  },
  {
    id: "dock_1",
    title: "Self Charging Station",
    info: "Automated docking interface ensuring consistent robot recharging",
    color: { r: 0, g: 0, b: 255 },
  },
  {
    id: "dock_2",
    title: "Sorting Robot",
    info: "High-performance autonomous guided vehicle engineered for precise and efficient sortation.",
    color: { r: 255, g: 255, b: 0 },
  },
  {
    id: "exit",
    title: "Safety Barricading",
    info: "A smart safety solution that ensures safe access to the robot work zones without compromising operational efficiency.",
    color: { r: 255, g: 0, b: 255 },
  },
];

/**
 * Utilities
 */
const colorDistance = (c1, c2) =>
  Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

const COLOR_THRESHOLD = 12;

const findDotByColor = (r, g, b) => {
  let closest = null;
  let min = Infinity;

  for (const dot of DOTS) {
    const d = colorDistance({ r, g, b }, dot.color);
    if (d < min) {
      min = d;
      closest = dot;
    }
  }

  return min <= COLOR_THRESHOLD ? closest : null;
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

function Warehouse() {
  const canvasRef = useRef(null);
  const maskCanvasRef = useRef(null);

  // store positions as normalized % (0..1)
  const [popups, setPopups] = useState([]);

  const generatePopupsFromMask = () => {
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext("2d");

    const w = maskCanvas.width;
    const h = maskCanvas.height;

    const data = maskCtx.getImageData(0, 0, w, h).data;

    // accumulate centroid stats per dot
    const dotStats = {};
    DOTS.forEach((d) => {
      dotStats[d.id] = { sumX: 0, sumY: 0, count: 0, dot: d };
    });

    const STEP = 2; // more accurate

    for (let y = 0; y < h; y += STEP) {
      for (let x = 0; x < w; x += STEP) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dot = findDotByColor(r, g, b);
        if (!dot) continue;

        const stat = dotStats[dot.id];
        stat.sumX += x;
        stat.sumY += y;
        stat.count += 1;
      }
    }

    // convert to normalized coordinates (0..1)
    const results = Object.values(dotStats)
      .filter((s) => s.count > 0)
      .map((s) => {
        const cx = s.sumX / s.count; // in mask pixels
        const cy = s.sumY / s.count;
        if (s.dot.id === "gate_a") {
          return {
            id: s.dot.id,
            title: s.dot.title,
            info: s.dot.info,
            nx: cx / (w + 1900), // normalized 0..1
            ny: cy / (h - 300),
          };
        }
        if (s.dot.id === "dock_2") {
          return {
            id: s.dot.id,
            title: s.dot.title,
            info: s.dot.info,
            nx: cx / (w - 500), // normalized 0..1
            ny: cy / (h - 700),
          };
        }
        if (s.dot.id === "exit") {
          return {
            id: s.dot.id,
            title: s.dot.title,
            info: s.dot.info,
            nx: cx / w, // normalized 0..1
            ny: cy / (h + 100),
          };
        }
        return {
          id: s.dot.id,
          title: s.dot.title,
          info: s.dot.info,
          nx: cx / w, // normalized 0..1
          ny: cy / (h - 800),
        };
      });

    setPopups(results);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [img, maskImg] = await Promise.all([
          loadImage(warehouseDummy),
          loadImage(warehousemask),
        ]);

        if (cancelled) return;

        // draw main image
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // draw mask image into hidden canvas
        const maskCanvas = maskCanvasRef.current;
        const maskCtx = maskCanvas.getContext("2d");
        maskCanvas.width = maskImg.width;
        maskCanvas.height = maskImg.height;
        maskCtx.drawImage(maskImg, 0, 0);

        // generate popups (centroid)
        generatePopupsFromMask();
      } catch (e) {
        console.error("Image load failed:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="warehouse-main-div">
      <div
        className="warehouse-canvas-wrapper"
        style={{ position: "relative" }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />

        {/* Hidden mask canvas */}
        <canvas ref={maskCanvasRef} style={{ display: "none" }} />

        {/* Popups positioned by % so they stay correct on scaling */}
        {popups.map((p) => (
          <div
            key={p.id}
            className="info-box"
            style={{
              position: "absolute",
              left: `${p.nx * 100}%`,
              top: `${p.ny * 100}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="popup-title">{p.title}</p>
            <p className="popup-info">{p.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Warehouse;
