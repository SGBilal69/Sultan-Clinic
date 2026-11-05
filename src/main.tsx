// Defensive patch for environments where window.fetch has only a getter
try {
  const origFetch = window.fetch;
  let fetchFn = typeof origFetch === 'function' ? origFetch.bind(window) : origFetch;
  Object.defineProperty(window, 'fetch', {
    get() {
      return fetchFn;
    },
    set(v) {
      fetchFn = v;
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
