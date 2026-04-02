import * as React from "react";

const RecorderState = {
  IDLE: "idle",
  RECORDING: "recording",
  PAUSED: "paused",
};

export function AudioRecorder() {
  const [supported, setSupported] = React.useState(() => typeof window !== "undefined" && Boolean(window.MediaRecorder));
  const [permissionStatus, setPermissionStatus] = React.useState("unknown");
  const [state, setState] = React.useState(RecorderState.IDLE);
  const [audioURL, setAudioURL] = React.useState(null);
  const chunksRef = React.useRef([]);
  const mediaRecorderRef = React.useRef(null);
  const streamRef = React.useRef(null);

  const requestStream = React.useCallback(async () => {
    if (!supported) return null;
    if (streamRef.current) return streamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionStatus("granted");
      return stream;
    } catch (error) {
      console.error("Microphone permission denied", error);
      setPermissionStatus("denied");
      return null;
    }
  }, [supported]);

  const startRecording = React.useCallback(async () => {
    if (!supported) return;
    const stream = await requestStream();
    if (!stream) return;

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        if (!streamRef.current?.getTracks().includes(track)) track.stop();
      });
    }

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    });

    recorder.addEventListener("stop", () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setState(RecorderState.IDLE);
    });

    recorder.start();
    setAudioURL(null);
    setState(RecorderState.RECORDING);
  }, [requestStream, supported]);

  const stopRecording = React.useCallback(() => {
    mediaRecorderRef.current?.stop();
    setState(RecorderState.IDLE);
  }, []);

  const resetRecording = React.useCallback(() => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    chunksRef.current = [];
    setState(RecorderState.IDLE);
  }, [audioURL]);

  React.useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [audioURL]);

  if (!supported) {
    return <p className="warning">MediaRecorder API is not available in this browser.</p>;
  }

  if (permissionStatus === "denied") {
    return <p className="warning">Microphone access denied. Update browser permissions to record audio.</p>;
  }

  return (
    <div className="recorder">
      <div className="status-line">
        <span className={`status-dot status-dot--${state}`}></span>
        <span className="status-text">{state === RecorderState.RECORDING ? "Recording" : "Idle"}</span>
      </div>
      <div className="controls">
        <button type="button" onClick={startRecording} disabled={state === RecorderState.RECORDING}>
          {permissionStatus === "unknown" ? "Enable microphone" : "Start recording"}
        </button>
        <button type="button" onClick={stopRecording} disabled={state !== RecorderState.RECORDING}>
          Stop
        </button>
        <button type="button" onClick={resetRecording} disabled={!audioURL}>
          Reset
        </button>
      </div>
      <div className="preview">
        {audioURL ? (
          <figure>
            <figcaption>Preview</figcaption>
            <audio controls src={audioURL}></audio>
            <a className="download" href={audioURL} download={`recording-${Date.now()}.webm`}>
              Download clip
            </a>
          </figure>
        ) : (
          <p className="hint">Record something to preview the clip.</p>
        )}
      </div>
    </div>
  );
}
