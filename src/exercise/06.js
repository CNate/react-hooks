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
  const [pokemon, setPokemon] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setStatus('pending')
    fetchPokemon(pokemonName).then(
      data => {
        setPokemon(data)
        setStatus('resolved')
      },
      error => {
        setStatus('rejected')
        setPokemon(null)
      },
    )
  }, [pokemonName, setPokemon])

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
