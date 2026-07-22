import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, ImageIcon, Video, FileText, ArrowLeftCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { usePosts, usePost, useDepartments } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { LogoPlaceholder } from '../components/ui/LogoPlaceholder';
import { Loader2 } from 'lucide-react';
import type { DepartmentSlug } from '../types';

export function PostsPage() {
  const { lang, dir, t } = useI18n();
  const [searchParams] = useSearchParams();
  const initialDept = searchParams.get('dept') as DepartmentSlug | null;
  const [selectedDept, setSelectedDept] = useState<DepartmentSlug | null>(initialDept);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { data: departments, loading: deptLoading } = useDepartments();
  const { data: posts, loading: postsLoading } = usePosts();

  const deptMap = departments ? Object.fromEntries(departments.map((d) => [d.slug, d])) : {};

  if (deptLoading || postsLoading || !departments || !posts) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  // If no department selected, show department selection cards
  if (!selectedDept) {
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
              <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.posts.title}</h1>
              <p className="text-lg text-brand-ink-soft">{lang === 'ar' ? 'اختر القسم لعرض منشوراته' : 'Select a department to view its posts'}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => {
                const postCount = posts.filter((p) => p.departmentSlug === dept.slug).length;
                return (
                  <motion.button
                    key={dept.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedDept(dept.slug)}
                    className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden text-start"
                  >
                    <div className="h-2" style={{ background: `linear-gradient(90deg, ${dept.accentColor.base}, ${dept.accentColor.accent})` }} />
                    <div className="p-6">
                      <div className="mb-4">
                        <LogoPlaceholder slug={dept.slug} size="lg" color={dept.accentColor.base} />
                      </div>
                      <h3 className="font-bold text-brand-ink mb-1">{localize(dept.name, lang)}</h3>
                      <p className="text-sm text-brand-ink-soft mb-4 line-clamp-2">{localize(dept.shortDescription, lang)}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-brand-ink-muted">
                          {postCount} {lang === 'ar' ? 'منشور' : 'posts'}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: dept.accentColor.base }}>
                          {lang === 'ar' ? 'عرض' : 'View'}
                          <Arrow size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Department selected — show its posts
  const dept = deptMap[selectedDept];
  const accent = dept?.accentColor.base ?? '#047857';
  const filtered = posts.filter((p) => p.departmentSlug === selectedDept);

  return (
    <div className="pt-20">
      <section className="section-pad pattern-bg">
        <div className="container-page">
          {/* Back button + header */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedDept(null)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink-muted hover:text-brand-primary transition-colors mb-4"
            >
              <ArrowLeftCircle size={18} />
              {lang === 'ar' ? 'كل الأقسام' : 'All Departments'}
            </button>
            <div className="flex items-center gap-4">
              {dept && <LogoPlaceholder slug={dept.slug} size="lg" color={accent} />}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-brand-ink">{localize(dept?.name ?? { ar: '', en: '', am: '', om: '' }, lang)}</h1>
                <p className="text-sm text-brand-ink-soft">{t.posts.subtitle}</p>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-brand-ink-muted py-12">{t.posts.noPosts}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => {
                const Icon = post.type === 'image' ? ImageIcon : post.type === 'video' ? Video : FileText;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link to={`/posts/${post.id}`} className="card-base card-hover overflow-hidden group block h-full">
                      {post.media ? (
                        <div className="relative h-44 overflow-hidden">
                          <img src={post.media} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          <div className="absolute top-3 end-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full" style={{ color: accent }}>
                            <Icon size={14} />
                            {post.type === 'image' ? t.posts.image : post.type === 'video' ? t.posts.video : t.posts.article}
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-32 flex items-center justify-center" style={{ backgroundColor: accent + '10' }}>
                          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: accent }}>
                            <Icon size={20} />
                            {post.type === 'image' ? t.posts.image : post.type === 'video' ? t.posts.video : t.posts.article}
                          </div>
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-bold text-brand-ink leading-snug mb-2 line-clamp-2">{localize(post.title, lang)}</h3>
                        <p className="text-sm text-brand-ink-soft line-clamp-2 mb-3">{localize(post.content, lang)}</p>
                        <div className="flex items-center gap-2 text-xs text-brand-ink-muted">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
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

export function PostDetailPage() {
  const { id } = useParams();
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { data: post, loading } = usePost(id);
  const { data: departments } = useDepartments();
  const { data: allPosts } = usePosts();

  const department = post && departments ? departments.find((d) => d.slug === post.departmentSlug) : undefined;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
          <Button to="/posts" variant="outline">{t.common.back}</Button>
        </div>
      </div>
    );
  }

  const accent = department?.accentColor.base ?? '#047857';
  const Icon = post.type === 'image' ? ImageIcon : post.type === 'video' ? Video : FileText;
  const related = allPosts ? allPosts.filter((p) => p.departmentSlug === post.departmentSlug && p.id !== post.id).slice(0, 3) : [];

  return (
    <div className="pt-20">
      <article>
        <div className="container-page max-w-3xl py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to={`/posts?dept=${post.departmentSlug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink-muted hover:text-brand-primary mb-6 transition-colors">
              <Arrow size={16} />
              {t.common.back}
            </Link>

            {department && (
              <span className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-4" style={{ backgroundColor: accent }}>
                {localize(department.name, lang)}
              </span>
            )}

            <div className="flex items-center gap-2 text-sm text-brand-ink-muted mb-4">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'long', day: 'numeric' })}
              <span className="mx-1">·</span>
              <Icon size={16} />
              {post.type === 'image' ? t.posts.image : post.type === 'video' ? t.posts.video : t.posts.article}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-brand-ink mb-6 leading-tight">{localize(post.title, lang)}</h1>

            {post.media && (
              <div className="rounded-2xl overflow-hidden mb-8">
                {post.type === 'video' ? (
                  <div className="relative aspect-video bg-brand-ink flex items-center justify-center">
                    <img src={post.media} alt="" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Video size={28} style={{ color: accent }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={post.media} alt="" className="w-full h-64 md:h-80 object-cover" />
                )}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-brand-ink-soft leading-relaxed text-lg whitespace-pre-line">{localize(post.content, lang)}</p>
            </div>
          </motion.div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad bg-brand-bg-alt/50">
          <div className="container-page max-w-4xl">
            <h2 className="text-xl font-bold text-brand-ink mb-6">{t.common.relatedPosts}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link key={rel.id} to={`/posts/${rel.id}`} className="card-base card-hover overflow-hidden group">
                  {rel.media && (
                    <div className="h-32 overflow-hidden">
                      <img src={rel.media} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-brand-ink line-clamp-2">{localize(rel.title, lang)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
