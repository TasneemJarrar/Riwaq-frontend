import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ViewIcon, ViewOffIcon, LockPasswordIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { loginSchema, type LoginFormData } from "../../validation/authSchemas";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { keepSignedIn: true },
  });


  const onSubmit = (data: LoginFormData) => {
    console.log("Login Payload:", data);
    navigate("/onboarding");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-text-secondary">
          {t("auth.labels.email")}
        </label>

        <div className="relative mt-1.5">
          <HugeiconsIcon
            icon={Mail01Icon}
            className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
          />

          <input
            type="email"
            placeholder={t("auth.placeholders.email")}
            {...register("email")}
            className={`w-full rounded-xl border bg-input-bg py-2.5 ps-10 pe-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:ring-2 ${errors.email
              ? "border-error focus:ring-error/30"
              : "border-input-border focus:border-input-focus focus:ring-input-focus-soft"
              }`}
          />
        </div>

        {errors.email && (
          <p className="mt-1 text-xs text-error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-text-secondary">
            {t("auth.labels.password")}
          </label>

          <a
            href="#forgot"
            className="text-xs font-medium text-primary-text transition-colors hover:text-primary"
          >
            {t("auth.labels.forgotPassword")}
          </a>
        </div>

        <div className="relative mt-1.5">
          <HugeiconsIcon
            icon={LockPasswordIcon}
            className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.placeholders.password")}
            {...register("password")}
            className={`w-full rounded-xl border bg-input-bg py-2.5 ps-10 pe-10 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:ring-2 ${errors.password
              ? "border-error focus:ring-error/30"
              : "border-input-border focus:border-input-focus focus:ring-input-focus-soft"
              }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3.5 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors hover:text-text-primary"
            aria-label={
              showPassword
                ? t("auth.accessibility.hidePassword")
                : t("auth.accessibility.showPassword")
            }
          >
            <HugeiconsIcon
              icon={showPassword ? ViewOffIcon : ViewIcon}
              className="h-4 w-4"
            />
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-xs text-error">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Keep Signed In */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="keepSignedIn"
          {...register("keepSignedIn")}
          className="h-4 w-4 rounded border-input-border bg-input-bg text-primary focus:ring-primary/40"
        />

        <label
          htmlFor="keepSignedIn"
          className="select-none text-xs text-text-secondary"
        >
          {t("auth.labels.keepSignedIn")}
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-cta transition-all hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>{t("auth.buttons.loginSubmit")}</span>

        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="h-4 w-4 rtl:rotate-180"
        />
      </button>
    </form>
  );
}