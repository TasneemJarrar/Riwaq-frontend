import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-text-primary sm:text-3xl">
          {t("notFound.title")}
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
          {t("notFound.description")}
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition hover:bg-primary-hover"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
}
