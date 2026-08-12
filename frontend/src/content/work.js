export const WORK_CAROUSELS = [
  { id: 'software', title: 'Projects', category: 'Software' },
  { id: 'hardware', title: 'Embedded & Wearables', category: 'Hardware' },
  { id: 'visual-arts', title: 'Graphic Design', category: 'Visual Arts' },
];

export const workSection = {
  title: 'Work',
};

export const WORK_CATEGORY_LOADERS = {
  Software: () => import('./workSoftware'),
  Hardware: () => import('./workHardware'),
  'Visual Arts': () => import('./workVisualArts'),
};
