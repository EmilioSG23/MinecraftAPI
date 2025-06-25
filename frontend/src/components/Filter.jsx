const handleInputChange = (e) => {
	const value = e.target.value;
	return /^[a-zA-ZÀ-ÿ\s_]*$/.test(value) ? value : null;
};

export function Filter({ data, filterBy = "name", value, onChange }) {
	return (
		<input
			className="w-[95%] bg-[#8b8b8b] px-2 text-[24px]"
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
