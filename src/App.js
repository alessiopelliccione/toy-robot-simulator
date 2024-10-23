import React, { useState } from 'react';
import InputHandler from './models/InputHandler';
import AppView from './components/AppView';
import Robot from './models/Robot';

function App() {

  const [inputCommands, setInputCommands] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [robot, setRobot] = useState(new Robot());

  const executeCommands = () => {
    const inputHandler = new InputHandler(robot);
    const outputText = inputHandler.executeCommands(inputCommands);
    const errorMessage = inputHandler.getError();

    if (errorMessage) {
      setError(errorMessage);
      setOutput('');
    } else {
      setError('');
      setOutput(outputText);
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
