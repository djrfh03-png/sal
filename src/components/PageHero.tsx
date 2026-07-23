import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type HeroVariant = 'minimal' | 'tinted' | 'editorial' | 'split';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accentColor?: string;
  variant?: HeroVariant;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor = '#1E5A8E',
  variant = 'minimal',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroVariantRenderer
        variant={variant}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        icon={Icon}
        accentColor={accentColor}
      >
        {children}
      </HeroVariantRenderer>
    </section>
  );
}

function HeroVariantRenderer({
  variant,
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: {
  variant: HeroVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accentColor: string;
  children?: ReactNode;
}) {
  switch (variant) {
    case 'tinted':
      return (
        <TintedHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          icon={Icon}
          accentColor={accentColor}
        >
          {children}
        </TintedHero>
      );
    case 'editorial':
      return (
        <EditorialHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          icon={Icon}
          accentColor={accentColor}
        >
          {children}
        </EditorialHero>
      );
    case 'split':
      return (
        <SplitHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          icon={Icon}
          accentColor={accentColor}
        >
          {children}
        </SplitHero>
      );
    default:
      return (
        <MinimalHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          icon={Icon}
          accentColor={accentColor}
        >
          {children}
        </MinimalHero>
      );
  }
}

/* ── Minimal: clean white, left-aligned accent bar, centered content ── */
function MinimalHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: HeroContentProps) {
  return (
    <div className="bg-white border-b border-brand-line/30">
      {/* Thin accent bar */}
      <div className="h-0.5" style={{ backgroundColor: accentColor }} />

      <div className="container-page relative z-10 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          {eyebrow && <Eyebrow text={eyebrow} accentColor={accentColor} />}

          {Icon && (
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
              style={{ backgroundColor: accentColor + '0d' }}
            >
              <Icon size={22} style={{ color: accentColor }} />
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-brand-ink leading-[1.15] mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base md:text-lg text-brand-ink-soft leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Tinted: soft accent-tinted background, bold and confident ── */
function TintedHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: HeroContentProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${accentColor}0a 0%, ${accentColor}03 50%, transparent 100%)`,
      }}
    >
      {/* Single large soft glow */}
      <div
        className="absolute -top-20 end-0 w-[28rem] h-[28rem] rounded-full blur-[100px] opacity-60"
        style={{ backgroundColor: accentColor + '08' }}
      />

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-brand-line/40" />

      <div className="container-page relative z-10 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          {eyebrow && <Eyebrow text={eyebrow} accentColor={accentColor} />}

          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-sm"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 8px 24px ${accentColor}30`,
              }}
            >
              <Icon size={24} className="text-white" />
            </motion.div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-brand-ink leading-[1.15] mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base md:text-lg text-brand-ink-soft leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Editorial: magazine-style, left-aligned, large number/section feel ── */
function EditorialHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: HeroContentProps) {
  return (
    <div className="bg-white border-b border-brand-line/30">
      {/* Thick left accent bar */}
      <div className="absolute top-0 bottom-0 start-0 w-1.5" style={{ backgroundColor: accentColor }} />

      <div className="container-page relative z-10 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              <span
                className="text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: accentColor }}
              >
                {eyebrow}
              </span>
            </div>
          )}

          <div className="flex items-start gap-5">
            {Icon && (
              <div
                className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 rounded-xl"
                style={{ backgroundColor: accentColor + '0a' }}
              >
                <Icon size={24} style={{ color: accentColor }} />
              </div>
            )}

            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-ink leading-[1.1] mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-base md:text-lg text-brand-ink-soft leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Split: two-column, icon panel + content, distinctive layout ── */
function SplitHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: HeroContentProps) {
  return (
    <div className="bg-white border-b border-brand-line/30">
      <div className="container-page relative z-10">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left accent panel */}
          <div
            className="flex items-center justify-center py-10 md:py-0 md:w-48 shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {Icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Icon size={48} className="text-white" strokeWidth={1.5} />
              </motion.div>
            )}
          </div>

          {/* Right content */}
          <div className="flex-1 flex items-center py-12 md:py-16 ps-8 md:ps-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {eyebrow && (
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: accentColor }}
                  >
                    {eyebrow}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-brand-ink leading-[1.1] mb-3">
                {title}
              </h1>

              {subtitle && (
                <p className="text-base text-brand-ink-soft leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              )}

              {children && <div className="mt-6">{children}</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared eyebrow component ── */
function Eyebrow({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-px w-8" style={{ backgroundColor: accentColor, opacity: 0.4 }} />
      <span
        className="text-xs font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {text}
      </span>
      <div className="h-px w-8" style={{ backgroundColor: accentColor, opacity: 0.4 }} />
    </div>
  );
}

interface HeroContentProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accentColor: string;
  children?: ReactNode;
}
