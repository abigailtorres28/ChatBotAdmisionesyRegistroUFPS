// src/utils/validation.ts
import { z } from "zod";
import DOMPurify from "dompurify";

export const MAX_CHARS = 200;

export const messageSchema = z
  .string()
  .trim()
  .min(1, "El mensaje no puede estar vacío.")
  .max(MAX_CHARS, `Máximo ${MAX_CHARS} caracteres.`);

export const validateAndSanitizeMessage = (raw: string) => {
  const sanitized = DOMPurify.sanitize(raw, { ALLOWED_TAGS: [] }).trim();
  const result = messageSchema.safeParse(sanitized);

  return {
    valid: result.success,
    sanitized,
    error: result.success ? null : result.error.format()._errors[0],
  };
};
