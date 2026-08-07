import audiohaze from '../images/audiohaze.png';
import pulse from '../images/pulse_image.png';
import prizma1 from '../images/prizma_photo_1.png';
import prizma2 from '../images/prizma_photo_2.png';
import prizma3 from '../images/prizma_photo_3.png';
import lamplight1 from '../images/lamplight_photo_1.png';
import lamplight2 from '../images/lamplight_photo_2.png';
import lamplight3 from '../images/lamplight_photo_3.png';
import lamplight4 from '../images/lamplight_photo_4.png';
import chrono1 from '../images/chronospore_photo_1.png';
import chrono2 from '../images/chronospore_photo_2.png';
import chrono3 from '../images/chronospore_photo_3.png';
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
    images: [audiohaze, pulse],
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
    images: [pulse],
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
    images: [prizma2, prizma1, prizma3],
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
    images: [lamplight3, lamplight1, lamplight2, lamplight4],
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
    images: [chrono2, chrono1, chrono3],
    link: null,
  },
  {
    id: 'poster-design',
    category: 'Visual Arts',
    title: 'Poster Design',
    tagline: 'Event and promotional graphics',
    description: [
      'Poster designs for events, bands, and promotions—combining typography, illustration, and layout for print and digital distribution.',
    ],
    tags: ['Typography', 'Print Design', 'Illustration'],
    images: [placeholderArt],
    link: null,
  },
  {
    id: 'tshirt-design',
    category: 'Visual Arts',
    title: 'T-Shirt & Apparel Design',
    tagline: 'Screen print and apparel graphics',
    description: [
      'Original t-shirt and apparel designs created for screen printing, from concept through production-ready artwork.',
    ],
    tags: ['Screen Print', 'Apparel', 'Graphic Design'],
    images: [placeholderArt],
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
    images: [placeholderArt],
    link: null,
  },
];

export const workSection = {
  title: 'Work',
};
