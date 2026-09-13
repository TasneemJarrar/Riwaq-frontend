export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="text-text-primary font-semibold">SkillSwap</div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="text-sm text-text-secondary hover:text-text-primary">
            About
          </a>
          <a href="#" className="text-sm text-text-secondary hover:text-text-primary">
            Help Center
          </a>
          <a href="#" className="text-sm text-text-secondary hover:text-text-primary">
            Privacy
          </a>
          <a href="#" className="text-sm text-text-secondary hover:text-text-primary">
            Terms
          </a>
        </nav>

        <p className="text-xs text-text-tertiary">
          © {new Date().getFullYear()} SkillSwap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
