"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { buildContactSchema, type ContactInput } from "@/lib/validation";
import { submitContact } from "@/app/actions/contact";
import { products } from "@/data/products";
import { t as tr } from "@/data/types";
import { type Locale } from "@/i18n/routing";
import { FieldWrapper, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const t = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const schema = buildContactSchema({
    nameMin: tv("nameMin"),
    emailInvalid: tv("emailInvalid"),
    messageMin: tv("messageMin"),
    countryMin: tv("countryMin"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { product: defaultProduct ?? "" },
  });

  const onSubmit = async (data: ContactInput) => {
    const result = await submitContact(data);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-field-200 bg-field-50 px-6 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-field-100 text-field-700">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-display-sm">{t("successTitle")}</h3>
        <p className="mt-2 max-w-md text-ink-600">{t("successBody")}</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          {t("sendAnother")}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
          <div>
            <p className="font-medium">{t("errorTitle")}</p>
            <p className="mt-0.5 text-clay-700">{t("errorBody")}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label={t("name")} htmlFor="name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FieldWrapper>
        <FieldWrapper label={t("email")} htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FieldWrapper>
        <FieldWrapper label={t("company")} htmlFor="company" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            placeholder={t("companyPlaceholder")}
            {...register("company")}
          />
        </FieldWrapper>
        <FieldWrapper label={t("country")} htmlFor="country" required error={errors.country?.message}>
          <Input
            id="country"
            autoComplete="country-name"
            placeholder={t("countryPlaceholder")}
            aria-invalid={!!errors.country}
            {...register("country")}
          />
        </FieldWrapper>
        <FieldWrapper label={t("product")} htmlFor="product" error={errors.product?.message}>
          <Select id="product" {...register("product")}>
            <option value="">{t("productAny")}</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {tr(p.name, locale)}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <FieldWrapper label={t("volume")} htmlFor="volume" error={errors.volume?.message}>
          <Input id="volume" placeholder={t("volumePlaceholder")} {...register("volume")} />
        </FieldWrapper>
      </div>

      <FieldWrapper label={t("message")} htmlFor="message" required error={errors.message?.message}>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FieldWrapper>

      {/* Honeypot — visually hidden, ignored by humans */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          t("submitting")
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
