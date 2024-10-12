import { useEffect, useState } from "react"




const Pokemon = () => {


    
      const [pokemonList, setPokemonList] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchPokemon = async () => {
          try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const pokemonData = await Promise.all(
              data.results.map(async (poke) => {
                const pokeResponse = await fetch(poke.url);
                return await pokeResponse.json();
              })
            );
            setPokemonList(pokemonData);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPokemon();
      }, []);
    
      if (loading) {
        return <div>загрузка...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      return (
        <div>
          <h1>Pokémon List</h1>
          <ul >
            {pokemonList.map((poke) => (
              <li key={poke.id}>
                <img src={poke.sprites.front_default} alt={poke.name} style={{ width: '100px', height: '100px' }} />
                <div>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</div>
              </li>
            ))}
          </ul>
        </div>
      );  

}
 
export default Pokemon;