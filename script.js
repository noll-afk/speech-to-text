const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.textContent = 'Speech recognition is not supported in this browser.';
  startBtn.disabled = true;
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  startBtn.addEventListener('click', () => {
    recognition.start();
    output.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript + ' ';
    }
    output.textContent = transcript;
  };

  recognition.onerror = (event) => {
    output.textContent = 'Error: ' + event.error;
  };
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker Registered'));
}
