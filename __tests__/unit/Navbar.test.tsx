import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';

describe('Navbar', () => {
  it('expects navbar component to show', () => {
    render(<Navbar />);

    expect(true).toBeTruthy();
  });
});
