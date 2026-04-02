import { useEffect, useMemo, useState } from 'react';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

export default function App() {
  const [text, setText] = useState('Welcome to the text to speech playground!');
  const [voices, setVoices] = useState([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [speakingState, setSpeakingState] = useState('idle'); // idle | playing | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!synth) {
      setErrorMessage('Speech Synthesis API is not available in this browser.');
      return;
    }

    const populateVoices = () => {
      const available = synth.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    };

    populateVoices();
    synth.addEventListener('voiceschanged', populateVoices);

    return () => synth.removeEventListener('voiceschanged', populateVoices);
  }, []);

  const selectedVoice = useMemo(() => voices[voiceIndex] ?? null, [voices, voiceIndex]);

  const handleSpeak = () => {
    if (!synth) {
      setErrorMessage('Speech Synthesis API is not available in this browser.');
      setSpeakingState('error');
      return;
    }

    if (!text.trim()) {
      setErrorMessage('Enter some text to speak.');
      setSpeakingState('error');
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setErrorMessage('');
      setSpeakingState('playing');
    };

    utterance.onend = () => {
      setSpeakingState('idle');
    };

    utterance.onerror = (event) => {
      setSpeakingState('error');
      setErrorMessage(event.error ?? 'Unable to speak the provided text.');
    };

    synth.speak(utterance);
  };

  const isDisabled = speakingState === 'playing';

  return (
    <div className="stage">
      <div className="card">
        <header>
          <h1>Text → Audio Animator</h1>
          <p>Use the Speech Synthesis API to narrate your message with a playful animation.</p>
        </header>
        <label htmlFor="tts-text">Message</label>
        <textarea
          id="tts-text"
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type something inspiring..."
        />
        <label htmlFor="voice">Voice</label>
        <select
          id="voice"
          value={voiceIndex}
          onChange={(event) => setVoiceIndex(Number(event.target.value))}
        >
          {voices.length === 0 ? (
            <option disabled>Loading voices…</option>
          ) : (
            voices.map((voice, index) => (
              <option key={voice.voiceURI} value={index}>
                {voice.name} · {voice.lang}
              </option>
            ))
          )}
        </select>
        <button type="button" onClick={handleSpeak} disabled={isDisabled}>
          {isDisabled ? 'Speaking…' : 'Convert to Speech'}
        </button>
        {errorMessage && (
          <p className="error" role="alert">
            {errorMessage}
          </p>
        )}
        <Visualizer state={speakingState} />
      </div>
    </div>
  );
}

function Visualizer({ state }) {
  return (
    <div className={`visualizer visualizer--${state}`} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }} />
      ))}
    </div>
  );
}
