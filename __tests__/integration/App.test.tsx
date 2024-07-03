import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('expects app component to show', () => {
    render(<App />);

    expect(true).toBeTruthy();
  });

  it('expects error if env variables are not set', async () => {
    vi.stubEnv('VITE_API_TOKEN', '');

    render(<App />);

    await screen.findByTestId('missing-env-alert-component');

    expect(
      await screen.findByText('Please configure env variables in order to proceed')
    ).not.toBeUndefined();
  });

  it('expects Navbar to show if env var are set', async () => {
    vi.unstubAllEnvs();

    render(<App />);

    expect(await screen.findByTestId('navbar-component')).not.toBeUndefined();
  });
});
