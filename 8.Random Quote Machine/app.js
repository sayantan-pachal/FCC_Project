const quotesData = [
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
    },
    {
        text: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein",
    },
    {
        text: "It always seems impossible until it is done.",
        author: "Nelson Mandela",
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
    },
    {
        text: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama",
    },
];

function App() {
    const [quote, setQuote] = React.useState({ text: "", author: "" });
    const [bgColor, setBgColor] = React.useState("#16a085");

    const colors = [
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#e74c3c",
        "#f39c12",
        "#d35400",
    ];

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setQuote(quotesData[randomIndex]);
        setBgColor(randomColor);
    };

    React.useEffect(() => {
        getRandomQuote();
    }, []);

    const encodedQuote = encodeURIComponent(`"${quote.text}" - ${quote.author}`);

    return (
        <div
            style={{
                backgroundColor: bgColor,
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "background-color 0.5s ease",
            }}
        >
            <div id="quote-box" className="quote-box">
                <p id="text" style={{ color: bgColor }}>
                    <i className="fas fa-quote-left"></i> {quote.text}
                </p>

                <p id="author" style={{ color: bgColor }}>
                    - {quote.author}
                </p>

                <div className="buttons-row">
                    {/* Share Buttons Left */}
                    <div className="social-buttons">
                        {/* X (Twitter) */}
                        <a
                            id="tweet-quote"
                            href={`https://twitter.com/intent/tweet?text=${encodedQuote}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: bgColor }}
                            className="btn small-btn"
                        >
                            <i className="fab fa-x-twitter"></i>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: bgColor }}
                            className="btn small-btn"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>

                    {/* New Quote Button Right */}
                    <button
                        id="new-quote"
                        onClick={getRandomQuote}
                        style={{ backgroundColor: bgColor }}
                        className="btn"
                    >
                        New Quote
                    </button>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
