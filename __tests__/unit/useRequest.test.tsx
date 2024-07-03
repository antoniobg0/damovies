import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, renderHook, act } from '@testing-library/react';
import useRequest from '../../src/hooks/useRequest';

describe('useRequest', async () => {
  it('Loading should true and false after makeRequest usage', async () => {

    const { result } = renderHook(useRequest);

    act(() => {
      result.current.makeRequest({ method: 'get', url: 'discover/movie' });
    });

    expect(result.current.loading).toBe(true);
  

    waitFor(() => {
      expect(result.current.loading).toBe(false);
    })
  });
});
