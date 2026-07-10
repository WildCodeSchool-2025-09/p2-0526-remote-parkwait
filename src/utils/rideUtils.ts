import type { Ride } from "../types";

export function getWaitTimeClass(waitTime: number): string {
	if (waitTime <= 20) return "wait-short";
	if (waitTime <= 50) return "wait-medium";
	return "wait-long";
}

export function byWaitTime(a: Ride, b: Ride): number {
	return a.wait_time - b.wait_time;
}
