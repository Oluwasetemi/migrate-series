// import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import '../__mocks__/matchMediaMock';

describe('App', () => {
	beforeEach(() => cleanup());

	it('should renders app properly', () => {
		render(<App />);

		let count = screen.getByRole('button', { name: /count/i });
		let react = screen.getByRole('link', { name: /learn react/i });
		let vite = screen.getByRole('link', { name: /vite/i });

		expect(count).toBeInTheDocument();
		expect(react).toBeInTheDocument();
		expect(vite).toBeInTheDocument();
	});

	it('should have a count value of 0 when app loads', () => {
		render(<App />);

		let count = screen.getByRole('button', { name: /count/i });

		expect(count.textContent).toContain('0');
	});

	it('should increment count value', () => {
		render(<App />);
		let count = screen.getByRole('button', { name: /count is/i });

		fireEvent.click(count);

		expect(count).toHaveTextContent(1);
		expect(count.textContent).toContain('1');
	});

	it('rerender <App /> should not change the value of counter', () => {
		const { rerender } = render(<App />);
		let count = screen.getByRole('button', { name: /count is/i });

		fireEvent.click(count);

		expect(count.textContent).toContain(1);

		rerender(<App />);

		expect(count.textContent).toContain(1);

		fireEvent.click(count);

		expect(count.textContent).toContain(2);
	});

	describe('new feature reset', () => {
		it('should reset the counter to 0 when you click the reset button', () => {
			const { container, debug } = render(<App />);

			screen.getByRole('button', { name: /reset/i }).click();
			let count = screen.getByRole('button', { name: /count/i });

			expect(count.textContent).toContain(0);
		});
	});
});
