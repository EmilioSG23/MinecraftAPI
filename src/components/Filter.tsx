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

export function Filter({ data, filterBy = "name", value, onChange }: FilterProps) {
	return (
		<input
			className="w-full bg-[#8b8b8b] px-2! text-[16px] sm:text-[24px]"
			placeholder={`Search a ${data}...`}
			aria-label={`Search a ${data}`}
			type="text"
			value={value}
			onChange={(e) => {
				const newValue = handleInputChange(e);
				if (newValue !== null) onChange(newValue, filterBy);
			}}
		/>
	);
}
