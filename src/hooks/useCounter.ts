import { Dispatch, SetStateAction, useState } from 'react';

/* eslint-disable */
type ReturnTypeUseCounter = {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	setCount: Dispatch<SetStateAction<number>>;
};
/* eslint-enable */

function useCounter(initialValue?: number): ReturnTypeUseCounter {
	const [count, setCount] = useState(initialValue || 0);

	const increment = () => setCount(x => x + 1);
	const decrement = () => setCount(x => x - 1);
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
