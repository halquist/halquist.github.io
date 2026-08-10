import prizma1 from '../images/prizma_photo_1.png';
import prizma2 from '../images/prizma_photo_2.png';
import prizma3 from '../images/prizma_photo_3.png';
import prizma4 from '../images/prizma_photo_4.png';
import lamplight1 from '../images/lamplight_photo_1.png';
import lamplight2 from '../images/lamplight_photo_2.png';
import lamplight3 from '../images/lamplight_photo_3.png';
import lamplight4 from '../images/lamplight_photo_4.png';
import lamplight5 from '../images/lamplight_photo_5.png';
import chrono1 from '../images/chronospore_photo_1.png';
import chrono2 from '../images/chronospore_photo_2.png';
import chrono3 from '../images/chronospore_photo_3.png';
import chrono4 from '../images/chronospore_photo_4.png';
import skull1 from '../images/skull_photo.png';
import machina1 from '../images/machina_photo.png';
import shirt1 from '../images/shirts/shirt1.png'
import shirt2 from '../images/shirts/shirt2.png'
import shirt3 from '../images/shirts/shirt3.png'
import shirt4 from '../images/shirts/shirt4.png'
import shirt5 from '../images/shirts/shirt5.png'
import audiohaze1 from '../images/sites/audiohaze1.png'
import audiohaze2 from '../images/sites/audiohaze2.png'
import audiohaze3 from '../images/sites/audiohaze3.png'
import audiohaze4 from '../images/sites/audiohaze4.png'
import pulse1 from '../images/sites/pulse1.png'
import pulse2 from '../images/sites/pulse2.png'
import pulse3 from '../images/sites/pulse3.png'
import pulse4 from '../images/sites/pulse4.png'
import placeholderHardware from '../images/work/placeholder-hardware.svg';
import placeholderArt from '../images/work/placeholder-art.svg';

export const WORK_CAROUSELS = [
  { id: 'software', title: 'Projects', category: 'Software' },
  { id: 'hardware', title: 'Embedded & Wearables', category: 'Hardware' },
  { id: 'visual-arts', title: 'Graphic Design', category: 'Visual Arts' },
];

export const WORK_ITEMS = [
  {
    id: 'audiohaze',
    category: 'Software',
    title: 'Audiohaze',
    tagline: 'Retrowave SoundCloud clone',
    description: [
      'Audiohaze is a Retrowave themed clone of SoundCloud. Users can browse original Synthwave, Darkwave, and Chillwave music uploaded by other users, participate in discussions about songs, and upload their own music.',
    ],
    tags: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'AWS S3'],
    images: [audiohaze1, audiohaze2, audiohaze3, audiohaze4],
    link: 'https://audiohaze.onrender.com/',
  },
  {
    id: 'pulse',
    category: 'Software',
    title: 'Pulse',
    tagline: 'Social polling platform',
    description: [
      'Pulse is a social polling site where users can create quick, two-choice polls on any topic and vote on polls from other users across multiple feeds.',
      'Voting earns bpm—the currency of Pulse—which can be spent to create polls or customize your profile in the store.',
    ],
    tags: ['React', 'Redux', 'Express', 'PostgreSQL'],
    images: [pulse1, pulse3, pulse2, pulse4],
    link: 'https://pulse-g8wh.onrender.com/',
  },
  {
    id: 'prizma-watch',
    category: 'Hardware',
    title: 'Prizma Vision',
    tagline: 'LED wearable display',
    description: [
      'A wrist-worn kaleidoscopic visualizer I built from the ground up: custom 3D-modeled and printed housing for a comfortable fit, plus embedded firmware and a custom UI for easy operation.',
      'The Prizma Vision renders vibrant, infinitely varying generative patterns in real time combining 3D design, fabrication, and low-level coding into a single wearable.',
    ],
    tags: ['ESP32', 'C++', '3D Printing', 'Wearables', 'Generative Art'],
    images: [prizma4, prizma2, prizma1, prizma3],
    link: null,
  },
  {
    id: 'lamplight',
    category: 'Hardware',
    title: 'Lamplight',
    tagline: 'Solar-powered local message board',
    description: [
      'A solar-powered, weatherproof outdoor message board with parametric enclosure designed in Fusion 360, 3D-printed, and strenuously tested for waterproofing. ESP32-C3 firmware with solar charging and battery management for years of unattended operation.',
      'Deploys its own WiFi network and serves a captive-portal web app with no install required so people nearby can post and read place-based messages, with basic moderation behind login.',
    ],
    tags: ['ESP32', '3D Printing', 'Fusion 360', 'IoT', 'Embedded Web'],
    images: [lamplight5, lamplight2, lamplight1, lamplight3, lamplight4],
    link: null,
  },
  {
    id: 'chronospore',
    category: 'Hardware',
    title: 'Chronospore',
    tagline: 'Ambient interval reminder lamp',
    description: [
      'Born from a personal need for gentle desk-break reminders to get up, stretch, and stay focused. Chronospore is a domed memory lamp I designed and 3D-printed around an ESP32. It connects to local WiFi, runs on battery or plug-in power, and exposes a web interface for creating and managing color-coded interval reminders.',
      'When a timer completes, the lamp gently strobes in that color. Pressing down on the lamp resets any active reminders. Custom firmware handles scheduling, the web UI, and lighting effects.',
    ],
    tags: ['ESP32', '3D Printing', 'IoT', 'Embedded Web', 'LED'],
    images: [chrono4, chrono2, chrono1, chrono3],
    link: null,
  },
  {
    id: 'poster-design',
    category: 'Visual Arts',
    title: 'Graphic Design',
    tagline: 'Event and promotional graphics',
    description: [
      'Designs for events, bands, websites, and promotions combining typography, illustration, and layout for print and digital distribution.',
    ],
    tags: ['Typography', 'Print Design', 'Illustration'],
    images: [skull1],
    link: null,
  },
  {
    id: 'tshirt-design',
    category: 'Visual Arts',
    title: 'T-Shirt & Apparel Design',
    tagline: 'Screen print and apparel graphics',
    description: [
      'Original t-shirt and apparel designs created for screen printing and dye-sublimation processes. From concept to artwork, formatting to proofing, printshop to storefront.',
    ],
    tags: ['Screen Print', 'Apparel', 'Graphic Design'],
    images: [shirt4, shirt1, shirt2, shirt5, shirt3],
    link: null,
  },
  {
    id: 'fine-art',
    category: 'Visual Arts',
    title: 'Fine Art',
    tagline: 'Digital and traditional artwork',
    description: [
      'A collection of digital and traditional fine art pieces exploring color, form, and visual narrative.',
    ],
    tags: ['Digital Art', 'Fine Art', 'Illustration'],
    images: [machina1],
    link: null,
  },
];

export const workSection = {
  title: 'Work',
};
