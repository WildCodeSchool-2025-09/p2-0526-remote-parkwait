export function getWaitTimeClass(waitTime: number): string {
	if (waitTime <= 20) return "wait-short";
	if (waitTime <= 50) return "wait-medium";
	return "wait-long";
}
