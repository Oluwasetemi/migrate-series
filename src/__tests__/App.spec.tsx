// import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App', () => {
	it('should renders app properly', () => {
		const { debug, getByText } = render(<App />);
		let count = getByText(/count is/);
		let react = getByText(/learn react/i);
		let vite = getByText(/hello vite/i);
		expect(count).toBeInTheDocument();
		expect(react).toBeInTheDocument();
		expect(vite).toBeInTheDocument();
	});

	it('should have a count value of 0 when app loads', () => {
		const { getByText } = render(<App />);
		let count = getByText(/count is/);
		expect(count.textContent).toContain(0);
	});

	it('should increment count value', () => {
		const { getByText } = render(<App />);
		let count = getByText(/count is/);
		fireEvent.click(count);
		expect(count.textContent).toContain(1);
	});

	it('rerender <App /> should not change the value of counter', () => {
		const { rerender } = render(<App />);
		let count = screen.getByRole('button', { name: /count is/i });

		fireEvent.click(count);

		expect(count.textContent).toContain(1);

		rerender(<App />);

		fireEvent.click(count);

		expect(count.textContent).toContain(2);
	});
});
