import prizma1 from '../images/prizma/prizma_photo_1.webp';
import prizma2 from '../images/prizma/prizma_photo_2.webp';
import prizma3 from '../images/prizma/prizma_photo_3.webp';
import prizma4 from '../images/prizma/prizma_photo_4.webp';
import lamplight1 from '../images/lamplight/lamplight_photo_1.webp';
import lamplight2 from '../images/lamplight/lamplight_photo_2.webp';
import lamplight3 from '../images/lamplight/lamplight_photo_3.webp';
import lamplight4 from '../images/lamplight/lamplight_photo_4.webp';
import lamplight5 from '../images/lamplight/lamplight_photo_5.webp';
import chrono1 from '../images/chrono/chronospore_photo_1.webp';
import chrono2 from '../images/chrono/chronospore_photo_2.webp';
import chrono3 from '../images/chrono/chronospore_photo_3.webp';
import chrono4 from '../images/chrono/chronospore_photo_4.webp';

const workHardware = [
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
];

export default workHardware;
