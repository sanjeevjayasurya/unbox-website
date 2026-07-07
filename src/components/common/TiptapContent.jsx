import React, { Suspense, lazy } from "react";
import { cleanHtml, cleanQuillHtml, cleanTiptapText } from "../../helpers/utils";
import "./TiptapContent.css";

const LazyMathBlock = lazy(() => import("./LazyMathBlock"));

/**
 * TiptapContent Component
 * Renders Tiptap JSON or legacy HTML string.
 *
 * @param {Object|string} content - The content to render (JSON object or HTML string)
 * @param {string} className - Optional extra wrapper classes
 */
const TiptapContent = ({ content, className = "" }) => {
  if (!content) return null;

  // Handle Legacy HTML String
  if (typeof content === "string") {
    return (
      <div
        className={`prose max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: cleanQuillHtml(content) }}
      />
    );
  }

  // Handle Tiptap JSON
  return (
    <div
      className={`prose max-w-none tiptap-render-wrapper clearfix ${className}`}
    >
      {content.content?.map((node, index) => (
        <TiptapNode key={index} node={node} />
      ))}
    </div>
  );
};

// Recursive Node Renderer
const TiptapNode = ({ node }) => {
  if (!node) return null;

  switch (node.type) {
    case "heading": {
      const Tag = `h${node.attrs?.level || 1}`;
      const textAlign = node.attrs?.textAlign;
      return (
        <Tag
          className="clear-both my-4"
          style={textAlign ? { textAlign } : {}}
        >
          <RenderContent content={node.content} />
        </Tag>
      );
    }

    case "paragraph": {
      const textAlign = node.attrs?.textAlign;
      return (
        <p className="mb-4" style={textAlign ? { textAlign } : {}}>
          <RenderContent content={node.content} />
        </p>
      );
    }

    case "blockquote":
      return (
        <blockquote>
          <RenderContent content={node.content} />
        </blockquote>
      );

    case "bulletList":
      return (
        <ul>
          {node.content?.map((item, i) => (
            <TiptapNode key={i} node={item} />
          ))}
        </ul>
      );

    case "orderedList": {
      const { start } = node.attrs || {};
      return (
        <ol start={start || 1}>
          {node.content?.map((item, i) => (
            <TiptapNode key={i} node={item} />
          ))}
        </ol>
      );
    }

    case "listItem":
      return (
        <li>
          <RenderContent content={node.content} />
        </li>
      );

    case "horizontalRule":
      return <hr />;

    case "hardBreak":
      return <br />;

    case "codeBlock":
      return (
        <pre>
          <code>
            <RenderContent content={node.content} />
          </code>
        </pre>
      );

    // --- Custom Nodes ---

    case "columns": {
      const columnCount = node.attrs?.cols || 2;
      return (
        <div
          className={`grid grid-cols-1 md:grid-cols-${columnCount} gap-6 my-8 clear-both`}
        >
          {node.content?.map((child, i) => (
            <TiptapNode key={i} node={child} />
          ))}
        </div>
      );
    }

    case "column":
      return (
        <div className="flex-1 min-w-0">
          {node.content?.map((child, i) => (
            <TiptapNode key={i} node={child} />
          ))}
        </div>
      );

    case "imageBlock": {
      const { src, alt, align, width } = node.attrs || {};
      let wrapperClass = "image-block-wrapper relative mb-4";
      // Allow the wrapper to shrink to the image's width
      let wrapperStyle = { 
        width: width && width !== "100%" ? width : "auto", 
        maxWidth: (align === "left" || align === "right") ? "50%" : "100%" 
      };
      
      let imgStyle = { width: "100%", height: "auto", display: "block" };

      if (align === "left") {
        wrapperClass += " float-left mr-5 ";
      } else if (align === "right") {
        wrapperClass += " float-right ml-5 ";
      } else if (align === "center") {
        wrapperClass += " mx-auto text-center clear-both block ";
        wrapperStyle.width = width || "100%";
      } else if (align === "full") {
        wrapperClass += " w-full clear-both block ";
        wrapperStyle.width = "100%";
      }

      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <img
            src={src}
            alt={alt || "Unbox Robotics"}
            style={imgStyle}
            className="rounded-xl shadow-md border border-gray-100 m-0 p-0"
          />
        </div>
      );
    }

    case "quoteBlock": {
      return (
           <blockquote className="quote-block-wrapper border-l-4 border-[#00A99D] pl-6 py-4 my-8 bg-gray-50 rounded-r-xl">
          <div className="quote-main-content italic text-lg text-gray-800 mb-4">
            {node.content?.map((child, i) => (
              <TiptapNode key={i} node={child} />
            ))}
          </div>
        </blockquote>
      );
    }

    case "mathBlock": {
      const { latex } = node.attrs || {};
      return (
        <div className="math-block p-6 my-6 bg-gray-900 border border-gray-800 rounded-xl text-white font-mono overflow-x-auto">
          <Suspense fallback={<code className="text-white">{latex}</code>}>
            <LazyMathBlock math={latex} />
          </Suspense>
        </div>
      );
    }

    case "table":
      return (
        <div className="table-wrapper overflow-x-auto my-8">
          <table className="min-w-full border-collapse border border-gray-200">
            <tbody>
              {node.content?.map((child, i) => (
                <TiptapNode key={i} node={child} />
              ))}
            </tbody>
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr className="border-b border-gray-200 ">
          {node.content?.map((child, i) => (
            <TiptapNode key={i} node={child} />
          ))}
        </tr>
      );

    case "tableHeader": {
      const { colspan, rowspan, textAlign, backgroundColor } = node.attrs || {};
      return (
        <th
          colSpan={colspan || 1}
          rowSpan={rowspan || 1}
          className="px-4 py-3 font-bold text-gray-700 border-x border-gray-200"
          style={{
            textAlign,
            backgroundColor: backgroundColor || "#f9fafb", // Fallback to gray-50
          }}
        >
          {node.content?.map((child, i) => (
            <TiptapNode key={i} node={child} />
          ))}
        </th>
      );
    }

    case "tableCell": {
      const { colspan, rowspan, textAlign, background } = node.attrs || {};
      return (
        <td
          colSpan={colspan || 1}
          rowSpan={rowspan || 1}
          className="px-4 py-3 border-x border-gray-200"
          style={{
            textAlign,
            backgroundColor: background || "#ffffff", // Fallback to white
          }}
        >
          {node.content?.map((child, i) => (
            <TiptapNode key={i} node={child} />
          ))}
        </td>
      );
    }

     case "videoBlock": {
      const { src, type, align, width } = node.attrs || {};
      let wrapperClass = "video-block-wrapper my-8 clear-both relative mx-auto";
      if (align === "left") wrapperClass = "float-left mr-6 max-w-[50%] my-4";
      if (align === "right") wrapperClass = "float-right ml-6 max-w-[50%] my-4";
      if (align === "full") wrapperClass = "w-full my-8";

      const content =
        type === "youtube" ? (
          <div 
            className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-black"
            style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
          >
            <iframe
              src={src}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={src}
            controls
            className="w-full rounded-xl shadow-lg border border-gray-100"
            style={{ width: "100%", display: "block" }}
          />
        );

      return (
        <div className={wrapperClass} style={{ width: width || "100%" }}>
          {content}
        </div>
      );
    }

    default:
      return null;
  }
};

// Helper for inline content (text with marks)
const RenderContent = ({ content }) => {
  if (!content) return null;

  return content.map((node, i) => {
    if (node.type === "text") {
      let element = <span key={i}>{cleanTiptapText(node.text)}</span>;

      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type === "bold") element = <strong key={i}>{element}</strong>;
          if (mark.type === "italic") element = <em key={i}>{element}</em>;
          if (mark.type === "underline") element = <u key={i}>{element}</u>;
          if (mark.type === "strike") element = <s key={i}>{element}</s>;
          if (mark.type === "code") element = <code key={i}>{element}</code>;
          if (mark.type === "link") {
            element = (
              <a
                key={i}
                href={mark.attrs.href}
                target={mark.attrs.target || "_blank"}
                rel="noopener noreferrer"
              >
                {element}
              </a>
            );
          }
          if (mark.type === "highlight") {
            element = (
              <mark
                key={i}
                style={{ backgroundColor: mark.attrs.color || "#ffff00" }}
              >
                {element}
              </mark>
            );
          }
          if (mark.type === "textStyle") {
            if (mark.attrs.color)
              element = (
                <span key={i} style={{ color: mark.attrs.color }}>
                  {element}
                </span>
              );
          }
        });
      }
      return element;
    }
    return <TiptapNode key={i} node={node} />;
  });
};

export default TiptapContent;
