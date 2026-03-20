/** Search input used by entity list pages. */
/**
 * Sanitizes the filter input, allowing letters, accents, spaces and underscores only.
 *
 * @param e Change event from the search input.
 * @returns Sanitized value or null when invalid characters are present.
 */
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): string | null => {
	const value = e.target.value;
	return /^[a-zA-ZÀ-ÿ\s_]*$/.test(value) ? value : null;
};

interface FilterProps {
	data: string;
	filterBy?: string;
	value: string;
	onChange: (value: string, key: string) => void;
}

/**
 * Renders the text input used to filter entity collections.
 *
 * @param props.data Human-readable entity name used in labels and placeholders.
 * @param props.filterBy Entity property updated when the user types.
 * @param props.value Current input value.
 * @param props.onChange Callback invoked with the sanitized input value.
 * @returns Search input element.
 */
export function Filter({ data, filterBy = "name", value, onChange }: FilterProps) {
	return (
		<input
			className="w-full bg-[#8b8b8b] px-2! text-[16px] sm:text-[24px]"
			placeholder={`Search a ${data}...`}
			aria-label={`Search a ${data}`}
			type="text"
			maxLength={100}
			value={value}
			onChange={(e) => {
				const newValue = handleInputChange(e);
				if (newValue !== null) onChange(newValue, filterBy);
			}}
		/>
	);
}
