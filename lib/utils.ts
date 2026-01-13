import { Language } from "@/types";
import { Product, Promotion } from "@/types";

/**
 * Получает локализованный текст из объекта с переводами
 * @param textObject - Объект с переводами (например, { ru: '...', uk: '...', ... })
 * @param language - Текущий язык
 * @returns Локализованный текст или русский как fallback
 */
export function getLocalizedText(
  textObject: Record<Language, string> | Record<string, string>,
  language: Language
): string {
  return (textObject[language] as string) || (textObject.ru as string) || "";
}
