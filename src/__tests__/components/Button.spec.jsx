import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../../components/Button';

const props = { children: '' };

describe('Button component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Button {...props} />, div);
  });
});
