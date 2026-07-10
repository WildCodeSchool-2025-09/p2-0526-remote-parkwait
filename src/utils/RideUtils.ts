export function getWaitTimeClass(waitTime: number): string {
	if (waitTime <= 20) return "wait-short";
	if (waitTime <= 50) return "wait-medium";
	return "wait-long";
}
export function getLandIcon(landName: string): string {
	const icons: Record<string, string> = {
		Fantasyland: "castle.svg",
		Discoveryland: "rocket.svg",
		Adventureland: "compass.svg",
	};
	return icons[landName] || "default.svg";
}
