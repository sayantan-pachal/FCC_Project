const { useState, useEffect, useRef } = React;

// Constants for default values and limits
const DEFAULT_BREAK = 5;
const DEFAULT_SESSION = 25;
const MIN_LENGTH = 1;
const MAX_LENGTH = 60;

// Helper function to format time from seconds to mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (
        (minutes < 10 ? "0" : "") + minutes + ":" + (secs < 10 ? "0" : "") + secs
    );
}

// Main App Component
function App() {
    // State variables
    const [breakLength, setBreakLength] = useState(DEFAULT_BREAK);
    const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION);
    const [timerLabel, setTimerLabel] = useState("Session");
    const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION * 60);
    const [timerOn, setTimerOn] = useState(false);

    // Ref for the audio element
    const beepRef = useRef(null);

    // This single useEffect hook manages the timer interval and the phase switching.
    useEffect(() => {
        let interval = null;

        if (timerOn && timeLeft > 0) {
            // If the timer is on and there's time left, start the countdown.
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timerOn && timeLeft === 0) {
            // If the timer is on and hits 00:00, play the sound and switch phases.
            beepRef.current.play();
            if (timerLabel === "Session") {
                setTimerLabel("Break");
                setTimeLeft(breakLength * 60);
            } else {
                setTimerLabel("Session");
                setTimeLeft(sessionLength * 60);
            }
        }

        // Cleanup function to clear the interval when the component re-renders or unmounts.
        return () => clearInterval(interval);
    }, [timerOn, timeLeft, breakLength, sessionLength, timerLabel]);

    // Handler for the start/stop button
    const handleStartStop = () => {
        setTimerOn(!timerOn);
    };

    // Handler for the reset button
    const handleReset = () => {
        // Stop the timer
        setTimerOn(false);

        // Reset all state to default values
        setBreakLength(DEFAULT_BREAK);
        setSessionLength(DEFAULT_SESSION);
        setTimerLabel("Session");
        setTimeLeft(DEFAULT_SESSION * 60);

        // Stop and rewind the audio
        if (beepRef.current) {
            beepRef.current.pause();
            beepRef.current.currentTime = 0;
        }
    };

    // Generic handler for incrementing/decrementing lengths
    const handleLengthChange = (type, delta) => {
        // Do not allow changes while timer is running
        if (timerOn) return;

        if (type === "break") {
            const newLength = breakLength + delta;
            if (newLength >= MIN_LENGTH && newLength <= MAX_LENGTH) {
                setBreakLength(newLength);
            }
        } else {
            // session
            const newLength = sessionLength + delta;
            if (newLength >= MIN_LENGTH && newLength <= MAX_LENGTH) {
                setSessionLength(newLength);
                // Update the timer display immediately if it's not running
                setTimeLeft(newLength * 60);
            }
        }
    };

    return (
        <div id="clock">
            <h1>25 + 5 Clock</h1>
            <div id="length-controls">
                <div>
                    <div id="break-label">Break Length</div>
                    <button
                        id="break-decrement"
                        onClick={() => handleLengthChange("break", -1)}
                    >
                        -
                    </button>
                    <span id="break-length">{breakLength}</span>
                    <button
                        id="break-increment"
                        onClick={() => handleLengthChange("break", 1)}
                    >
                        +
                    </button>
                </div>
                <div>
                    <div id="session-label">Session Length</div>
                    <button
                        id="session-decrement"
                        onClick={() => handleLengthChange("session", -1)}
                    >
                        -
                    </button>
                    <span id="session-length">{sessionLength}</span>
                    <button
                        id="session-increment"
                        onClick={() => handleLengthChange("session", 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div id="timer">
                <div id="timer-label">{timerLabel}</div>
                <div id="time-left">{formatTime(timeLeft)}</div>
            </div>
            <div>
                <button
                    id="start_stop"
                    onClick={handleStartStop}
                    style={{ fontSize: "1.2em", marginRight: 15 }}
                >
                    {timerOn ? "Pause" : "Start"}
                </button>
                <button id="reset" onClick={handleReset} style={{ fontSize: "1.2em" }}>
                    Reset
                </button>
            </div>
            <audio
                id="beep"
                ref={beepRef}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
            />
            <div style={{ marginTop: 20, fontSize: "0.8em", color: "#888" }}>
                Created by{" "}
                <a
                    href="https://www.linkedin.com/in/sayantan-pachal"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#888" }}
                >
                    Sayantan Pachal
                </a>
            </div>
        </div>
    );
}

// Render the App component
ReactDOM.render(<App />, document.getElementById("root"));