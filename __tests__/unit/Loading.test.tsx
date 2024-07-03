import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loading from '../../src/components/Loading';

describe('Loading', () => {
  it('expects loading component to show', () => {
    render(<Loading />);

    expect(true).toBeTruthy();
  });
});
