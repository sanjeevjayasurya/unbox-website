import {
  b2cRobotImage,
  inductionImage,
  lastMileRobotImage,
  manufactureImage,
  multiLevelBiningImage,
  outboundRobotImage,
  series450,
  series550,
  series650,
  sortingRobotImage,
  superPowerImg2,
  topViewImage,
} from "../../helpers/assets";
import WeightScale from "../../assets/images/solutions/weight-scale.svg";
import Speedometer from "../../assets/images/solutions/speedometer.svg";
import Box from "../../assets/images/solutions/box.svg";
import Arrow from "../../assets/images/solutions/arrow-expand-04.svg";

export const industryTabsData = [
  {
    id: "e-commerce",
    label: "E-commerce & Omnichannel Fulfillment",
    content: {
      image: manufactureImage,
      title:
        "Meet rising order volumes and delivery expectations with agile, software-driven automation.",
      features: [
        {
          name: "Faster Order Processing",
          description:
            "Enable rapid order consolidation and sortation for same-day and next-day deliveries.",
        },
        {
          name: "Peak-Ready Scalability",
          description:
            "Scale robot fleets dynamically during sales events without operational disruption.",
        },
        {
          name: "Seamless System Integration",
          description:
            "Integrates smoothly with existing WMS to support omnichannel fulfillment models.",
        },
      ],
    },
  },
  {
    id: "3pl",
    label: "3PL & Express Logistics",
    content: {
      image: manufactureImage,
      title:
        "Handle high parcel volumes with consistent accuracy, speed, and space efficiency",
      features: [
        {
          name: "High Sorting Accuracy",
          description:
            "Achieve near-perfect sortation accuracy across thousands of destinations",
        },
        {
          name: "Rapid Deployment",
          description:
            "Go live in weeks instead of months to respond quickly to network expansion needs",
        },
        {
          name: "Lower Cost Per Shipment",
          description:
            "Reduce dependency on manual labor while improving throughput and reliability",
        },
      ],
    },
  },
  {
    id: "retail",
    label: "Retail & Fashion Distribution",
    content: {
      image: manufactureImage,
      title:
        "Optimize store replenishment and order consolidation in space-constrained facilities.",
      features: [
        {
          name: "Store-Wise Sorting",
          description:
            "Automate sorting by store, route, or order with high precision and flexibility",
        },
        {
          name: "Compact Deployments",
          description:
            "Enable automation on mezzanines and urban distribution centers with limited space",
        },
        {
          name: "Improved Productivity",
          description:
            "Increase people and space productivity across fulfillment and replenishment workflows",
        },
      ],
    },
  },
  {
    id: "warehousing",
    label: "Warehousing & Distribution",
    content: {
      image: manufactureImage,
      title:
        "Increase fulfillment speed while maximizing space utilization and operational flexibility.",
      features: [
        {
          name: "High-Throughput Operations",
          description:
            "Accelerate inbound, outbound, and consolidation workflows.",
        },
        {
          name: "Space-Efficient Automation",
          description:
            "Reduce warehouse footprint using compact, vertical, and modular robotic systems.",
        },
        {
          name: "Scalable Performance",
          description:
            "Easily scale capacity for peak seasons without adding fixed infrastructure",
        },
      ],
    },
  },
  {
    id: "postal",
    label: "Postal & Parcel Networks",
    content: {
      image: manufactureImage,
      title:
        "Modernize primary and secondary sortation without rigid infrastructure",
      features: [
        {
          name: "High-Volume Sortation",
          description:
            "Handle large parcel volumes efficiently across regional and national networks.",
        },
        {
          name: "Flexible Network Design",
          description:
            "Adapt quickly to changing destinations and routing requirements.",
        },
        {
          name: "Future-Ready Automation",
          description:
            "Replace legacy conveyor systems with modular, scalable robotic solutions.",
        },
      ],
    },
  },
];

export const machineTabsData = [
  {
    id: "sr450c",
    label: "SR-450",
    content: {
      title: "Meet the sr series",
      subtitle:
        "The UnboxSort solution utilizes the SR series which features vertical lift robots engineered for compact, high-density sortation. Designed to handle varied parcel for modern, space-constrained warehouses.",
      features: [
        {
          name: "Payload",
          feature: "Up to 24 kg",
          image: WeightScale,
        },
        {
          name: "Max.Speed",
          feature: "Up to 3.2 m/s",
          image: Speedometer,
        },
        {
          name: "Parcel Size",
          feature: "450 x 350 x 350 mm",
          image: Box,
        },
        {
          name: "Sorting Height",
          feature: "Up to 2.4 m",
          image: Arrow,
        },
      ],
    },
    image: series450,
  },
  {
    id: "sr550c",
    label: "SR-550",
    content: {
      title: "Meet the sr series",
      subtitle:
        "The UnboxSort solution utilizes the SR series which features vertical lift robots engineered for compact, high-density sortation. Designed to handle varied parcel for modern, space-constrained warehouses.",
      features: [
        {
          name: "Payload",
          feature: "Up to 24 kg",
          image: WeightScale,
        },
        {
          name: "Max.Speed",
          feature: "Up to 3.2 m/s",
          image: Speedometer,
        },
        {
          name: "Parcel Size",
          feature: "550 x 400 x 350 mm",
          image: Box,
        },
        {
          name: "Sorting Height",
          feature: "Up to 2.4 m",
          image: Arrow,
        },
      ],
    },
    image: series650,
  },
  {
    id: "sr650c",
    label: "SR-650",
    content: {
      title: "Meet the sr series",
      subtitle:
        "The UnboxSort solution utilizes the SR series which features vertical lift robots engineered for compact, high-density sortation. Designed to handle varied parcel for modern, space-constrained warehouses.",
      features: [
        {
          name: "Payload",
          feature: "Up to 11 kg",
          image: WeightScale,
        },
        {
          name: "Max.Speed",
          feature: "Up to 3.2 m/s",
          image: Speedometer,
        },
        {
          name: "Parcel Size",
          feature: "650 x 500 x 350 mm",
          image: Box,
        },
        {
          name: "Sorting Height",
          feature: "Up to 2.4 m",
          image: Arrow,
        },
      ],
    },
    image: series550,
  },
];

export const workAreaData = [
  {
    id: 1,
    title: "Solution Overview",
    image: topViewImage,
    content:
      "A compact, vertical robotic sortation system designed to maximize throughput, accuracy, and space efficiency while seamlessly integrating into modern fulfillment and logistics operations.",
  },
  {
    id: 2,
    title: "Induction Station",
    image: inductionImage,
    content:
      "Automated induction stations scan and assign parcels to robots in real time, ensuring accurate data capture and smooth entry into the sortation workflow with minimal manual handling.",
  },
  {
    id: 3,
    title: "Sorting Robot",
    image: sortingRobotImage,
    content:
      "High-efficiency vertical sorting robots autonomously transport and place parcels across multiple levels, enabling dense sortation layouts with consistent speed, precision, and reliability at scale.",
  },
  {
    id: 4,
    title: "Multi-level Binning System",
    image: multiLevelBiningImage,
    content:
      "A modular, multi-level binning system that uses vertical space to support high destination density, enabling organized parcel placement and faster consolidation within a compact footprint.",
  },
];

export const superPowersData = [
  {
    id: 1,
    title: "Last-mile Sorting",
    units: "Parcels & Polybags",
    image: lastMileRobotImage,
  },
  {
    id: 2,
    title: "B2C Order Consolidation",
    units: "Multi-level chutes",
    image: b2cRobotImage,
  },
  {
    id: 3,
    title: "Outbound Sorting",
    units: "Parcels & Boxes",
    image: outboundRobotImage,
  },
  {
    id: 4,
    title: "Reverse Logistics",
    units: "Parcels & Polybags",
    image: superPowerImg2,
  },
];
