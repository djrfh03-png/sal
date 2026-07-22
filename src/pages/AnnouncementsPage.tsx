import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, Pin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAnnouncements, useDepartments, useAnnouncement } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { Loader2 } from 'lucide-react';
import type { DepartmentSlug } from '../types';

export function AnnouncementsPage() {
  const { lang, dir, t } = useI18n();
  const [filter, setFilter] = useState<DepartmentSlug | 'all'>('all');
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { data: announcements, loading: annLoading } = useAnnouncements();
  const { data: departments, loading: deptLoading } = useDepartments();

  const deptMap = departments ? Object.fromEntries(departments.map((d) => [d.slug, d])) : {};
  const filtered = !announcements ? [] : filter === 'all' ? announcements : announcements.filter((a) => a.departmentSlug === filter);

  if (annLoading || deptLoading || !announcements || !departments) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-pad pattern-bg">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.nav.announcements}</h1>
            <p className="text-lg text-brand-ink-soft">{t.common.latestAnnouncements}</p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === 'all' ? 'bg-brand-primary text-white' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
              }`}
            >
              {t.common.all}
            </button>
            {departments.map((dept) => (
              <button
                key={dept.slug}
                onClick={() => setFilter(dept.slug)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === dept.slug ? 'text-white' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
                }`}
                style={filter === dept.slug ? { backgroundColor: dept.accentColor.base } : {}}
              >
                {localize(dept.name, lang)}
              </button>
            ))}
          </div>

          {/* Notice Board Grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-brand-ink-muted py-12">{t.common.noResults}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ann) => {
                const dept = deptMap[ann.departmentSlug];
                const accent = dept?.accentColor.base ?? '#047857';
                const gold = dept?.accentColor.accent ?? '#925E06';
                const date = new Date(ann.date);
                const day = date.getDate();
                const month = date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { month: 'short' });

                return (
                  <motion.div
                    key={ann.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    {/* Top accent strip */}
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }} />

                    {/* Pin icon */}
                    <div className="absolute top-4 end-4 z-10">
                      <Pin size={14} style={{ color: gold }} className="rotate-12" />
                    </div>

                    {/* Decorative corner pattern */}
                    <div className="absolute bottom-0 start-0 w-16 h-16 opacity-[0.04] pointer-events-none">
                      <svg viewBox="0 0 64 64" fill="none" stroke={accent} strokeWidth="0.5">
                        <path d="M32 0 L64 32 L32 64 L0 32 Z" />
                        <path d="M32 8 L56 32 L32 56 L8 32 Z" />
                        <circle cx="32" cy="32" r="6" />
                      </svg>
                    </div>

                    <Link to={`/announcements/${ann.id}`} className="block p-5 relative">
                      {/* Date badge */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 text-white"
                          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
                        >
                          <span className="text-lg font-bold leading-none">{day}</span>
                          <span className="text-[10px] font-semibold uppercase mt-0.5">{month}</span>
                        </div>
                        {dept && (
                          <span
                            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1"
                            style={{ backgroundColor: gold + '20', color: accent }}
                          >
                            {localize(dept.name, lang)}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-brand-ink leading-snug mb-2 line-clamp-2">
                        {localize(ann.title, lang)}
                      </h3>
                      <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-3 mb-3">
                        {localize(ann.excerpt, lang)}
                      </p>

                      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: accent }}>
                        {t.common.readMore}
                        <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function AnnouncementDetailPage() {
  const { id } = useParams();
  const { lang, t } = useI18n();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const { data: announcement, loading } = useAnnouncement(id);
  const { data: departments } = useDepartments();
  const { data: allAnnouncements } = useAnnouncements();

  const department = announcement && departments ? departments.find((d) => d.slug === announcement.departmentSlug) : undefined;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
          <Button to="/announcements" variant="outline">{t.common.back}</Button>
        </div>
      </div>
    );
  }

  const accent = department?.accentColor.base ?? '#047857';
  const related = allAnnouncements ? allAnnouncements.filter((a) => a.departmentSlug === announcement.departmentSlug && a.id !== announcement.id).slice(0, 3) : [];

  return (
    <div className="pt-20">
      <article>
        <div className="container-page max-w-3xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/announcements" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink-muted hover:text-brand-primary mb-6 transition-colors">
              <Arrow size={16} />
              {t.common.back}
            </Link>

            {department && (
              <span
                className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: accent }}
              >
                {localize(department.name, lang)}
              </span>
            )}

            <div className="flex items-center gap-2 text-sm text-brand-ink-muted mb-4">
              <Calendar size={16} />
              {new Date(announcement.date).toLocaleDateString(lang === 'ar' ? 'ar' : 'en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-brand-ink mb-6 leading-tight">
              {localize(announcement.title, lang)}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-brand-ink-soft leading-relaxed text-lg whitespace-pre-line">
                {localize(announcement.content, lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad bg-brand-bg-alt/50">
          <div className="container-page max-w-4xl">
            <h2 className="text-xl font-bold text-brand-ink mb-6">{t.common.relatedPosts}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel) => {
                const relDept = departments?.find((d) => d.slug === rel.departmentSlug);
                const relAccent = relDept?.accentColor.base ?? '#047857';
                const relGold = relDept?.accentColor.accent ?? '#925E06';
                const date = new Date(rel.date);
                const day = date.getDate();
                const month = date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { month: 'short' });

                return (
                  <Link key={rel.id} to={`/announcements/${rel.id}`} className="card-base card-hover overflow-hidden group relative">
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${relAccent}, ${relGold})` }} />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg shrink-0 text-white" style={{ background: `linear-gradient(135deg, ${relAccent}, ${relAccent}dd)` }}>
                          <span className="text-sm font-bold leading-none">{day}</span>
                          <span className="text-[8px] font-semibold uppercase">{month}</span>
                        </div>
                        <h3 className="font-semibold text-sm text-brand-ink line-clamp-2">{localize(rel.title, lang)}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
