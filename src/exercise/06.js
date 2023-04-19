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

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemon(<div>Submit a pokemon</div>)
      return
    }

    setPokemon(<PokemonInfoFallback name={pokemonName} />)
    fetchPokemon(pokemonName)
      .then(data => {
        setPokemon(<PokemonDataView pokemon={data} />)
      })
      .catch(() => {
        setPokemon(<div>Error: Submit a pokemon</div>)
      })
  }, [pokemonName, setPokemon])

  return pokemon
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
