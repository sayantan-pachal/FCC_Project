const btns = [
    { id: "clear", label: "AC", type: "action" },
    { id: "back", label: "←", type: "action" },
    { id: "left-paren", label: "(", type: "paren" },
    { id: "right-paren", label: ")", type: "paren" },
    { id: "left-square", label: "[", type: "paren" },
    { id: "right-square", label: "]", type: "paren" },
    { id: "left-curly", label: "{", type: "paren" },
    { id: "right-curly", label: "}", type: "paren" },
    { id: "divide", label: "/", type: "operator" },
    { id: "seven", label: "7", type: "number" },
    { id: "eight", label: "8", type: "number" },
    { id: "nine", label: "9", type: "number" },
    { id: "multiply", label: "x", type: "operator" },
    { id: "four", label: "4", type: "number" },
    { id: "five", label: "5", type: "number" },
    { id: "six", label: "6", type: "number" },
    { id: "subtract", label: "-", type: "operator" },
    { id: "one", label: "1", type: "number" },
    { id: "two", label: "2", type: "number" },
    { id: "three", label: "3", type: "number" },
    { id: "add", label: "+", type: "operator" },
    { id: "decimal", label: ".", type: "decimal" },
    { id: "zero", label: "0", type: "number" },
    { id: "equals", label: "=", type: "equals" },
];

function endsWithOperator(expr) {
    return /[+\-x/]$/.test(expr);
}
function endsWithNumberOrBracket(expr) {
    return /[0-9.\]\}\)]$/.test(expr);
}
function isOpenBracket(val) {
    return ["(", "[", "{"].includes(val);
}
function isCloseBracket(val) {
    return [")", "]", "}"].includes(val);
}
function normalizeExpression(expr) {
    return expr
        .replace(/x/g, "*")
        .replace(/\[/g, "(")
        .replace(/\{/g, "(")
        .replace(/\]/g, ")")
        .replace(/\}/g, ")");
}

function Calculator() {
    const [expression, setExpression] = React.useState("");
    const [display, setDisplay] = React.useState("0");
    const [evaluated, setEvaluated] = React.useState(false);

    React.useEffect(() => {
        if (evaluated) {
            setDisplay(expression);
        } else {
            setDisplay(expression === "" ? "0" : expression);
        }
    }, [expression, evaluated]);

    const handleNumber = (val) => {
        if (evaluated) {
            setExpression(val === "0" ? "" : val);
            setEvaluated(false);
            return;
        }
        const parts = expression.split(/[+\-x/\(\)\[\]\{\}]/);
        const lastNum = parts[parts.length - 1];
        if (
            (lastNum === "0" && val === "0") ||
            (/([+\-x\/\(\[\{]0)$/.test(expression + val) && val === "0")
        ) {
            return;
        }
        if (
            endsWithOperator(expression) ||
            expression === "" ||
            /[\(\[\{]$/.test(expression)
        ) {
            setExpression(expression + val);
            return;
        }
        setExpression(expression + val);
    };

    const handleOperator = (val) => {
        if (evaluated) {
            setExpression(display + val);
            setEvaluated(false);
            return;
        }
        if (endsWithOperator(expression)) {
            if (val === "-" && !expression.endsWith("-")) {
                setExpression(expression + val);
                return;
            }
            setExpression(expression.replace(/[+\-x/]+$/, "") + val);
            return;
        }
        if (/[\(\[\{]$/.test(expression) && val !== "-") return;
        setExpression(expression + val);
    };

    const handleDecimal = () => {
        if (evaluated) {
            setExpression("0.");
            setEvaluated(false);
            return;
        }
        const parts = expression.split(/[+\-x/\(\)\[\]\{\}]/);
        const lastNum = parts[parts.length - 1];
        if (lastNum.includes(".")) return;
        if (
            endsWithOperator(expression) ||
            expression === "" ||
            /[\(\[\{]$/.test(expression)
        ) {
            setExpression(expression + "0.");
            return;
        }
        setExpression(expression + ".");
    };

    const handleClear = () => {
        setDisplay("0");
        setExpression("");
        setEvaluated(false);
    };

    const handleBack = () => {
        if (evaluated) {
            setExpression("");
            setEvaluated(false);
            setDisplay("0");
            return;
        }
        if (expression.length > 0) {
            setExpression(expression.slice(0, -1));
        }
    };

    const handleEquals = () => {
        let tempExpr = expression.replace(/[+\-x/]+$/, "");
        let exp = normalizeExpression(tempExpr.replace(/--/g, "+"));
        try {
            let result = eval(exp);
            result = Math.round(result * 1000000000000) / 1000000000000;
            setExpression(result.toString());
            setEvaluated(true);
        } catch {
            setExpression("Error");
            setEvaluated(true);
        }
    };

    const handleParen = (val) => {
        if (isOpenBracket(val)) {
            if (
                expression === "" ||
                endsWithOperator(expression) ||
                /[\(\[\{]$/.test(expression) ||
                evaluated
            ) {
                setExpression(expression + val);
                setEvaluated(false);
            }
        } else if (isCloseBracket(val)) {
            const open = { ")": "(", "]": "[", "}": "{" }[val];
            const openCount = (expression.match(new RegExp(`\\${open}`, "g")) || [])
                .length;
            const closeCount = (expression.match(new RegExp(`\\${val}`, "g")) || [])
                .length;
            if (endsWithNumberOrBracket(expression) && openCount > closeCount) {
                setExpression(expression + val);
            }
        }
    };

    const handleClick = (btn) => {
        const { type, label, id } = btn;
        if (id === "back") handleBack();
        else if (type === "number") handleNumber(label);
        else if (type === "operator") handleOperator(label);
        else if (type === "decimal") handleDecimal();
        else if (type === "action") handleClear();
        else if (type === "equals") handleEquals();
        else if (type === "paren") handleParen(label);
    };

    return (
        <div id="calculator" className="calculator">
            <div id="display" className="display">
                {display}
            </div>
            <div className="buttons">
                {btns.map((btn) => (
                    <button
                        id={btn.id}
                        key={btn.id}
                        onClick={() => handleClick(btn)}
                        className={`btn btn-${btn.type}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div><div style={{ marginTop: 20, fontSize: "0.8em", color: "#888" }}>
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

ReactDOM.render(<Calculator />, document.getElementById("root"));