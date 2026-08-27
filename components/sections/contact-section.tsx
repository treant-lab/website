"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, ChevronDown, Check } from "lucide-react"
import { HackerEmblem } from "@/components/ui/hacker-emblem"

// Approved in design lab: split layout (headline + line-art left, form right).
// Fields are transparent with square corners; emerald focus ring.

const FIELD =
  "w-full border border-white/[0.12] bg-transparent px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-white/25 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"

const CHECKBOX_BOX =
  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-white/20 transition-all duration-200 peer-checked:border-emerald-400 peer-checked:bg-emerald-400 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/50 group-hover:border-white/40"

export function ContactSection() {
  const t = useTranslations("Contact")
  // consultation_types is an object keyed by service id, not an array.
  const consultationTypes = Object.entries(
    t.raw("consultation_types") as Record<string, string>
  )

  return (
    <section id="contact" className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1180px] px-8 py-40">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          {/* Left */}
          <div className="relative">
            <h2 className="max-w-[12ch] text-balance text-[3.75rem] font-light leading-[1.12] tracking-[-0.035em] text-white lg:text-[4.75rem]">
              {t("headline")}
            </h2>
            <p className="mt-7 text-[19px] font-light text-gray-400">{t("headline_description")}</p>
            <div className="mt-20 hidden lg:block">
              <HackerEmblem size={420} />
            </div>
          </div>

          {/* Right: form */}
          <form className="space-y-4" noValidate>
            <div>
              <label htmlFor="ct-type" className="mb-2 block text-[14px] text-white">
                {t("consultation_type")} <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <select id="ct-type" className={`${FIELD} appearance-none pr-11`} defaultValue="">
                  <option value="" disabled>
                    {t("select_consultation_type")}
                  </option>
                  {consultationTypes.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input className={FIELD} placeholder={t("first_name")} aria-label={t("first_name")} autoComplete="given-name" />
              <input className={FIELD} placeholder={t("last_name")} aria-label={t("last_name")} autoComplete="family-name" />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_7rem_1fr]">
              <input type="email" className={FIELD} placeholder={t("email")} aria-label={t("email")} autoComplete="email" />
              <div className="relative">
                <select className={`${FIELD} appearance-none pr-9`} aria-label={t("country_code")}>
                  <option>+55</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+351</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <input type="tel" className={FIELD} placeholder={t("phone")} aria-label={t("phone")} autoComplete="tel" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input className={FIELD} placeholder={t("company")} aria-label={t("company")} autoComplete="organization" />
              <input className={FIELD} placeholder={t("job_title")} aria-label={t("job_title")} autoComplete="organization-title" />
            </div>

            <textarea
              rows={6}
              className={`${FIELD} resize-y`}
              placeholder={t("message_placeholder")}
              aria-label={t("message")}
            />

            <div className="space-y-3 pt-2">
              <label className="group flex cursor-pointer items-start gap-3">
                <input type="checkbox" className="peer sr-only" />
                <span className={CHECKBOX_BOX}>
                  <Check className="check-mark h-3 w-3 text-black opacity-0 transition-opacity duration-200" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-snug text-gray-300">{t("newsletter_optin")}</span>
              </label>
              <label className="group flex cursor-pointer items-start gap-3">
                <input type="checkbox" className="peer sr-only" required />
                <span className={CHECKBOX_BOX}>
                  <Check className="check-mark h-3 w-3 text-black opacity-0 transition-opacity duration-200" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-snug text-gray-300">
                  {t("privacy_agree")}{" "}
                  <a href="#" className="text-white underline underline-offset-2 transition-colors hover:text-emerald-400">
                    {t("privacy_policy")}
                  </a>
                  .<span className="text-emerald-400">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="group mt-4 inline-flex items-center gap-2.5 border border-white/15 bg-black px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060807]"
            >
              {t("send_message")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
