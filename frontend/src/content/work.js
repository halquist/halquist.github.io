import audiohaze from '../images/audiohaze.png';
import pulse from '../images/pulse_image.png';
import prizma1 from '../images/prizma_photo_1.png';
import prizma2 from '../images/prizma_photo_2.png';
import prizma3 from '../images/prizma_photo_3.png';
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
    images: [prizma1, prizma2, prizma3],
    link: null,
  },
  {
    id: 'lamplight',
    category: 'Hardware',
    title: 'Lamplight',
    tagline: 'Self-contained messaging board',
    description: [
      'A self-sufficient, contained messaging board built with embedded electronics—designed to operate independently without external infrastructure.',
    ],
    tags: ['Embedded', 'Microcontroller', 'IoT'],
    images: [placeholderHardware],
    link: null,
  },
  {
    id: 'led-wearables',
    category: 'Hardware',
    title: 'LED Wearables & Fixtures',
    tagline: 'Light-up apparel and installations',
    description: [
      'Custom LED light fixtures and light-up apparel projects, combining embedded control with visual design for events and installations.',
    ],
    tags: ['LED', 'Arduino', 'Apparel', 'Installations'],
    images: [placeholderHardware],
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
