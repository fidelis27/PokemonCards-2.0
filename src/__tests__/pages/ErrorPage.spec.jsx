import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../../pages/ErrorPage';

describe('ErrorPage page', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ErrorPage />);
    const { getByText } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(getByText('ERROR 404 Page not found!')).toBeTruthy();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toEqual('ERROR 404 Page not found!');
  });
});
