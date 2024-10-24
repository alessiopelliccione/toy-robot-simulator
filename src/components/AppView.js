import React from "react";
import ErrorHandler from "./ErrorHandler";

function AppView({ inputCommands, setInputCommands, executeCommands, output, error}) {
    return (
        <div className="App">
            <h1>Toy Robot Simulator - Alessio Pelliccione - Full Stack Developer</h1>
            <textarea
                rows={10}
                cols={50}
                value={inputCommands}
                onChange={(e) => setInputCommands(e.target.value)}
                placeholder="Enter commands here..."
            ></textarea>
            <br />
            <button onClick={executeCommands}>Execute</button>
            <ErrorHandler error={error} />
            {output && (
                <div>
                    <h2>Output:</h2>
                    <pre>{output}</pre>
                </div>
            )}
        </div>
    );
}

export default AppView;