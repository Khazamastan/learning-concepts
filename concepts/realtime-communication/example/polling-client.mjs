import fetch from 'node-fetch';

async function poll() {
  try {
    const response = await fetch('http://localhost:4100/snapshot');
    const data = await response.json();
    console.log('Polled timestamp:', new Date(data.timestamp).toISOString());
  } catch (error) {
    console.error('Polling failed:', error.message);
  }
}

console.log('Polling /snapshot every 5 seconds. Press Ctrl+C to exit.');
setInterval(poll, 5000);
poll();
