/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorHandler from '../src/components/ErrorHandler';
import '@testing-library/jest-dom';

describe('ErrorHandler component', () => {
  test('should render null when no error is passed', () => {
    const { container } = render(<ErrorHandler error={null} />);
    expect(container.firstChild).toBeNull(); // Nothing should be rendered if error is null
  });

  test('should render the error message when an error is passed', () => {
    const errorMessage = 'This is an error';
    render(<ErrorHandler error={errorMessage} />);
    
    expect(screen.getByText('Error:')).toBeInTheDocument(); // Check if "Error:" is rendered
    expect(screen.getByText(errorMessage)).toBeInTheDocument(); // Check if the error message is rendered
  });

  test('should render the error inside a <pre> tag', () => {
    const errorMessage = 'Stacktrace or error details here';
    render(<ErrorHandler error={errorMessage} />);
    
    const preElement = screen.getByText(errorMessage).closest('pre');
    expect(preElement).toBeInTheDocument(); // Ensure that the error is wrapped inside a <pre> tag
  });

  test('should display error message in red color', () => {
    const errorMessage = 'Some error occurred';
    render(<ErrorHandler error={errorMessage} />);
    
    const errorDiv = screen.getByText('Error:').closest('div');
    expect(errorDiv).toHaveStyle({ color: 'red' }); // Verify that the error message is in red
  });
});
