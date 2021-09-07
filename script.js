const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const main = document.getElementById('main')
const form = document.getElementById('form')
const buscar = document.getElementById('search')

pegarFilmes(API_URL)


const mostrarFilmes = (filmes) => {
    main.innerHTML = ''

    filmes.forEach((filme) => {
        const { title, poster_path, vote_average, overview} = filme

        const filmeElement = document.createElement('div')
        filmeElement.classList.add('movie')

        filmeElement.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${mudarCorDaNotaDoFilme(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>${title}</h3>
          ${overview}
        </div>
      `

      main.appendChild(filmeElement)
    })
}



const mudarCorDaNotaDoFilme = (nota) => {
    if(nota >= 8) {
        return 'green'
    } else if (nota >= 5) {
        return 'yellow'
    } else {
        return 'red'
    }
}

async function pegarFilmes(url) {
    const resposta = await fetch(url)
    const data = await resposta.json()

    mostrarFilmes(data.results);
    console.log(data.results);
}


form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const buscarFilme = buscar.value

    if(buscarFilme !== '') {
        pegarFilmes(SEARCH_API + buscarFilme)

        buscar.value = ''
    } else {
        window.location.reload()
    }
})

