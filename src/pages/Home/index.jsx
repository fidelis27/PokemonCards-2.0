import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronUp, FaChevronDown, FaSpinner } from 'react-icons/fa';
import Card from '../../components/Card';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import { getAllPokemon, getPokemon, getByTypes } from '../../services/api';

import {
  Container,
  Content,
  List,
  ButtonTop,
  ButtonsPagination,
  Loading,
} from './styles';

function App() {
  const [pokemonData, setPolkemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [_scroll, setScroll] = useState(false);

  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  function handleScrollTop() {
    if (_scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setScroll(false);
    } else {
      window.scrollTo({ top: 2500, behavior: 'auto' });
      setScroll(true);
    }
  }
  const loadByTypes = useCallback(async type => {
    const response = await getByTypes('grass');

    const url = 'https://pokeapi.co/api/v2/pokemon/';

    const pokemonsByType = await Promise.all(
      response.data.map(async t => {
        const pokemon = await getPokemon(`${url}${t.name}`);
        return pokemon;
      })
    );

    setPolkemonData(pokemonsByType);
  }, []);

  const loadingPokemon = useCallback(
    async data => {
      const _pokemonData = await Promise.all(
        data.map(async pokemon => {
          const pokemonRecord = await getPokemon(pokemon.url);
          return pokemonRecord;
        })
      );

      setPolkemonData(_pokemonData);
    },

    []
  );
  const next = useCallback(async () => {
    setLoading(true);
    const data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }, [loadingPokemon, nextUrl]);

  const prev = useCallback(async () => {
    if (!prevUrl) return;
    setLoading(true);
    const data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }, [loadingPokemon, prevUrl]);

  useEffect(() => {
    async function loadData() {
      const response = await getAllPokemon(initialURL);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);

      setLoading(false);
    }
    loadData();
  }, [loadingPokemon]);

  return (
    <Container id="container" data-testid="container">
      <NavBar />
      <Button type="button" onClick={() => loadByTypes()}>
        teste
      </Button>

      <Content>
        <ButtonsPagination>
          <Button id="previous" onClick={prev}>
            Previous
          </Button>
          <Button id="next" onClick={next}>
            Next
          </Button>
        </ButtonsPagination>
        <ButtonTop
          id="scroll"
          /*  scroll={_scroll} */
          onClick={() => handleScrollTop()}
        >
          {_scroll ? (
            <FaChevronUp id="icon" size={25} />
          ) : (
            <FaChevronDown id="icon" size={25} />
          )}
        </ButtonTop>
        {loading ? (
          <Loading>
            <FaSpinner color="#ff4236" size={50} />
            <h1>Loading...</h1>
          </Loading>
        ) : (
          <>
            <List>
              {pokemonData &&
                pokemonData.length > 0 &&
                pokemonData.map(pokemon => {
                  return (
                    <Card key={`pokemon-${pokemon.name}`} pokemon={pokemon} />
                  );
                })}
            </List>
          </>
        )}
        <ButtonsPagination>
          <Button onClick={prev}>Previous</Button>
          <Button onClick={next}>Next</Button>
        </ButtonsPagination>
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
