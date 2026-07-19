import { motion } from 'framer-motion';
import { Target, Eye, Gem, Award } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Timeline } from '../components/Timeline';
import { OrgStructureChart } from '../components/OrgStructureChart';
import { timelineEvents } from '../data/misc';

export function AboutPage() {
  const { lang, t } = useI18n();

  const coreValues = [
    { icon: Target, label: t.common.mission, color: '#0B6B4A' },
    { icon: Eye, label: t.common.vision, color: '#1E4C9A' },
    { icon: Gem, label: t.common.values, color: '#C9A227' },
    { icon: Award, label: t.common.objectives, color: '#1E5AA8' },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-pad pattern-bg">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.about.title}</h1>
            <p className="text-lg text-brand-ink-soft leading-relaxed">{t.orgDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="section-pad">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-6 text-center">{t.about.historyTitle}</h2>
            <p className="text-brand-ink-soft leading-relaxed text-lg">{t.about.historyText}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values / Objectives Grid */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base p-6 text-center"
                style={{ borderTop: `3px solid ${item.color}` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.color + '15' }}
                >
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-brand-ink mb-2">{item.label}</h3>
                <p className="text-sm text-brand-ink-soft leading-relaxed">
                  {i === 0 && lang === 'ar'
                    ? 'تعليم كتاب الله والعلوم الشرعية لأبناء وبنات المسلمين على منهج متدرج ومتكامل'
                    : i === 0
                      ? 'Teaching the Book of Allah and Islamic sciences to Muslim children through a progressive and integrated curriculum'
                      : i === 1 && lang === 'ar'
                        ? 'جيل قُرآني متشبّع بالقيم والأخلاق، حافظ لكتاب الله، عالم بدينه'
                        : i === 1
                          ? 'A Quranic generation imbued with values and morals, preserving the Book of Allah, knowledgeable of their religion'
                          : i === 2 && lang === 'ar'
                            ? 'الإخلاص، الإتقان، الرحمة، الأخوّة في الله، التدريج في التعليم'
                            : i === 2
                              ? 'Sincerity, Mastery, Mercy, Sisterhood in Allah, Progressive teaching'
                              : i === 3 && lang === 'ar'
                                ? 'تعليم قراءة القرآن بالتجويد، تأسيس طلاب في العلوم الشرعية، إعداد جيل حافظ لكتاب الله'
                                : 'Teach Quran reading with Tajwid, establish students in Islamic sciences, prepare a generation preserving the Book of Allah'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">{t.common.timeline}</h2>
          </motion.div>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Achievements */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-8 text-center">{t.about.achievementsTitle}</h2>
            <div className="space-y-4">
              {t.about.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 card-base p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-secondary/15 flex items-center justify-center shrink-0">
                    <Award size={18} className="text-brand-secondary" />
                  </div>
                  <p className="text-brand-ink-soft leading-relaxed">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Structure — static org chart with center + 4 departments */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.02]" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/3 blur-3xl" />

        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-secondary/40" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'هيكلة المؤسسة' : 'Organization Structure'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-3">
              {lang === 'ar' ? 'مخطط الأقسام' : 'Departments Chart'}
            </h2>
            <p className="text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar' ? 'تتكون المؤسسة من أربعة أقسام رئيسية تعمل تحت مظلة دار القرآن الكريم' : 'The institution consists of four main departments operating under the umbrella of Dar Al-Quran Al-Kareem'}
            </p>
          </motion.div>

          {/* Static Org Chart — center hub with 4 departments around it */}
          <OrgStructureChart />
        </div>
      </section>
    </div>
  );
}
