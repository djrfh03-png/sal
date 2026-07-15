import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Megaphone, FileText, ClipboardList,
  ChevronRight, ChevronLeft,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';

export function AdminDashboardPage() {
  const { t, lang, dir } = useI18n();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const { departments, announcements, posts, registrations } = useAdminStore();

  const cards = [
    {
      title: t.admin.departments,
      count: departments.length,
      icon: Building2,
      color: '#0f4d3a',
      description: lang === 'ar' ? 'إدارة الأقسام والإحصائيات' : 'Manage departments and statistics',
      action: t.common.edit,
      to: '/admin/departments',
    },
    {
      title: t.admin.announcements,
      count: announcements.length,
      icon: Megaphone,
      color: '#123a70',
      description: lang === 'ar' ? 'إنشاء وتحرير الإعلانات' : 'Create and edit announcements',
      action: t.admin.addAnnouncement,
      to: '/admin/announcements',
    },
    {
      title: t.admin.posts,
      count: posts.length,
      icon: FileText,
      color: '#15479c',
      description: lang === 'ar' ? 'نشر المنشورات والصور' : 'Publish posts and media',
      action: t.admin.addPost,
      to: '/admin/posts',
    },
    {
      title: t.admin.registrations,
      count: registrations.length,
      icon: ClipboardList,
      color: '#1a56b8',
      description: lang === 'ar' ? 'مراجعة الطلبات وإدارة التسجيل' : 'Review applications and manage registration',
      action: t.common.viewDetails,
      to: '/admin/registrations',
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl font-bold text-brand-ink mb-6 sm:mb-8"
      >
        {t.admin.dashboard}
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.to}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              to={card.to}
              className="group card-base p-6 block h-full hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              style={{ borderTop: `3px solid ${card.color}` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: card.color + '15' }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>

              {/* Count */}
              <div className="text-3xl font-bold font-display text-brand-ink mb-1">
                {card.count}
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-brand-ink mb-2">{card.title}</h3>

              {/* Description */}
              <p className="text-xs text-brand-ink-muted leading-relaxed mb-4">
                {card.description}
              </p>

              {/* Quick action */}
              <div
                className="inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                style={{ color: card.color }}
              >
                {card.action}
                <Chevron size={14} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
