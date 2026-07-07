import {
  eventRobot,
  europeHero,
  lukasz,
  rohit,
  shahid,
  cematAusHero,
  unboxSecure,
  whyUnboxImage,
  robot,
  productImage,
} from "./assets";

// ============================================================================
//  Recap content for a past event's detail page (moments gallery, impact
//  stats and the "Recap & Resources" block). Rendered by <EventFloorRecap />.
// ============================================================================
export const cematRecap = {
  moments: {
    title: "The moments from the floor",
    subtitle:
      "Live demos, booth walkthroughs, partner meetings and the swarm-coordination talk.",
    gallery: [
      {
        id: 1,
        image: cematAusHero,
        caption: "UnboxSort sorting live at 1,000+ parcels/hour",
      },
      { id: 2, image: europeHero, caption: "Booth IT24 walkthroughs" },
      { id: 3, image: whyUnboxImage, caption: "Swarm coordination talk" },
      {
        id: 4,
        image: eventRobot,
        caption: "UnboxSort sorting live at 1,000+ parcels/hour",
      },
      { id: 5, image: robot, caption: "European 3PL teams" },
    ],
  },
  stats: [
    { value: "3,000+", label: "Booth Visitors" },
    { value: "100+", label: "Live Demos" },
    { value: "60", label: "Qualified Meetings" },
    { value: "12+", label: "Press Mentions" },
  ],
  resources: {
    title: "Recap & Resources",
    subtitle: "Everything from CeMAT Australia 2026, in one place.",
    takeawaysTitle: "Key takeaways",
    // Each takeaway has its own recording — clicking a takeaway makes it active
    // and swaps the video/recording card on the right.
    takeaways: [
      {
        title: "Technical session: swarm coordination",
        text: "How hundreds of robots stay aware of each other and their payloads, without collisions or congestion, at speed.",
        recording: {
          tag: "Event Highlight",
          image: productImage,
          title: "Coordinating swarms at warehouse scale",
          meta: "28 min · Rohit Pitale, Co-founder & CGO",
          buttonLabel: "Watch the session recording",
          link: "",
        },
      },
      {
        title: "Panel: the future of flexible automation",
        text: "Why mobile swarms are reshaping facility design, and how operators are phasing them in alongside existing kit.",
        recording: {
          tag: "Panel Discussion",
          image: cematAusHero,
          title: "The future of flexible automation",
          meta: "35 min · Industry panel",
          buttonLabel: "Watch the panel",
          link: "",
        },
      },
      {
        title: "On the floor",
        text: "Hands-on conversations with operators and integrators across the show.",
        recording: {
          tag: "Highlights Reel",
          image: europeHero,
          title: "On the floor at CeMAT Australia 2026",
          meta: "6 min · Show-floor highlights",
          buttonLabel: "Watch the highlights",
          link: "",
        },
      },
    ],
  },
};

// ============================================================================
//  Single source of truth for the News & Events page.
//  The Featured "Next Up" card, the Upcoming / Past toggle, the "Past Events"
//  spotlight carousel and the "Relive …" recap section are ALL derived from
//  this one `eventData` array. Add / edit / re-status an event here and every
//  section updates automatically.
// ============================================================================
export const eventData = [
  {
    id: 4,
    status: "upcoming",
    tag: "Trade Show",
    title: "MODEX 2027",
    date: "8-11 , March 2027",
    location: "Atlanta, GA",
    image: unboxSecure,
    link: "/events/modex-2027",
    // Extra copy shown when this event is the "Next Up" featured event.
    featured: {
      eyebrow: "Upcoming Event",
      heading: "Meet UnboxSort at MODEX 2027",
      description:
        "See vertical mobile sortation live at North America's premier supply chain event. Join our solutions engineering team for hands-on demos and a practical walk-through of deploying an AI-driven sortation swarm for peak-season volumes.",
      location: "Georgia World Congress Center, Atlanta",
      registerLink: "/get-in-touch",
      calendarLink:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meet+UnboxSort+at+MODEX+2027&dates=20270308/20270312&location=Georgia+World+Congress+Center,+Atlanta",
    },
  },
  {
    id: 1,
    status: "past",
    tag: "Trade Show",
    title: "CeMAT Australia 2026",
    date: "23-25 , June 2026",
    location: "MCEC Melbourne",
    image: cematAusHero,
    link: "/events/cemat-australia-2026",
    // Extra copy shown when this event is the "Next Up" featured event.
    featured: {
      eyebrow: "Upcoming Event",
      heading: "Meet UnboxSort at CeMAT Australia 2026",
      description:
        "Built to fit where conveyors can't. Vertical parcel sortation up to 2.4 m. Join our solutions engineering team for a practical walk-through of how to size and lay out an AI-driven sortation swarm for peak-season volumes.",
      location: "Booth IT24 , MCEC Melbourne",
      registerLink: "/events/cemat-australia-2026",
      calendarLink:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meet+UnboxSort+at+CeMAT+Australia+2026&dates=20260623/20260626&location=MCEC+Melbourne",
    },
    recap: {
      eyebrow: "Event Highlights",
      aboutTitle: "About this event",
      aboutText:
        "CeMAT Australia is the region's leading materials-handling and logistics event. Our team presented a technical session on coordinating robot swarms and ran live sortation demos at Booth IT24, MCEC Melbourne.",
      recapText:
        "Catch the recap, including key takeaways from the swarm-coordination talk.",
      gallery: [
        {
          id: 1,
          image: cematAusHero,
          caption: "UnboxSort sorting live at 1,000+ parcels/hour",
        },
        {
          id: 2,
          image: whyUnboxImage,
          caption: "Booth IT24 walkthroughs",
        },
        {
          id: 3,
          image: unboxSecure,
          caption: "Swarm-coordination talk",
        },
      ],
    },
  },
  {
    id: 2,
    status: "past",
    tag: "Conference",
    title: "DELIVER Europe 2026",
    date: "4 , June 2026",
    location: "MCEC Melbourne",
    image: europeHero,
    link: "/events/deliver-europe-2026",
    // Extra content shown in the "Relive …" recap section.
    recap: {
      eyebrow: "Event Highlights",
      aboutTitle: "About this event",
      aboutText:
        "DELIVER Europe brings together the continent's leading e-commerce and logistics teams. Our team joined panels on flexible automation and presented a technical session on coordinating robot swarms at warehouse scale.",
      recapText:
        "Catch the recap, including key takeaways from the swarm-coordination talk.",
      gallery: [
        {
          id: 1,
          image: europeHero,
          caption: "UnboxSort sorting live at 1,000+ parcels/hour",
        },
        {
          id: 2,
          image: whyUnboxImage,
          caption: "Walkthroughs with European 3PL and e-commerce teams",
        },
        {
          id: 3,
          image: unboxSecure,
          caption: "UnboxSort sorting live at 1,000+ parcels/hour",
        },
      ],
    },
  },
  {
    id: 3,
    status: "past",
    tag: "Trade Show",
    title: "LogiMAT 2026",
    date: "24-26 , March 2026",
    location: "Stuttgart, Germany",
    image: eventRobot,
    link: "/events/logimat2026",
    recap: {
      eyebrow: "Event Highlights",
      aboutTitle: "About this event",
      aboutText:
        "LogiMAT is the world's largest intralogistics trade fair. We showcased UnboxSort's vertical mobile sortation and ran back-to-back demos for European fulfilment and 3PL teams across three days in Stuttgart.",
      recapText:
        "Catch the highlights and key conversations from the show floor.",
      gallery: [
        {
          id: 1,
          image: eventRobot,
          caption: "UnboxSort live demos on the show floor",
        },
        {
          id: 2,
          image: robot,
          caption: "Deep-dives with European 3PL teams",
        },
        {
          id: 3,
          image: cematAusHero,
          caption: "Vertical sortation up close",
        },
      ],
    },
  },
];

// ---- Derived views (do not edit — driven by eventData above) ---------------
export const upcomingEvents = eventData.filter((e) => e.status === "upcoming");
export const pastEvents = eventData.filter((e) => e.status === "past");

// Look up an event's status by its route — used by the detail pages to decide
// whether to show the "Book A Meeting" CTA / form (upcoming only).
export const isEventPast = (link) =>
  eventData.find((e) => e.link === link)?.status === "past";

// Featured "Next Up" event = the first upcoming event, or null when there are
// no upcoming events (the Featured section then hides itself).
const featuredSource = upcomingEvents[0];
export const featuredEvent = featuredSource
  ? {
      tag: featuredSource.featured?.eyebrow || "Upcoming Event",
      title: featuredSource.featured?.heading || featuredSource.title,
      description: featuredSource.featured?.description || "",
      date: featuredSource.date,
      location: featuredSource.featured?.location || featuredSource.location,
      image: featuredSource.image,
      registerLink:
        featuredSource.featured?.registerLink || featuredSource.link,
      calendarLink:
        featuredSource.featured?.calendarLink || featuredSource.link,
    }
  : null;

// "Where else to find us" toggle datasets.
export const findUsEvents = {
  Upcoming: upcomingEvents,
  "Past Events": pastEvents,
};

// "Past Events" spotlight carousel — only past events.
export const pastEventsData = pastEvents;

// "Relive …" recaps — every past event that carries recap content. The Relive
// section's arrows cycle through these.
export const reliveEvents = pastEvents
  .filter((e) => e.recap)
  .map((ev) => ({
    id: ev.id,
    title: `Relive ${ev.title}`,
    eyebrow: ev.recap.eyebrow,
    aboutTitle: ev.recap.aboutTitle,
    aboutText: ev.recap.aboutText,
    recapText: ev.recap.recapText,
    mainImage: ev.recap.mainImage || ev.image,
    gallery: ev.recap.gallery,
    viewRecapLink: ev.link,
    nextEventLink: "/get-in-touch",
  }));

// Kept for backward-compat (first recap).
export const reliveEvent = reliveEvents[0] || null;

// ---- Impact stats band -----------------------------------------------------
export const eventStats = [
  { id: 1, value: "3,000+", label: "Parcels sorted per hour" },
  { id: 2, value: "100%", label: "Robotic sorting accuracy" },
  { id: 3, value: "50%", label: "Warehouse footprint reduced" },
  { id: 4, value: "6-9 mo", label: "Typical ROI timeline" },
];

export const experts = [
  {
    id: 1,
    name: "Rohit Pitale",
    post: "CGO",
    image: rohit,
    link: "https://calendly.com/rohit-ubr/30min",
  },
  {
    id: 2,
    name: "Shahid Memon",
    post: "Co Founder & CTO",
    image: shahid,
    link: "https://calendar.app.google/LLdUfFWD2Pf4Viop6",
  },
  {
    id: 3,
    name: "Lukasz Banachowicz",
    post: "Sales Director - EMEA",
    image: lukasz,
    link: "https://calendar.app.google/zgzysD2g1rJNAPZZ6",
  },
];

export const newsData = [
  {
    id: 1,
    date: "March 22, 2025",
    title: "Partnership with Global Logistics Leaders Expands",
    category: "Funding",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    date: "February 20, 2025",
    title: "Swarm Intelligence: The Future of Warehouse Automation",
    category: "Technology",
    img: "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    date: "January 05, 2025",
    title: "Industry Recognition: Innovation Award 2026",
    category: "Awards",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  },
];
