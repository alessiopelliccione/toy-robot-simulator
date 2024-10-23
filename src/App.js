import React, { useState } from 'react';
import InputHandler from './InputHandler';
import AppView from './AppView';

function App() {

  const [inputCommands, setInputCommands] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [robot, setRobot] = useState(null);

  const executeCommands = () => {
    const inputHandler = new InputHandler;
    const outputText = inputHandler.executeCommands(inputCommands);
    const errorMessage = inputHandler.getError();

    if (errorMessage) {
      setError(errorMessage);
      setOutput('');
      setRobot(null);
    } else {
      setError('');
      setOutput(outputText);
      setRobot(inputHandler.getRobot());
    }
    
  }

  return (
    <AppView
      inputCommands={inputCommands}
      setInputCommands={setInputCommands}
      executeCommands={executeCommands}
      output={output}
      robot={robot}
      error={error}
    />
  );
}

export default App;
