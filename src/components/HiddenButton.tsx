import EyeIcon from "../asset/img/icons/eye.svg";
import type { HiddenButtonProps } from "../types";

function HiddenButton({ rideName, onHide }: HiddenButtonProps) {
	return (
		<button
			type="button"
			className="icon-button hidden-button"
			onClick={onHide}
			aria-label={`Masquer ${rideName}`}
			title="Masquer"
		>
			<img src={EyeIcon} className="hideIcon" alt="" />
		</button>
	);
}

export default HiddenButton;
