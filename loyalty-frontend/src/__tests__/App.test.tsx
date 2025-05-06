import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the page components
jest.mock('../pages/Dashboard', () => () => <div data-testid="dashboard-page">Dashboard Page</div>);
jest.mock('../pages/Customers', () => () => <div data-testid="customers-page">Customers Page</div>);
jest.mock('../pages/Rewards', () => () => <div data-testid="rewards-page">Rewards Page</div>);
jest.mock('../pages/Settings', () => () => <div data-testid="settings-page">Settings Page</div>);

describe('App', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  it('renders navigation menu', () => {
    renderApp();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Rewards')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders dashboard page by default', () => {
    renderApp();
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('renders customers page when navigating to /customers', () => {
    window.history.pushState({}, '', '/customers');
    renderApp();
    expect(screen.getByTestId('customers-page')).toBeInTheDocument();
  });

  it('renders rewards page when navigating to /rewards', () => {
    window.history.pushState({}, '', '/rewards');
    renderApp();
    expect(screen.getByTestId('rewards-page')).toBeInTheDocument();
  });

  it('renders settings page when navigating to /settings', () => {
    window.history.pushState({}, '', '/settings');
    renderApp();
    expect(screen.getByTestId('settings-page')).toBeInTheDocument();
  });

  it('toggles mobile navigation when clicking navigation toggle', () => {
    renderApp();
    const navigationToggle = screen.getByRole('button', { name: /toggle navigation/i });
    fireEvent.click(navigationToggle);
    // Add assertions for mobile navigation state
  });
}); 