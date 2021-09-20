import React from 'react';
import './App.css';
import useCounter from './hooks/useCounter';
import useDarkMode from './hooks/useDarkMode';
import logo from './logo.svg';

function App() {
	const { count, setCount, increment, decrement, reset } = useCounter(0);
	const { isDarkMode, toggle } = useDarkMode(false);

	const handleToggle = () => {
		toggle();
		document.documentElement.classList.toggle('light');
	};

	React.useEffect(() => {
		if (!isDarkMode) {
			// remove any existing light or dark more
			document.documentElement.classList.add('light');
		}
	});

	return (
		<div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
			<nav>
				<button onClick={handleToggle}>{isDarkMode ? 'Light' : 'Dark'}</button>
			</nav>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hello Vite + React!</p>
				<p>
					<button type="button" onClick={() => setCount(count => count + 1)}>
						count is: {count}
					</button>
					<button
						aria-labelledby="please increment the counter"
						onClick={increment}
					>
						👆
					</button>
					<button
						aria-labelledby="please decrement the counter"
						onClick={decrement}
					>
						👇
					</button>
					<button
						aria-labelledby="please increment the counter"
						onClick={reset}
					>
						reset
					</button>
				</p>
				<p>
					Edit <code>App.tsx</code> and save to test HMR updates.
				</p>
				<p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					{' | '}
					<a
						className="App-link"
						href="https://vitejs.dev/guide/features.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vite Docs
					</a>
				</p>
			</header>
		</div>
	);
}

export default App;
