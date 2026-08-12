import audiohaze1 from '../images/sites/audiohaze1.webp';
import audiohaze2 from '../images/sites/audiohaze2.webp';
import audiohaze3 from '../images/sites/audiohaze3.webp';
import audiohaze4 from '../images/sites/audiohaze4.webp';
import pulse1 from '../images/sites/pulse1.webp';
import pulse2 from '../images/sites/pulse2.webp';
import pulse3 from '../images/sites/pulse3.webp';
import pulse4 from '../images/sites/pulse4.webp';

const workSoftware = [
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
];

export default workSoftware;
