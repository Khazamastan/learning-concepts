import { useEffect, useMemo, useRef, useState } from 'react';

const OTP_LENGTH = 6;

const createEmptyOtp = () => Array.from({ length: OTP_LENGTH }, () => '');

export default function App() {
  const [otp, setOtp] = useState(createEmptyOtp);
  const [submittedCode, setSubmittedCode] = useState(null);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isComplete = useMemo(() => otp.every((digit) => digit !== ''), [otp]);

  useEffect(() => {
    if (!isComplete) {
      setSubmittedCode(null);
    }
  }, [isComplete]);

  const updateOtpAt = (index, value) => {
    setOtp((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const focusAt = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, event) => {
    const raw = event.target.value;
    if (raw === '') {
      updateOtpAt(index, '');
      return;
    }

    const digits = raw.replace(/\D/g, '').split('');
    if (digits.length === 0) {
      return;
    }

    setOtp((current) => {
      const next = [...current];
      let pointer = index;
      digits.forEach((digit) => {
        if (pointer < OTP_LENGTH) {
          next[pointer] = digit;
          pointer += 1;
        }
      });
      return next;
    });

    const lastFilled = Math.min(index + digits.length, OTP_LENGTH - 1);
    focusAt(lastFilled);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      if (otp[index] === '') {
        const prev = Math.max(index - 1, 0);
        updateOtpAt(prev, '');
        focusAt(prev);
      } else {
        updateOtpAt(index, '');
      }
      event.preventDefault();
      return;
    }

    if (event.key === 'Delete') {
      updateOtpAt(index, '');
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowLeft') {
      focusAt(Math.max(index - 1, 0));
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowRight') {
      focusAt(Math.min(index + 1, OTP_LENGTH - 1));
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboard = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!clipboard) {
      return;
    }
    const digits = clipboard.slice(0, OTP_LENGTH).split('');
    setOtp((current) => {
      const next = [...current];
      for (let i = 0; i < OTP_LENGTH; i += 1) {
        next[i] = digits[i] ?? '';
      }
      return next;
    });
    focusAt(Math.min(digits.length, OTP_LENGTH) - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) {
      return;
    }
    setSubmittedCode(otp.join(''));
  };

  const reset = () => {
    setOtp(createEmptyOtp());
    setSubmittedCode(null);
    focusAt(0);
  };

  return (
    <div className="screen">
      <form className="card" onSubmit={handleSubmit}>
        <h1>OTP Verification</h1>
        <p className="hint">Enter the 6 digit code sent to your device.</p>
        <div className="otp" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              aria-label={`Digit ${index + 1}`}
              className={digit ? 'filled' : ''}
              value={digit}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
          ))}
        </div>
        <div className="actions">
          <button type="submit" disabled={!isComplete}>
            Verify Code
          </button>
          <button type="button" className="secondary" onClick={reset}>
            Reset
          </button>
        </div>
        <p className="status" role="status">
          {submittedCode ? `Code accepted: ${submittedCode}` : 'No code submitted yet.'}
        </p>
      </form>
    </div>
  );
}
