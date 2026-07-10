import { useState } from "react";
import EyeIcon from "../asset/img/icons/eye.svg";
import EyeOffIcon from "../asset/img/icons/eyeoff.svg";
<<<<<<< HEAD
import type { HiddenButtonProps } from "../types";
=======

interface HiddenButtonProps {
	rideName: string;
}
>>>>>>> 2dc0d5007fa6ed96c0c20ffa1129ea6b56519c44

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
