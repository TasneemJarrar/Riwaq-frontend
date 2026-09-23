import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface ModalHeaderProps {
  eyebrow: string;
  title: string;
  onClose: () => void;
}

export default function ModalHeader({
  eyebrow,
  title,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-text-primary">
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary hover:bg-surface-soft hover:text-text-primary"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={17} />
      </button>
    </div>
  );
}