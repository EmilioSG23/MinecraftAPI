interface AlertMessageProps {
	message: string;
	fontSize?: string;
	borderColor?: string;
	actions?: React.ReactNode;
}

export function AlertMessage(props: AlertMessageProps) {
	const {
		message,
		fontSize = "text-[24px] sm:text-[48px]",
		borderColor = "border-white-900",
		actions,
	} = props;
	return (
		<div
			className={`fixed left-1/2 top-1/2 -translate-1/2 bg-black/25
				border-4 text-white text-center py-10 px-20 ${fontSize} ${borderColor}`}
		>
			{message}
			{actions && <div className="mt-4 flex justify-center">{actions}</div>}
		</div>
	);
}

export function AlertLoadingMessage() {
	return <AlertMessage message="Loading the information..." />;
}

export function AlertImageLoading() {
	return <AlertMessage message="Loading the images..." />;
}

interface AlertErrorMessageProps {
	onRetry?: () => void;
	message?: string;
}

export function AlertErrorMessage({ onRetry, message }: AlertErrorMessageProps = {}) {
	return (
		<AlertMessage
			message={message || "Error with the fetching of the datas :(, go back and try again..."}
			fontSize="text-[16px] sm:text-[32px]"
			borderColor="border-red-900"
			actions={
				onRetry ? (
					<button type="button" className="mc-selector text-white px-4! py-2!" onClick={onRetry}>
						Retry
					</button>
				) : null
			}
		/>
	);
}
