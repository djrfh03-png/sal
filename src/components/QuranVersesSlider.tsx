import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenText } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface Verse {
  ar: string;
  ref: string;
  en: string;
}

const verses: Verse[] = [
  { ar: 'إِنَّ هَذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ', ref: 'الإسراء: ٩', en: 'Indeed, this Quran guides to that which is most upright' },
  { ar: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ', ref: 'الإسراء: ٨٢', en: 'We send down in the Quran that which is a healing and a mercy' },
  { ar: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', ref: 'البخاري', en: 'The best among you are those who learn the Quran and teach it' },
  { ar: 'إِنَّ اللَّهَ يَرْفَعُ بِهَذَا الْكِتَابِ أَقْوَامًا', ref: 'مسلم', en: 'Allah raises by this Book some people and lowers others' },
  { ar: 'تِلَاوَتُهُ عَلَيْكُمْ حَقٌّ فَاقْرَؤُوهُ', ref: 'الترمذي', en: 'Reciting it is a right upon you, so recite it' },
  { ar: 'الْقَارِئُ لِلْقُرْآنِ وَالْعَامِلُ بِهِ كَالرُّمَّانَةِ', ref: 'الترمذي', en: 'The reciter and doer of the Quran is like a pomegranate — sweet inside and out' },
  { ar: 'مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ', ref: 'الترمذي', en: 'Whoever reads a letter from the Book of Allah earns a good deed' },
  { ar: 'الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلَاوَتِهِ', ref: 'البقرة: ١٢١', en: 'Those to whom We gave the Book recite it with its true recitation' },
  { ar: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا', ref: 'طه: ١١٤', en: 'And say: My Lord, increase me in knowledge' },
  { ar: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنْكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ', ref: 'المجادلة: ١١', en: 'Allah raises those who believe and those given knowledge by degrees' },
  { ar: 'وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَى مُكْثٍ', ref: 'الإسراء: ١٠٦', en: 'A Quran We have divided, that you may recite it to mankind at intervals' },
  { ar: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ', ref: 'الحجر: ٩', en: 'Indeed, it is We who sent down the Reminder, and We will preserve it' },
];

export function QuranVersesSlider() {
  const { lang, dir } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % verses.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const verse = verses[index];

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 sm:px-12 md:px-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          {/* Arabic verse */}
          <p
            dir="rtl"
            className="font-display text-lg sm:text-2xl md:text-3xl leading-relaxed text-white drop-shadow-lg mb-2 sm:mb-3"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            {verse.ar}
          </p>

          {/* English translation (RTL langs hide it for brevity) */}
          {lang !== 'ar' && (
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-2">
              {verse.en}
            </p>
          )}

          {/* Reference + icon */}
          <div className="flex items-center justify-center gap-2 mt-1">
            <BookOpenText size={13} className="text-brand-secondary" />
            <span className="text-[11px] sm:text-xs font-semibold text-brand-secondary tracking-wide">
              {verse.ref}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-0 flex items-center justify-center gap-1.5 z-20">
        {verses.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 18 : 6,
              backgroundColor: i === index ? '#C9A227' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Edge fades handled by parent */}
      <div className="pointer-events-none absolute inset-y-0 start-0 w-16 sm:w-24 bg-gradient-to-r from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-16 sm:w-24 bg-gradient-to-l from-black/55 to-transparent" />
    </div>
  );
}
