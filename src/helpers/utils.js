
export const commonStyle = {
  sx111: {
    boxShadow: "0px 0px 50px 0px #0000001A",
    borderRadius: "20px",
    width: "260px",
    padding: "0px !important",
    marginTop: "37px",
    boxSizing: "border-box !important",
    "& .MuiMenu-list": {
      padding: "0px !important",
    },
  },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 100ms between items
      delayChildren: 0.2, // wait 200ms before starting
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
};

export const animation = {
  fadeInVariant: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fromRightVariant: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  },
  fromLeftVariant: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  },
  fadeInUpVariant: {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  },
  fromLeftItemVariant: {
    hidden: { opacity: 0, x: -100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
  },
  linkVariant: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  },
  itemFromRightVariant: {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  },
  lineVariant: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  },
  accordionVariant: {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  },
  navVariants: {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  },
  slideInFromLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  },
  showcaseVariants: {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  },
};

export const isEUCountry = (code) => {
  const EU_COUNTRIES = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
  ];
  return EU_COUNTRIES.includes(code);
};

export function cleanQuillHtml(html = "") {
  return html
    .replace(/&nbsp;/g, " ") // convert nbsp → normal space
    .replace(/\s+/g, " ") // normalize extra spaces
    .replace(/<p>\s*<\/p>/g, "") // remove empty paragraphs
    .replace(/<img\b([^>]*?)>/gi, (match, attributes) => {
      // If alt attribute is already present, return the original tag
      if (attributes.toLowerCase().includes("alt=")) {
        return match;
      }
      // Otherwise, add the default alt attribute
      return `<img alt="Unbox Robotics" ${attributes}>`;
    })
    .trim();
}

/**
 * Specifically for Tiptap inline text nodes.
 * Normalizes spaces but preserves leading/trailing spaces for formatting boundaries.
 */
export function cleanTiptapText(text = "") {
  if (typeof text !== "string") return text;
  return text
    .replace(/&nbsp;/g, " ") // convert nbsp → normal space
    .replace(/\s+/g, " "); // normalize extra spaces (no trim)
}

export const cleanHtml = (html) =>
  html?.replace(/<(.|\n)*?>/g, "").trim() || "";
