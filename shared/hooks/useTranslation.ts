import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";

/**
 * Единый хук для локализации
 * Используется во всех компонентах для получения переводов
 */
export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string) => getTranslation(language, key);

  return { t, language };
}
