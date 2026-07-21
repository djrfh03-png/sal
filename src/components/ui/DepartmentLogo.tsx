import type { DepartmentSlug } from '../../types';

interface DepartmentLogoProps {
  slug: DepartmentSlug | 'org-main';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 40,
  md: 56,
  lg: 80,
  xl: 112,
};

function HifzMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="30" fill={color} />
      <circle cx="32" cy="32" r="30" stroke={accent} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.55" />
      <path
        d="M20 38c0-7.18 5.37-13 12-13s12 5.82 12 13"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M32 18v8" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="17" r="2.4" fill={accent} />
      <path
        d="M22 44h20M24 49h16"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function SchoolMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="30" fill={color} />
      <path
        d="M14 26l18-8 18 8-18 8-18-8z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path d="M20 30v12c0 2.5 5.4 5 12 5s12-2.5 12-5V30" stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M50 26v10" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 39v4" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="26" r="2" fill={color} />
    </svg>
  );
}

function HalqaMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="30" fill={color} />
      <circle cx="32" cy="32" r="21" stroke={accent} strokeWidth="2.2" fill="none" />
      <circle cx="32" cy="32" r="13" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.55" />
      <circle cx="32" cy="32" r="5" fill={accent} />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x = 32 + 21 * Math.cos(angle);
        const y = 32 + 21 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="2.2" fill="#ffffff" opacity="0.85" />;
      })}
    </svg>
  );
}

function CharityMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="30" fill={color} />
      <path
        d="M32 46c-7-4.2-14-9-14-17 0-4.2 3-7.5 7-7.5 2.6 0 5 1.4 7 3.8 2-2.4 4.4-3.8 7-3.8 4 0 7 3.3 7 7.5 0 8-7 12.8-14 17z"
        fill={accent}
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M24 30h4l2-3 3 5 2-3h5" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  );
}

function OrgMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="30" fill={color} />
      <path
        d="M32 12c9 6 14 12 14 20 0 8-7 14-14 18-7-4-14-10-14-18 0-8 5-14 14-20z"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        opacity="0.55"
      />
      <path
        d="M22 34c2-6 6-9 10-11 4 2 8 5 10 11-3 3-6 4-10 4-4 0-7-1-10-4z"
        fill="#ffffff"
        opacity="0.95"
      />
      <circle cx="32" cy="29" r="2.4" fill={color} />
    </svg>
  );
}

export function DepartmentLogo({ slug, size = 'md', color, className = '' }: DepartmentLogoProps) {
  const px = sizeMap[size];
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

  const defaultAccent =
    slug === 'org-main'
      ? '#925E06'
      : slug === 'center-hifz'
        ? '#F59E0B'
        : slug === 'school'
          ? '#BF8414'
          : slug === 'halqa'
            ? '#FBBF24'
            : '#F97316';

  const base = color ?? defaultColor;
  const accent = defaultAccent;

  const mark = (() => {
    switch (slug) {
      case 'org-main':
        return <OrgMark color={base} accent={accent} />;
      case 'center-hifz':
        return <HifzMark color={base} accent={accent} />;
      case 'school':
        return <SchoolMark color={base} accent={accent} />;
      case 'halqa':
        return <HalqaMark color={base} accent={accent} />;
      case 'charity':
        return <CharityMark color={base} accent={accent} />;
    }
  })();

  return (
    <div
      className={`shrink-0 ${className}`}
      style={{
        width: px,
        height: px,
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
      }}
      aria-hidden="true"
    >
      {mark}
    </div>
  );
}
