import { z } from "zod";

export type ContactMessages = {
  nameMin: string;
  emailInvalid: string;
  messageMin: string;
  countryMin: string;
};

const defaults: ContactMessages = {
  nameMin: "Please enter your name.",
  emailInvalid: "Please enter a valid email address.",
  messageMin: "Please add a few details about your request.",
  countryMin: "Please tell us the destination country.",
};

/** Build the contact schema with localized error messages. */
export function buildContactSchema(msg: ContactMessages = defaults) {
  return z.object({
    name: z.string().trim().min(2, msg.nameMin).max(120),
    email: z.string().trim().email(msg.emailInvalid).max(200),
    company: z.string().trim().max(160).optional().or(z.literal("")),
    country: z.string().trim().min(2, msg.countryMin).max(120),
    product: z.string().trim().max(80).optional().or(z.literal("")),
    volume: z.string().trim().max(160).optional().or(z.literal("")),
    message: z.string().trim().min(10, msg.messageMin).max(4000),
    // Honeypot — must stay empty. Bots tend to fill every field.
    website: z.string().max(0).optional().or(z.literal("")),
  });
}

export type ContactInput = z.infer<ReturnType<typeof buildContactSchema>>;
