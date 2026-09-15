import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, Add01Icon } from "@hugeicons/core-free-icons";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthHeroPanel } from "../../components/auth/AuthHeroPanel";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";
import { LoginForm } from "../../components/auth/LoginForm";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { AuthFooter } from "../../components/auth/AuthFooter";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-text-primary antialiased selection:bg-primary selection:text-white">
      <AuthHeader />

      <main className="mx-auto flex max-w-7xl flex-col justify-center px-4 py-6 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-elevated lg:grid-cols-12">
          {/* Left Panel */}
          <AuthHeroPanel />

          {/* Right Panel */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-6">
            <div className="mx-auto w-full max-w-md">
              {/* Tab Switcher */}
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-surface-soft p-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "login"
                      ? "bg-surface-3 text-text-primary shadow-card ring-1 ring-border"
                      : "text-text-tertiary hover:text-text-primary"
                  }`}
                >
                  <HugeiconsIcon
                    icon={LockPasswordIcon}
                    className="h-4 w-4"
                  />
                  {t("auth.tabs.login")}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "signup"
                      ? "bg-surface-3 text-text-primary shadow-card ring-1 ring-border"
                      : "text-text-tertiary hover:text-text-primary"
                  }`}
                >
                  <HugeiconsIcon icon={Add01Icon} className="h-4 w-4" />
                  {t("auth.tabs.signup")}
                </button>
              </div>

              {/* Title Header */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                  {activeTab === "login"
                    ? t("auth.titles.login")
                    : t("auth.titles.signup")}
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                  {activeTab === "login"
                    ? t("auth.subtitles.login")
                    : t("auth.subtitles.signup")}
                </p>
              </div>

              <SocialAuthButtons />

              {/* Divider */}
              <div className="relative my-6 text-center text-xs">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>

                <span className="relative bg-surface-1 px-3 font-semibold uppercase tracking-wider text-text-tertiary">
                  {t("auth.orContinueWith")}
                </span>
              </div>

              {/* Form */}
              {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

              {/* Security / Charter */}
              <div className="mt-8 text-center text-xs text-text-tertiary">
                <p>
                  {t("auth.charterText")}{" "}
                  <a
                    href="#terms"
                    className="text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
                  >
                    {t("auth.charterLink")}
                  </a>
                  .
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1 text-[11px] font-semibold text-text-tertiary">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {t("auth.badges.zeroPay")}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1 text-[11px] font-semibold text-text-tertiary">
                    <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary" />
                    {t("auth.badges.encrypted")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
