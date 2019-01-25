const url = 'https://pokeapi.co/api/v2/pokemon/';

// fetch requests!

function fetchPokemon(query, callback) {
    fetch(url+query).then(function(data){ // call the fetch and use .then to catch the promise
        data.json().then((data) => { // call .json to parse the data to a usable format and catch that promise
            callback(data); // pass the data into your callback function
        });
    });
}

function fetchPokemon2(query) {
    return fetch(url+query).then(function(data){ // call the fetch and return a promise -> this is a promise to return something
        return data.json(); // return the promise from .json() -> this returns a promise that will be resolved later
    });
}

// ex1

brokenFetchExample(); // Data writes out of order with this function  :(

function brokenFetchExample() { 
    var root = document.getElementById('ex1'); // where to put the data in the document
    for(var i = 1; i <= 20; i++) { // lets just get the first 20 for our example
        fetchPokemon(i, (data) => { // call the fetch pokemon function with i (the query for fetch) and a callback for what to do with the data
            root.innerHTML += "<li>" + (data.id + ": " + data.name) + "</li>"; // this writes list elements to a list
            });
    }
}

// ex2

okayFetchExample();

async function okayFetchExample() { 
    var root = document.getElementById('ex2');  
    for(var i = 1; i <= 20; i++) {  
        var waitFor = await fetchPokemon2(i);  
        root.innerHTML += "<li>" + (waitFor.id + ": " + waitFor.name) + "</li>";
    }
}


// ex3

betterFetchExample();

function  betterFetchExample() {
    var root = document.getElementById('ex3');  
    var data = []; // javascript arrays pass by reference
    for(var i = 1; i <= 20; i++) {
        data.push(fetchPokemon2(i));
    }
    Promise.all(data).then((data) => {
        for(var i = 0; i < 20; i++) {
            contentWriter(data[i], root);
        }
    });
}

async function contentWriter(data, root) {
    var waitFor = await(data);
    var content = "<li>" + (waitFor.id + ": " + waitFor.name) + "</li>";
    root.innerHTML += content;
}
