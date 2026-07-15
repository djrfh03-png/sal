import { useI18n } from '../i18n/I18nContext';
import type { RegistrationStatus } from '../types';

interface RegistrationStatusBannerProps {
  status: RegistrationStatus;
  accentColor: { base: string; accent: string };
}

export function RegistrationStatusBanner({ status, accentColor }: RegistrationStatusBannerProps) {
  const { t } = useI18n();

  const config = {
    open: {
      label: t.registration.statusOpen,
      message: t.registration.openMessage,
      bg: accentColor.base + '15',
      border: accentColor.base,
      dot: '#22c55e',
    },
    closed: {
      label: t.registration.statusClosed,
      message: t.registration.closedMessage,
      bg: '#ef444415',
      border: '#ef4444',
      dot: '#ef4444',
    },
    coming_soon: {
      label: t.registration.statusComingSoon,
      message: t.registration.comingSoonMessage,
      bg: accentColor.accent + '15',
      border: accentColor.accent,
      dot: accentColor.accent,
    },
  };

  const c = config[status];

  return (
    <div
      className="rounded-2xl p-5 border-l-4 flex items-start gap-3"
      style={{ backgroundColor: c.bg, borderLeftColor: c.border }}
    >
      <span className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.dot }} />
      <div>
        <div className="font-bold text-brand-ink mb-1">{c.label}</div>
        <p className="text-sm text-brand-ink-soft">{c.message}</p>
      </div>
    </div>
  );
}
