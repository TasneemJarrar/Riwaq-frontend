interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-text-secondary">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
      />
    </label>
  );
}