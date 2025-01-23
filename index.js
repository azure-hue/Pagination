async function getPokemonSprites(page) {
    const container = document.querySelector('.container');
    const apiBaseURL = 'https://pokeapi.co/api/v2/pokemon/';
    const logo = document.getElementsByClassName('logo')[0];

    logo.style.display = 'none';

    const limit = 20;
    const offset = (page - 1) * limit;
    clearImages();
    try {
      // Fetch a list of Pokémon up to the specified limit
      const response = await fetch(`${apiBaseURL}?limit=${limit}&offset=${offset}`);
      const data = await response.json();



      // Loop through each Pokémon in the results
      for (const pokemon of data.results) {
        const pokemonDetails = await fetch(pokemon.url).then(res => res.json());

        // Create an image tag for the sprite
        const img = document.createElement('img');
        img.src = pokemonDetails.sprites.front_default;
        img.alt = pokemonDetails.name;
        img.title = pokemonDetails.name; // Set the title as the Pokémon's name

        img.onclick = e => {
            alert(e.target.title)
        }

        // Append the image to the container
        container.appendChild(img);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  function clearImages() {
    const container = document.querySelector('.container');
    while (container.firstChild) {
      container.removeChild(container.firstChild); // Remove each child node
    }
  }





