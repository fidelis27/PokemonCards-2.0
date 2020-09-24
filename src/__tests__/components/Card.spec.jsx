import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import React from 'react';
import Card from '../../components/Card';

const pokemon = {
  id: 2,
  weight: 10,
  height: 10,
  name: 'BULBASAUR',
  types: [{ type: { name: 'poison' } }],
  abilities: [{ ability: { name: 'Overgrow' } }],
};

describe('should render Card pokemon', () => {
  const wrapper = shallow(<Card pokemon={pokemon} />);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card pokemon={pokemon} />, div);
  });
  /* it('should found pokemon name', () => {
    const expected = 'BULBASAUR';

    expect(
      wrapper
        .find('#name')
        .first()
        .text()
    ).toEqual(expected);
  });

  it('should found pokemon type', () => {
    expect(wrapper.contains('poison')).toBe(true);
  });
  it('should found pokemon Ability', () => {
    expect(wrapper.contains('Overgrow')).toBe(true);
  }); */
});
