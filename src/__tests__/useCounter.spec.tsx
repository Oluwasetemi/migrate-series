import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useCounter from '../hooks/useCounter';

describe('useCounter()', () => {
	test('should use counter', () => {
		const { result } = renderHook(() => useCounter());

		expect(result?.current.count).toBe(0);
		expect(typeof result?.current.increment).toBe('function');
		expect(typeof result?.current.decrement).toBe('function');
		expect(typeof result?.current.reset).toBe('function');
		expect(typeof result?.current.setCount).toBe('function');
	});

	test('should increment counter', () => {
		const { result } = renderHook(() => useCounter());

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});
	test('should step works', () => {
		const { result } = renderHook(() => useCounter({ steps: 2 }));

		expect(result.current.count).toBe(0);
		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(2);
	});

	test('should decrement counter', () => {
		const { result } = renderHook(() => useCounter());

		act(() => {
			result.current.decrement();
		});

		expect(result.current.count).toBe(-1);
	});

	test('should default value works', () => {
		const { result } = renderHook(() => useCounter({ initialValue: 3 }));

		expect(result.current.count).toBe(3);
	});

	test('should reset counter', () => {
		const { result } = renderHook(() => useCounter({ initialValue: 3 }));
		act(() => {
			result.current.decrement();
		});

		expect(result.current.count).toBe(2);
	});

	test('should set counter', () => {
		const { result } = renderHook(() => useCounter());

		act(() => {
			result.current.setCount(5);
		});

		expect(result.current.count).toBe(5);
	});

	test('should set counter with prev value', () => {
		const { result } = renderHook(() => useCounter({ initialValue: 5 }));

		act(() => {
			result.current.setCount(x => x + 2);
		});

		expect(result.current.count).toBe(7);
	});

	describe('Use hook in a component', () => {
		// 3 tests
		test('exposes the count and increment/decrement functions', () => {
			let result: ReturnType<typeof useCounter>;
			function TestComponent(): React.ReactElement {
				result = useCounter();
				return <div />;
			}
			render(<TestComponent />);
			// @ts-ignore
			expect(result.count).toBe(0);
			act(() => result.increment());
			// @ts-ignore
			expect(result.count).toBe(1);
			act(() => result.decrement());
			// @ts-ignore
			expect(result.count).toBe(0);
		});

		describe('another approach', () => {
			type TestProp = {
				initialValue: number;
				steps: number;
			};
			function setup({ initialProps }: { initialProps?: any } = {}) {
				let current: ReturnType<typeof useCounter> = {
					count: 0,
					decrement: () => {},
					increment: () => {},
					setCount: () => {},
					reset: () => {},
				};

				let result = { current: { ...current } };

				function TestComponent({
					initialValue = 0,
					steps = 1,
				}: TestProp): React.ReactElement {
					result.current = useCounter({ initialValue, steps });
					return <div />;
				}

				render(<TestComponent {...initialProps} />);
				return result;
			}

			test('exposes the count and increment/decrement functions', () => {
				const result = setup();
				expect(result.current.count).toBe(0);
				act(() => result.current.increment());
				expect(result.current.count).toBe(1);

				act(() => result.current.decrement());
				expect(result.current.count).toBe(0);
			});

			test('allows customization of the initial count', () => {
				const result = setup({ initialProps: { initialValue: 3 } });
				expect(result.current.count).toBe(3);
			});

			test('allows customization of the step', () => {
				const result = setup({ initialProps: { steps: 2 } });
				expect(result.current.count).toBe(0);
				act(() => result.current.increment());
				expect(result.current.count).toBe(2);
				act(() => result.current.decrement());
				expect(result.current.count).toBe(0);
			});
		});
	});
});
