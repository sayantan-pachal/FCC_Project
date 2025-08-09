const bankOne = [
    {
        key: "Q",
        id: "Heater-1",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        key: "W",
        id: "Heater-2",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        key: "E",
        id: "Heater-3",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        key: "A",
        id: "Heater-4",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        key: "S",
        id: "Clap",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        key: "D",
        id: "Open-HH",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        key: "Z",
        id: "Kick-n'-Hat",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        key: "X",
        id: "Kick",
        src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        key: "C",
        id: "Closed-HH",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
];

const bankTwo = [
    {
        key: "Q",
        id: "Chord-1",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
        key: "W",
        id: "Chord-2",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
        key: "E",
        id: "Chord-3",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
        key: "A",
        id: "Shaker",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
        key: "S",
        id: "Open-HH",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
        key: "D",
        id: "Closed-HH",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
        key: "Z",
        id: "Punchy-Kick",
        src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
        key: "X",
        id: "Side-Stick",
        src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
        key: "C",
        id: "Snare",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
];

function DrumPad({ clip, volume, updateDisplay }) {
    const playSound = () => {
        const audio = document.getElementById(clip.key);
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
        updateDisplay(clip.id);
    };

    React.useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key.toUpperCase() === clip.key) {
                playSound();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [volume]);

    return (
        <div className="drum-pad" id={clip.id} onClick={playSound}>
            {clip.key}
            <audio className="clip" id={clip.key} src={clip.src}></audio>
        </div>
    );
}

function App() {
    const [display, setDisplay] = React.useState("");
    const [volume, setVolume] = React.useState(0.5);
    const [bank, setBank] = React.useState(true); // true = bankOne, false = bankTwo

    const clips = bank ? bankOne : bankTwo;

    return (
        <div id="drum-machine">
            <div className="pad-grid">
                {clips.map((clip) => (
                    <DrumPad
                        key={clip.key}
                        clip={clip}
                        volume={volume}
                        updateDisplay={setDisplay}
                    />
                ))}
            </div>
            <div className="controls">
                <div className="logo">Spachal</div>

                <div id="display">{display}</div>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                        setVolume(e.target.value);
                        setDisplay("Volume: " + Math.round(e.target.value * 100));
                    }}
                />

                <div className="toggle">
                    <label>Smooth</label>
                    <input
                        type="checkbox"
                        checked={bank}
                        onChange={() => {
                            setBank(!bank);
                            setDisplay(!bank ? "Heater Kit" : "Smooth Piano Kit");
                        }}
                    />
                    <label>Heater</label>
                </div>
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
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));