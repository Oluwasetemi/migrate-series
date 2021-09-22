import { Dispatch, SetStateAction, useState } from 'react';

/* eslint-disable */
export type ReturnTypeUseCounter = {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	setCount: Dispatch<SetStateAction<number>>;
};

type CounterProps = {
	initialValue: number;
} & {
	steps?: number;
};
/* eslint-enable */

function useCounter(
	{ initialValue, steps = 1 }: CounterProps = { steps: 1, initialValue: 0 },
): ReturnTypeUseCounter {
	const [count, setCount] = useState(initialValue || 0);

	const increment = () => setCount(x => x + steps);
	const decrement = () => setCount(x => x - steps);
	const reset = () => setCount(initialValue || 0);

	return {
		count,
		increment,
		decrement,
		reset,
		setCount,
	};
}

export default useCounter;
