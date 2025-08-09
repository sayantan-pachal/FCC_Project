const { useState } = React;

marked.setOptions({
    breaks: true,
});

const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
And here’s some other cool stuff:

Here’s some code, \`<div></div>\`, between 2 backticks.

\`\`\`js
function anotherExample(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There’s also [links](https://www.freecodecamp.org), and
> Block Quotes!

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- Lists
  - Bullets
     - Indents

1. Numbered
1. Use 1s
1. Embedded images:
![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
`;

function App() {
    const [markdown, setMarkdown] = useState(defaultMarkdown);
    const [fullscreenBox, setFullscreenBox] = useState(null);

    const toggleFullscreen = (boxId) => {
        setFullscreenBox(fullscreenBox === boxId ? null : boxId);
    };

    return (
        <div id="app" className={fullscreenBox ? "fullscreen-mode" : ""}>
            <div
                className={`box ${fullscreenBox === "editor" ? "fullscreen" : ""}`}
                id="editor-box"
                style={{
                    display:
                        fullscreenBox && fullscreenBox !== "editor" ? "none" : "block",
                }}
            >
                <div className="header">
                    <span>
                        <i className="fa-solid fa-pen"></i> Editor
                    </span>
                    <button
                        className="fullscreen-btn"
                        onClick={() => toggleFullscreen("editor")}
                        title="Toggle Fullscreen"
                    >
                        <i
                            className={`fa-solid ${fullscreenBox === "editor" ? "fa-minimize" : "fa-maximize"
                                }`}
                        ></i>
                    </button>
                </div>
                <textarea
                    id="editor"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>

            <div
                className={`box ${fullscreenBox === "preview" ? "fullscreen" : ""}`}
                id="preview-box"
                style={{
                    display:
                        fullscreenBox && fullscreenBox !== "preview" ? "none" : "block",
                }}
            >
                <div className="header">
                    <span>
                        <i className="fa-solid fa-eye"></i> Previewer
                    </span>
                    <button
                        className="fullscreen-btn"
                        onClick={() => toggleFullscreen("preview")}
                        title="Toggle Fullscreen"
                    >
                        <i
                            className={`fa-solid ${fullscreenBox === "preview" ? "fa-minimize" : "fa-maximize"
                                }`}
                        ></i>
                    </button>
                </div>
                <div
                    id="preview"
                    className="preview-box"
                    dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
                />
                <div
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: "0.8em",
                        color: "#888",
                        textAlign: "center",
                    }}
                >
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
