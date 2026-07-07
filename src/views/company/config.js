import {
  about1,
  about2,
  comapnyJoin1,
  comapnyJoin2,
  comapnyJoin3,
  pramodImage,
  rohitImage,
  shahidImage,
  careersData1,
  careersData2,
  careersData3,
  careersData4,
  companyImage,
  unboxLife1Image,
  unboxLife2Image,
  unboxLife3Image,
  unboxLife4Image,
  unboxLife5Image,
  careerTabImage1,
} from "../../helpers/assets";

import RealIcon from "../../assets/icons/careers/real.svg";
import CrossIcon from "../../assets/icons/careers/cross.svg";
import LearningIcon from "../../assets/icons/careers/learning.svg";
import GlobalIcon from "../../assets/icons/careers/global.svg";
import OwnershipIcon from "../../assets/icons/careers/ownership.svg";
import HealthIcon from "../../assets/icons/careers/health.svg";

// "Why you should work with Unbox Robotics" — tabbed content.
export const careersWhyWorkTabs = [
  {
    id: "team",
    label: "Team",
    image: careerTabImage1,
    description:
      "We are a young and dynamic team of engineers, designers, and business professionals who are passionate about innovation and creating value for their customers. The team at Unbox Robotics is highly skilled and experienced in their respective domains, and they work together in a collaborative environment to develop innovative solutions for their clients.",
  },
  {
    id: "responsibility",
    label: "Responsibility",
    image: careerTabImage1,
    description:
      "We hand real ownership to people early. Sortation is a problem the world's biggest logistics players have wrestled with for decades, and we trust young engineers to rebuild it from first principles. The size of the problem you're trusted with grows as fast as you do.",
  },
  {
    id: "culture",
    label: "Culture",
    image: careerTabImage1,
    description:
      "We're committed to a culture where deep-tech ambition meets ground-truth execution. We reward first-principles thinking, bias to action, and the humility to learn from a robot that fails on the floor. Freedom to challenge assumptions, paired with real accountability for the outcome.",
  },
  {
    id: "stories",
    label: "Stories",
    image: careerTabImage1,
    description:
      "Solving one of logistics' most stubborn problems shapes how our people think everywhere. We back those who want to make their mark, from filing a patent to watching customers react to what they built on a global expo floor. Mentorship, ownership, and the runway to soar.",
  },
];

// "Life at Unbox" — bento gallery imagery.
export const lifeAtUnboxImages = [
  { id: 1, image: unboxLife1Image, alt: "Unbox Robotics team" },
  { id: 2, image: unboxLife2Image, alt: "Engineering at Unbox" },
  { id: 3, image: unboxLife3Image, alt: "Unbox Robotics office" },
  { id: 4, image: unboxLife4Image, alt: "Unbox robotics lab" },
  { id: 5, image: unboxLife5Image, alt: "Unbox team gathering" },
];

// "Why Join Us" — benefit cards. `icon` keys map to inline SVGs in the page.
export const whyJoinUsList = [
  {
    id: 1,
    icon: <RealIcon />,
    title: "Real robotics, real scale",
    description:
      "Ship hardware + software that moves millions of units a week.",
  },
  {
    id: 2,
    icon: <CrossIcon />,
    title: "Cross-functional rotations",
    description:
      "Move between perception, controls, fleet software and field deployment.",
  },
  {
    id: 3,
    icon: <LearningIcon />,
    title: "Learning budget",
    description: "Structured time and budget for courses and certifications.",
  },
  {
    id: 4,
    icon: <GlobalIcon />,
    title: "Global exposure",
    description:
      "Commission systems with customers across India, EMEA, APAC and North America.",
  },
  {
    id: 5,
    icon: <OwnershipIcon />,
    title: "Ownership equity",
    description:
      "Meaningful ownership for the people building the core platform.",
  },
  {
    id: 6,
    icon: <HealthIcon />,
    title: "Health & wellbeing",
    description: "Comprehensive cover for you and your family.",
  },
];

// "Where we are" — office locations.
export const careerLocations = [
  { id: 1, city: "Pune", country: "India", tag: "HQ" },
  { id: 2, city: "Bengaluru", country: "India", tag: "Engineering" },
];

export const founderData = [
  {
    id: 1,
    name: "Pramod Ghadge",
    status: "Co-founder & CEO",
    linkedIn: "https://www.linkedin.com/in/pramodghadge/",
    insta: "#",
    twitter: null,
    image: pramodImage,
  },
  {
    id: 2,
    name: "Shahid Memon",
    status: "Co-founder & CTO",
    linkedIn: "https://www.linkedin.com/in/shahid-m-a7a83a96/",
    insta: "#",
    twitter: null,
    image: shahidImage,
  },
  {
    id: 3,
    name: "Rohit Pitale",
    status: "CGO",
    linkedIn: "https://www.linkedin.com/in/rohit-pitale/",
    insta: "#",
    twitter: "#",
    image: rohitImage,
  },
];

export const companyAboutList = [
  {
    id: 1,
    image: about1,
    description:
      "The global e-commerce boom created a painful bottleneck: warehouses simply couldn't scale or sort fast enough without enormous space and labor costs. Founded on the belief that AI and robotics could eliminate this universal constraint, Unbox Robotics engineered a compact, high-precision swarm system to make rapid, vertical fulfillment accessible.",
  },
  {
    id: 2,
    image: about2,
    description:
      "Founded in 2019, Unbox Robotics builds automation systems tailored to real-world warehouse challenges. Designed and manufactured in India, our compact, modular platform combines proprietary hardware and software for fast deployment and effortless scale.",
  },
];

export const whyJoinAboutList = [
  {
    id: 1,
    image: comapnyJoin1,
    title: "Push Boundaries",
    description:
      "Work on swarm robotics that redefine speed and space—think 3X faster, 50% smaller.",
  },
  {
    id: 2,
    image: comapnyJoin2,
    title: "Make an Impact",
    description:
      "Transform global logistics, empowering workers and clients like Flipkart with smarter solutions.",
  },
  {
    id: 3,
    image: comapnyJoin3,
    title: "Grow Fearlessly",
    description:
      "Join a team that scales fast, innovates daily, and shapes the future of work.",
  },
];

export const CareersData = [
  {
    id: 1,
    name: "Deployment",
    postions: [
      {
        id: 1,
        title: "Deployment Intern",
        subTitle: "We are looking for a deployment intern",
        location: "Pune",
        type: "Full-time",
      },
      {
        id: 2,
        title: "Site Installation Engineer",
        subTitle: "We are looking for an installation engineer",
        location: "Pune",
        type: "Full-time",
      },
    ],
  },
  {
    id: 2,
    name: "Electronics",
    postions: [
      {
        id: 1,
        title: "Embedded Hardware Engineer",
        subTitle: "We are looking for a embedded hardware engineer",
        location: "Pune",
        type: "Full-time",
      },
      {
        id: 2,
        title: "Embedded Hardware Intern",
        subTitle: "We are looking for an embedded hardware intern",
        location: "Pune",
        type: "Full-time",
      },
      {
        id: 3,
        title: "Embedded Firmware Engineer",
        subTitle: "We are looking for a embedded firmware engineer",
        location: "Pune",
        type: "Full-time",
      },
      {
        id: 4,
        title: "Embedded Firmware Intern",
        subTitle: "We are looking for an embedded firmware intern",
        location: "Pune",
        type: "Full-time",
      },
      {
        id: 5,
        title: "Harness Design Engineer",
        subTitle: "We are looking for an embedded firmware intern",
        location: "Pune",
        type: "Full-time",
      },
    ],
  },
  {
    id: 3,
    name: "Operations",
    postions: [
      {
        id: 1,
        title: "Electronics Technician",
        subTitle: "We are looking for a electronics technician",
        location: "Bhiwandi",
        type: "Full-time",
      },
    ],
  },
];
