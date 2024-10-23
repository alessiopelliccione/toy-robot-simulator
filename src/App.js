import React, { useState } from 'react';
import InputHandler from './InputHandler';
import AppView from './AppView';

function App() {

  const [inputCommands, setInputCommands] = useState('');
  const [output, setOutput] = useState('');
  const [robot, setRobot] = useState(null);

  const executeCommands = () => {
    const inputHandler = new InputHandler;
    const outputText = inputHandler.executeCommands(inputCommands);
    setOutput(outputText);
    setRobot(inputHandler.getRobot());
    console.log(outputText);
  }

  return (
    <AppView
      inputCommands={inputCommands}
      setInputCommands={setInputCommands}
      executeCommands={executeCommands}
      output={output}
      robot={robot}
    />
  );
}

export default App;
