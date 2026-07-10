import { useState } from "react";

export function useLandSection() {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => setIsOpen((prev) => !prev);
	return { isOpen, toggle };
}
