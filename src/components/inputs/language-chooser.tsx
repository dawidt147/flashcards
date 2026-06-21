import type { Language, LanguageChooserProps } from "@/types/interfaces";

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
    { value: "english", label: "English" },
    { value: "polish", label: "Polish" },
];

const LanguageChooser = ({
    id,
    name,
    label,
    defaultValue = "english",
    className,
}: LanguageChooserProps) => {
    return (
        <div className={["language-chooser flex flex-col gap-1", className].filter(Boolean).join(" ")}>
            {label && (
                <label
                    htmlFor={id}
                    className="language-chooser__label text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                name={name}
                defaultValue={defaultValue}
                className="language-chooser__select w-auto min-w-32"
            >
                {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageChooser;
