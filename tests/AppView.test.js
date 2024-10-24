/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppView from '../src/components/AppView';
import '@testing-library/jest-dom';

describe('AppView component', () => {
  let mockSetInputCommands, mockExecuteCommands;

  beforeEach(() => {
    mockSetInputCommands = jest.fn();
    mockExecuteCommands = jest.fn();
  });

  test('should render the header', () => {
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={null}
      />
    );
    expect(screen.getByText('Toy Robot Simulator - Alessio Pelliccione - Full Stack Developer')).toBeInTheDocument();
  });

  test('should display the textarea with placeholder', () => {
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={null}
      />
    );
    const textarea = screen.getByPlaceholderText('Enter commands here...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '10');
    expect(textarea).toHaveAttribute('cols', '50');
  });

  test('should call setInputCommands when textarea value changes', () => {
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={null}
      />
    );
    const textarea = screen.getByPlaceholderText('Enter commands here...');
    fireEvent.change(textarea, { target: { value: 'PLACE 0,0,NORTH' } });
    expect(mockSetInputCommands).toHaveBeenCalledWith('PLACE 0,0,NORTH');
  });

  test('should call executeCommands when Execute button is clicked', () => {
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={null}
      />
    );
    const button = screen.getByText('Execute');
    fireEvent.click(button);
    expect(mockExecuteCommands).toHaveBeenCalled();
  });

  test('should render ErrorHandler when there is an error', () => {
    const error = 'An error occurred';
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={error}
      />
    );
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test('should display output when available', () => {
    const output = '1,1,NORTH';
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={output}
        error={null}
      />
    );
    expect(screen.getByText('Output:')).toBeInTheDocument();
    expect(screen.getByText(output)).toBeInTheDocument();
  });

  test('should not display output section when output is null', () => {
    render(
      <AppView
        inputCommands=""
        setInputCommands={mockSetInputCommands}
        executeCommands={mockExecuteCommands}
        output={null}
        error={null}
      />
    );
    expect(screen.queryByText('Output:')).toBeNull();
  });
});
