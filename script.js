var input = document.getElementById("pokemonInput");

// Pokemon Credentials
var pokemonImg = document.getElementById("pokemonImage");
var pokemonId = document.getElementById("pokemonId");
var pokemonNameVar = document.getElementById("pokemonName");
var pokemonHeight = document.getElementById("pokemonHeight");
var pokemonWeight = document.getElementById("pokemonWeight");
var pokemonType = document.getElementById("pokemonType");
var pokemonAbility = document.getElementById("abilitiesList")

async function fetchPokemon(e) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + e.toLowerCase());
    const pokemonList = await response.json();
    console.log(pokemonList);
    // how to access obj values
    // console.log(pokemonList.sprites.front_default); // dot notation
    // console.log(pokemonList["sprites"]); // bracket notation

    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    let pokemonTypes = ""
    for (let i in pokemonList.types) {
        pokemonTypes += pokemonList.types[i].type.name + " "
        // y = x.charAt(0).toUpperCase() + x.slice(1) // Uppercase
        // console.log(titleCase(x))
        pokemonTypes = titleCase(pokemonTypes)
    }

    let pokemonAbilities = ""
    for (let i in pokemonList.abilities) {
        pokemonAbilities += "<li>" + titleCase(pokemonList.abilities[i].ability.name) + "</li> "
    }
    console.log(pokemonAbilities)

    let data = {
        imgURL: pokemonList.sprites.front_default,
        idNum: pokemonList.id,
        idName: pokemonList.name,
        idType: pokemonTypes,
        idHeight: pokemonList.height,
        idWeight: pokemonList.weight,
        idAbility: pokemonAbilities
    }
    return data
}

async function pokemonSearch() {
    let pokemonName = input.value;
    if (input.value == '') {
        // console.log("no pokemon search :(");
        alert("no search pokemon :(");
    }
    else {
        const data = await fetchPokemon(pokemonName)
        console.log(data)

        pokemonImg.src = data.imgURL
        pokemonId.innerHTML = "#" + data.idNum
        pokemonNameVar.innerHTML =  data.idName.charAt(0).toUpperCase() + data.idName.slice(1) // Uppercase
        
        pokemonHeight.innerHTML = "Height: " + Math.ceil((data.idHeight/3)*10)/10 + "ft"
        pokemonWeight.innerHTML = "Weight: " + data.idWeight + "lbs"

        pokemonType.innerHTML = "Type: " + data.idType
        pokemonAbility.innerHTML = data.idAbility
    }
}