import type { FilterButtonProps } from "../types";
import "../css/FilterButton.css";

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
	return (
		<button
			type="button"
			className={`filter-btn ${isActive ? "active" : ""}`}
			onClick={onClick}
			aria-pressed={isActive}
		>
			{label}
		</button>
	);
}

export default FilterButton;
