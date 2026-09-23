import ActivitySection from "./components/ActivitySection";
import EarnPointsSection from "./components/EarnPointsSection";
import ExchangeSection from "./components/ExchangeSection";
import PointsOverview from "./components/PointsOverview";

export default function PointsPage() {
  return (
    <div className="px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PointsOverview />

        <ExchangeSection />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <ActivitySection />
          <EarnPointsSection />
        </div>
      </div>
    </div>
  );
}
