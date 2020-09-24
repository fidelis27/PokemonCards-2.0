import React from 'react';
import styled from 'styled-components';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import ReactDOM from 'react-dom';
import { api, getAllPokemon } from '../../services/api';

import Home from '../../pages/Home';

export const Container = styled.div``;

jest.dontMock('../../pages/Home');

const apiMock = new MockAdapter(api);

describe('Render Home page', () => {
  const wrapper = shallow(<Home />);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
  });

  it('should be call api', () => {
    const apiResponse = {
      count: 1050,
      Next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
      ],
    };

    apiMock.onGet().reply(200, apiResponse);
  });

  it('contains spec with a div container', () => {
    const actual = wrapper
      .find('#container')
      .first()
      .exists();

    expect(actual).toBe(true);
  });

  it('contains spec with a simule click button', () => {
    wrapper
      .find('#next')
      .first()
      .simulate('click');
  });
});
