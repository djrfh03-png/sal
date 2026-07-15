import type { DepartmentSlug } from '../types';

export const logoPaths: Record<DepartmentSlug | 'org-main', string> = {
  'org-main': '/assets/logos/org-main.png',
  'center-hifz': '/assets/logos/center-hifz.png',
  school: '/assets/logos/school.png',
  halqa: '/assets/logos/halqa.png',
  charity: '/assets/logos/charity.png',
};

export const coverImagePaths: Record<DepartmentSlug, string> = {
  'center-hifz': '/assets/covers/center-hifz.jpg',
  school: '/assets/covers/school.jpg',
  halqa: '/assets/covers/halqa.jpg',
  charity: '/assets/covers/charity.jpg',
};
