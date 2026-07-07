import SmartRackIcon from "../../assets/icons/arrange-square-2.svg";
import MobileRobotIcon from "../../assets/icons/routing-2.svg";
import RadarIcon from "../../assets/icons/radar.svg";
import {
  accordionTech1,
  accordionTech2,
  accordionTech3,
  accordionTech4,
  accordionWeighing,
  bcImage,
  gaylordsImage,
  gravityImage,
  hyImage,
  rollcagesImage,
  ssImage,
  techService1,
  tsImage,
} from "../../helpers/assets";

export const techonologyInteligenceInfo = [
  {
    id: 1,
    question: "Bag Chute",
    answer: "Direct-to-bag sorting for last-mile and hub operations",
    image: bcImage,
  },
  {
    id: 2,
    question: "Straight Slide",
    answer: "Used for order consolidation and store-wise sortation",
    image: ssImage,
  },
  {
    id: 3,
    question: "Rollcages",
    answer: "Carrier-based outbound sortation",
    image: rollcagesImage,
  },
  {
    id: 4,
    question: "Gaylords",
    answer: "Carrier-based outbound sortation",
    image: gaylordsImage,
  },
  {
    id: 5,
    question: "Gravity Flow",
    answer:
      "Carton or tote sortation (commonly used in footwear and similar industries)",
    image: gravityImage,
  },
  {
    id: 6,
    question: "Tote Slide",
    answer: "Direct sort into cartons or totes.",
    image: tsImage,
  },
  {
    id: 7,
    question: "Hybrid Systems",
    answer: "Combination layouts tailored to mixed operational needs",
    image: hyImage,
  },
];

export const techHelp = [
  {
    id: 1,
    icon: <RadarIcon />,
    title: "Vertical Robotic Sortation",
    description:
      "A vertical robotic sortation system that uses warehouse height to deliver high throughput while reducing floor space requirements by 50–70% compared to traditional conveyor-based systems.",
  },
  {
    id: 2,
    icon: <MobileRobotIcon />,
    title: "Swarm-Enabled Robotics Fleet",
    description:
      "Robots operate as coordinated fleets using swarm-based algorithms and smart fleet management to dynamically optimise routing, throughput, and system efficiency at scale.",
  },
  {
    id: 3,
    icon: <SmartRackIcon />,
    title: "Modular & Software-Defined Deployment",
    description:
      "A modular, software-defined system that enables rapid deployment, easy scaling, and flexible capacity expansion without disrupting ongoing operations.",
  },
];

export const techAccordionData = [
  {
    id: 0,
    title: "Auto Induction Station",
    content:
      "Automatically scans incoming parcels and discharges them onto robots. Once inducted, the robot independently transports the parcel to its assigned destination, eliminating manual handoffs.",
    image: accordionTech1,
  },
  {
    id: 1,
    title: "Automatic Weighing Module",
    content:
      "Once a parcel is placed on the robot, weight data is automatically captured as the robot passes over the weighing module and transferred to backend systems in real time.",
    image: accordionWeighing,
  },
  {
    id: 2,
    title: "Automatic Dimensioning Module",
    content:
      "Parcel dimensions are automatically recorded when robots pass beneath the dimensioning module, ensuring accurate volumetric data without manual scanning.",
    image: accordionTech2,
  },
  {
    id: 3,
    title: "Smart Charging System",
    content:
      "Robots are supported by an intelligent charging system that ensures optimal battery availability and minimal downtime during operations.",
    image: accordionTech3,
  },
  {
    id: 4,
    title: "Smart Safety Barricading",
    // content:
    //   "A safety fencing system that intelligently differentiates between human and robot movement within confined robot zones, ensuring safe coexistence on the warehouse floor.",
    content:
      "A smart safety solution that ensures safe access to the robot work zones without compromising operational efficiency.",
    image: accordionTech4,
  },
  // {
  //   id: 5,
  //   title: "Exportable Reports On-Demand",
  //   content:
  //     "AI-driven swarm algorithms sync robots, preventing pile-ups, with real-time browser updates.",
  //   image: accordionTech1,
  // },
];

export const featureInfoData = [
  {
    id: 1,
    name: "Native Software Platform",
    description:
      "Purpose-engineered in-house without ROS dependencies, our software ensures lightning fast responses, seamless updates, and absolute robot precision",
  },
  {
    id: 2,
    name: "Proprietary Compact Battery Pack",
    description:
      "Our proprietary battery packs deliver maximum uptime with minimal footprint—compact, energy-efficient design enables sleek robots, rapid charging, and continuous operation",
  },
];

export const techServiceData = [
  {
    id: 1,
    image: techService1,
    title: "Intelligent Service Assistance",
    description:
      "Technicians and operators get AI-guided support for faster troubleshooting and resolution",
  },
  {
    id: 2,
    image: techService1,
    title: "System Health Insights",
    description:
      "Gain real-time visibility into the performance and condition of every robot and component",
  },
  {
    id: 3,
    image: techService1,
    title: "Predictive Maintenance Alerts",
    description:
      "Stay ahead of downtime with proactive alerts and diagnostics based on real-time equipment data",
  },
  {
    id: 4,
    image: techService1,
    title: "Self-Evolving",
    description:
      "Every service interaction strengthens the system’s recommendations over time getting smarter with every fix",
  },
];
