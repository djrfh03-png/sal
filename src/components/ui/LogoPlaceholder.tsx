import { BookOpen, GraduationCap, Users, Heart } from 'lucide-react';
import type { DepartmentSlug } from '../../types';

interface LogoPlaceholderProps {
  slug: DepartmentSlug | 'org-main';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
};

const iconSize = {
  sm: 18,
  md: 26,
  lg: 36,
  xl: 48,
};

const iconMap: Record<DepartmentSlug | 'org-main', typeof BookOpen> = {
  'org-main': BookOpen,
  'center-hifz': BookOpen,
  school: GraduationCap,
  halqa: Users,
  charity: Heart,
};

export function LogoPlaceholder({ slug, size = 'md', color, className = '' }: LogoPlaceholderProps) {
  const Icon = iconMap[slug];
  const defaultColor =
    slug === 'org-main'
      ? '#047857'
      : slug === 'center-hifz'
        ? '#1E3A8A'
        : slug === 'school'
          ? '#15803d'
          : slug === 'halqa'
            ? '#2563EB'
            : '#0369A1';

  const bg = color ?? defaultColor;

  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center shrink-0 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${bg}15, ${bg}30)`,
        border: `2px solid ${bg}40`,
        boxShadow: `0 2px 12px ${bg}20`,
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{ width: '70%', height: '70%', backgroundColor: bg }}
      >
        <Icon size={iconSize[size]} className="text-white" strokeWidth={1.5} />
      </div>
    </div>
  );
}
