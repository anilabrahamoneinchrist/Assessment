

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ApiList, { Api } from '../src/components/ApiList';
import '@testing-library/jest-dom';

describe('ApiList', () => {
  it('does not show a URL if it is missing from the API object', () => {
    // API with missing URL
    const apisMissingUrl: Api[] = [
      { id: '1', name: 'No URL API', url: '', status: 'Production' },
    ];
    render(<ApiList apis={apisMissingUrl} />);
    expect(screen.getByText('No URL API')).toBeInTheDocument();
    // Should show empty cell for URL
    const row = screen.getByText('No URL API').closest('tr');
    const cells = row.querySelectorAll('td');
    expect(cells[1].textContent).toBe('');
  });

  it('does not show APIs or URLs for a status that does not exist', () => {
    // filter for a valid status not present in the data
    const apisNoDev: Api[] = [
      { id: '1', name: 'User API', url: 'https://api.example.com/user', status: 'Production' },
      { id: '2', name: 'Legacy API', url: 'https://api.example.com/legacy', status: 'Deprecated' },
    ];
    render(<ApiList apis={apisNoDev} />);
    fireEvent.change(screen.getByLabelText(/filter by status/i), {
      target: { value: 'Development' },
    });
    expect(screen.queryByText('User API')).not.toBeInTheDocument();
    expect(screen.queryByText('Legacy API')).not.toBeInTheDocument();
    expect(screen.queryByText('https://api.example.com/user')).not.toBeInTheDocument();
    expect(screen.queryByText('https://api.example.com/legacy')).not.toBeInTheDocument();
    expect(screen.getByText('No APIs found matching the selected criteria.')).toBeInTheDocument();
  });
  const apis: Api[] = [
    { id: '1', name: 'User API', url: 'https://api.example.com/user', status: 'Production' },
    { id: '2', name: 'Order API', url: 'https://api.example.com/order', status: 'Development' },
    { id: '3', name: 'Legacy API', url: 'https://api.example.com/legacy', status: 'Deprecated' },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('shows all APIs by default', () => {
    render(<ApiList apis={apis} />);
    expect(screen.getByText('User API')).toBeInTheDocument();
    expect(screen.getByText('Order API')).toBeInTheDocument();
    expect(screen.getByText('Legacy API')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/user')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/order')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/legacy')).toBeInTheDocument();
  });

  it('filters APIs by status', () => {
    render(<ApiList apis={apis} />);
    fireEvent.change(screen.getByLabelText(/filter by status/i), {
      target: { value: 'Production' },
    });
    expect(screen.getByText('User API')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/user')).toBeInTheDocument();
    expect(screen.queryByText('Order API')).not.toBeInTheDocument();
    expect(screen.queryByText('Legacy API')).not.toBeInTheDocument();
  });

  it('shows message if no APIs match', () => {
    render(<ApiList apis={[]} />);
    expect(
      screen.getByText('No APIs found matching the selected criteria.')
    ).toBeInTheDocument();
  });

  it('persists filter selection in localStorage', () => {
    render(<ApiList apis={apis} />);
    fireEvent.change(screen.getByLabelText(/filter by status/i), {
      target: { value: 'Deprecated' },
    });
    expect(localStorage.getItem('apiFilterStatus')).toBe('Deprecated');
  });

  it('loads persisted filter from localStorage', () => {
    localStorage.setItem('apiFilterStatus', 'Development');
    render(<ApiList apis={apis} />);
    expect(screen.getByDisplayValue('Development')).toBeInTheDocument();
    expect(screen.getByText('Order API')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/order')).toBeInTheDocument();
    expect(screen.queryByText('User API')).not.toBeInTheDocument();
  });
});
