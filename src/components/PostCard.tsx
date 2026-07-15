import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ImageIcon, Video, FileText } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Post, Department } from '../types';

interface PostCardProps {
  post: Post;
  department?: Department;
}

export function PostCard({ post, department }: PostCardProps) {
  const { lang, t } = useI18n();
  const accent = department?.accentColor.base ?? '#0B6B4A';

  const typeIcon = post.type === 'image' ? ImageIcon : post.type === 'video' ? Video : FileText;
  const typeLabel = post.type === 'image' ? t.posts.image : post.type === 'video' ? t.posts.video : t.posts.article;
  const Icon = typeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/posts/${post.id}`}
        className="block card-base card-hover overflow-hidden h-full"
      >
        {post.media ? (
          <div className="relative h-44 overflow-hidden">
            <img
              src={post.media}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 end-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full" style={{ color: accent }}>
              <Icon size={14} />
              {typeLabel}
            </div>
          </div>
        ) : (
          <div className="relative h-32 flex items-center justify-center" style={{ backgroundColor: accent + '10' }}>
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: accent }}>
              <Icon size={20} />
              {typeLabel}
            </div>
          </div>
        )}
        <div className="p-5">
          {department && (
            <span className="text-xs font-semibold mb-2 block" style={{ color: accent }}>
              {localize(department.name, lang)}
            </span>
          )}
          <h3 className="font-bold text-brand-ink leading-snug mb-2 line-clamp-2">
            {localize(post.title, lang)}
          </h3>
          <p className="text-sm text-brand-ink-soft line-clamp-2 mb-3">
            {localize(post.content, lang)}
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-ink-muted">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar' : 'en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
