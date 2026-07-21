import { BookOpen, Heart, Users, GraduationCap, Library } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': BookOpen,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

export function OrgStructureChart() {
  const { lang } = useI18n();
  const gold = '#925E06';

  return (
    <>
      {/* Mobile: vertical stack with center hub on top */}
      <div className="lg:hidden">
        <div className="flex flex-col items-center gap-6">
          {/* Center hub */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/20 scale-110" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-card-hover flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/30" />
              <div className="relative z-10">
                <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
                  <Library size={18} className="text-brand-secondary" />
                </div>
                <h3 className="text-[11px] font-bold text-white leading-snug">
                  {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
                </h3>
                <p className="text-[8px] text-white/40 mt-0.5">
                  {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical connector */}
          <div className="w-px h-8 bg-brand-secondary/30" />

          {/* Department cards in 2-col grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {departments.map((dept) => {
              const Icon = deptIcons[dept.slug] ?? BookOpen;
              const accent = dept.accentColor.base;
              return (
                <div
                  key={dept.slug}
                  className="group relative bg-white rounded-2xl shadow-card p-3 overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }} />
                  <div className="flex flex-col items-center text-center pt-1.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                      style={{ backgroundColor: accent + '15' }}
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </div>
                    <h4 className="text-[11px] font-bold text-brand-ink leading-snug line-clamp-2 min-h-[2.4em]">
                      {localize(dept.name, lang)}
                    </h4>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-brand-ink-muted">
                      <span className="font-semibold" style={{ color: accent }}>
                        {dept.programs.length}
                      </span>
                      <span>{lang === 'ar' ? 'برنامج' : 'programs'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: circular chart with center hub and 4 departments around it */}
      <div className="hidden lg:block relative mx-auto" style={{ maxWidth: '560px', aspectRatio: '1 / 1' }}>
        {/* SVG connecting lines */}
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          fill="none"
        >
          <circle cx="250" cy="250" r="240" stroke={gold} strokeWidth="1" opacity="0.12" />
          <circle cx="250" cy="250" r="200" stroke={gold} strokeWidth="0.5" opacity="0.08" strokeDasharray="4 6" />
          {[
            { x2: 250, y2: 65 },
            { x2: 435, y2: 250 },
            { x2: 250, y2: 435 },
            { x2: 65, y2: 250 },
          ].map((ep, i) => (
            <g key={i}>
              <line x1="250" y1="250" x2={ep.x2} y2={ep.y2} stroke={gold} strokeWidth="1.5" opacity="0.3" />
              <circle cx={ep.x2} cy={ep.y2} r="4" fill={gold} opacity="0.4" />
              <circle cx="250" cy="250" r="3" fill={gold} opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Central hub */}
        <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/20 scale-110" />
            <div className="absolute inset-0 rounded-full border border-brand-secondary/10 scale-125" />
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-card-hover flex flex-col items-center justify-center text-center p-6">
              <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/30" />
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-[0.08]" fill="none" stroke={gold} strokeWidth="0.3">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="38" />
                  <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
                  <Library size={24} className="text-brand-secondary" />
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
                </h3>
                <p className="text-[9px] text-white/40 mt-0.5">
                  {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Department nodes */}
        {departments.map((dept, i) => {
          const Icon = deptIcons[dept.slug] ?? BookOpen;
          const accent = dept.accentColor.base;
          const positions = [
            { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
            { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' },
            { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },
            { top: '50%', left: '0%', transform: 'translate(0, -50%)' },
          ];
          const pos = positions[i];
          return (
            <div
              key={dept.slug}
              className="absolute z-10"
              style={{ top: pos.top, left: pos.left, transform: pos.transform }}
            >
              <div className="relative bg-white rounded-2xl shadow-card p-4 w-40">
                <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }} />
                <div className="flex flex-col items-center text-center pt-1.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: accent + '15' }}
                  >
                    <Icon size={24} style={{ color: accent }} />
                  </div>
                  <h4 className="text-xs font-bold text-brand-ink leading-snug line-clamp-2 min-h-[2.4em]">
                    {localize(dept.name, lang)}
                  </h4>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-brand-ink-muted">
                    <span className="font-semibold" style={{ color: accent }}>
                      {dept.programs.length}
                    </span>
                    <span>{lang === 'ar' ? 'برنامج' : 'programs'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
