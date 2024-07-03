import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import * as MovieProvider from '../../src/providers/MovieProvider';
import userEvent from '@testing-library/user-event';
import Movies from '../../src/pages/movies';
import App from '../../src/App';

describe('Movies', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // We can also mock axios result in order to not rely on remote service data.
  it('expects movies to show an list of 20 remote movies', async () => {
    const { queryByTestId } = render(
      <MovieProvider.default>
        <Movies />
      </MovieProvider.default>
    );

    expect(await queryByTestId('loading-component')).toBeTruthy();

    waitFor(() => {
      expect(queryByTestId('loading-component')).toBeFalsy();
    });

    expect(await screen.queryByTestId('not-results')).toBeNull();
    expect(await screen.findAllByTestId('movie-card')).toHaveLength(20);
  });

  it('Typing in search bar should trigger search', async () => {
    const user = userEvent.setup();

    const { queryByTestId } = render(
      <MovieProvider.default>
        <App />
      </MovieProvider.default>
    );

    await queryByTestId('navbar-component');

    const input = (await screen.queryByTestId('navbar-search')) as HTMLInputElement;

    expect(queryByTestId('not-results')).toBeFalsy();

    expect(input.value).toEqual('');

    user.type(input, '...');

    waitFor(() => {
      expect(queryByTestId('not-results')).toBeTruthy();
    });
  });
});
