import { useState } from "react";
import EyeIcon from "/icons/eye.svg";
import EyeOffIcon from "/icons/eyeoff.svg";
import type { HiddenButtonProps } from "../types";

function HiddenButton({ rideName }: HiddenButtonProps) {
	const [isHidden, setIsHidden] = useState(false);

	return (
		<button
			type="button"
			className={`icon-button hidden-button${isHidden ? " is-active" : ""}`}
			onClick={() => setIsHidden(!isHidden)}
			aria-label={isHidden ? `Afficher ${rideName}` : `Masquer ${rideName}`}
			aria-pressed={isHidden}
			title="Masquer/Afficher"
		>
			<img src={isHidden ? EyeIcon : EyeOffIcon} className="hideIcon" alt="" />
		</button>
	);
}

export default HiddenButton;
