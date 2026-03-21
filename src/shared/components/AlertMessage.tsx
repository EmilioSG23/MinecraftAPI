/** Shared alert overlays used for loading and error states. */
interface AlertMessageProps {
	message: string;
	fontSize?: string;
	borderColor?: string;
	actions?: React.ReactNode;
}

/**
 * Renders a centered alert box with optional actions.
 *
 * @param props.message Main message shown to the user.
 * @param props.fontSize Optional typography classes.
 * @param props.borderColor Optional border color classes.
 * @param props.actions Optional action buttons rendered below the message.
 * @returns Overlay alert box.
 */
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

/**
 * Renders the default data loading alert.
 *
 * @returns Loading message overlay.
 */
export function AlertLoadingMessage() {
	return <AlertMessage message="Loading the information..." />;
}

/**
 * Renders the default image loading alert.
 *
 * @returns Loading message overlay for image-heavy views.
 */
export function AlertImageLoading() {
	return <AlertMessage message="Loading the images..." />;
}

interface AlertErrorMessageProps {
	onRetry?: () => void;
	message?: string;
}

/**
 * Renders an error alert with an optional retry action.
 *
 * @param props.onRetry Optional callback triggered by the retry button.
 * @param props.message Optional custom error message.
 * @returns Error message overlay.
 */
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
