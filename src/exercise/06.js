// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle', pokemon: null})
  const {status, pokemon} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      data => setState({status: 'resolved', pokemon: data}),
      error => setState({status: 'rejected'}),
    )
  }, [pokemonName, setState])

  if (status === 'pending') {
    return <PokemonInfoFallback pokemon={pokemon} />
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  if (status === 'rejected') {
    return (
      <>
        <h2>Error:</h2>
        <label>
          No pokemon with the name {pokemonName} was found, please submit again.
        </label>
      </>
    )
  }

  return <div>Submit a Pokemon</div>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
