// Base de datos de películas (ejemplo inicial)
let movies = [
    {
        id: 1,
        title: "Five nights At Freddy's 2",
        description: "Epic crime drama about the Corleone crime family.",
        genre: "drama",
        year: "1972",
        rating: "9.2/10",
        duration: "2h 55m",
        videoUrl: "https://ejemplo.com/padrino.mp4",
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        downloadUrl: "https://ejemplo.com/padrino.mp4",
        featured: true,
        addedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        description: "Los Vengadores se reúnen para revertir el chasquido de Thanos.",
        genre: "accion",
        year: "2019",
        rating: "8.4/10",
        duration: "3h 2m",
        videoUrl: "https://ejemplo.com/endgame.mp4",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        downloadUrl: "https://ejemplo.com/endgame.mp4",
        featured: true,
        addedDate: "2024-02-20"
    },
    {
        id: 3,
        title: "Interestelar",
        description: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.",
        genre: "ciencia-ficcion",
        year: "2014",
        rating: "8.6/10",
        duration: "2h 49m",
        videoUrl: "https://ejemplo.com/interstellar.mp4",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        downloadUrl: "https://ejemplo.com/interstellar.mp4",
        featured: true,
        addedDate: "2024-03-10"
    },
    // ... puedes agregar más películas aquí
];

// Estado global
let currentState = {
    currentSection: 'inicio',
    currentFilter: 'all',
    currentSort: 'recientes',
    currentTimeFilter: '7d',
    displayedMovies: 6,
    currentMovie: null,
    searchQuery: ''
};

// Elementos DOM
const catalogScreen = document.getElementById('catalogScreen');
const detailScreen = document.getElementById('detailScreen');
const backToCatalogBtn = document.getElementById('backToCatalog');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const timeButtons = document.querySelectorAll('.time-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const featuredGrid = document.getElementById('featuredMovies');
const catalogGrid = document.getElementById('catalogGrid');
const recentGrid = document.getElementById('recentMovies');

// Elementos del reproductor
const videoPlayer = document.getElementById('moviePlayer');
const videoSource = document.getElementById('videoSource');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const smallScreenBtn = document.getElementById('smallScreenBtn');
const downloadBtn = document.getElementById('downloadBtn');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Elementos de detalles
const detailTitle = document.getElementById('detailTitle');
const detailDescription = document.getElementById('detailDescription');
const detailGenre = document.getElementById('detailGenre');
const detailYear = document.getElementById('detailYear');
const detailRating = document.getElementById('detailRating');
const detailDuration = document.getElementById('detailDuration');
const suggestionsGrid = document.getElementById('suggestionsGrid');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    loadInitialData();
});

function initApp() {
    // Cargar películas desde localStorage si existen
    const savedMovies = localStorage.getItem('cinebot-movies');
    if (savedMovies) {
        movies = JSON.parse(savedMovies);
    }
    
    // Actualizar estadísticas
    updateStats();
}

function setupEventListeners() {
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchSection(target);
        });
    });
    
    // Volver al catálogo
    backToCatalogBtn.addEventListener('click', () => {
        showCatalogScreen();
    });
    
    // Búsqueda
    searchInput.addEventListener('input', handleSearchInput);
    searchBtn.addEventListener('click', performSearch);
    
    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentState.currentFilter = btn.getAttribute('data-filter');
            renderCatalog();
        });
    });
    
    // Ordenación
    sortSelect.addEventListener('change', () => {
        currentState.currentSort = sortSelect.value;
        renderCatalog();
    });
    
    // Filtros de tiempo
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentState.currentTimeFilter = btn.getAttribute('data-time');
            renderRecent();
        });
    });
    
    // Cargar más películas
    loadMoreBtn.addEventListener('click', loadMoreMovies);
    
    // Controles del reproductor
    playBtn.addEventListener('click', () => videoPlayer.play());
    pauseBtn.addEventListener('click', () => videoPlayer.pause());
    volumeSlider.addEventListener('input', () => {
        videoPlayer.volume = volumeSlider.value;
    });
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    smallScreenBtn.addEventListener('click', exitFullscreen);
    downloadBtn.addEventListener('click', downloadCurrentMovie);
    
    // Actualizar tiempo del video
    videoPlayer.addEventListener('timeupdate', updateTimeDisplay);
    videoPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(videoPlayer.duration);
    });
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
}

function loadInitialData() {
    renderFeatured();
    renderCatalog();
    renderRecent();
    updateStats();
}

function switchSection(section) {
    // Actualizar navegación
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === section);
    });
    
    // Actualizar secciones
    document.querySelectorAll('.catalog-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === section);
    });
    
    currentState.currentSection = section;
    
    // Mostrar pantalla de catálogo
    showCatalogScreen();
}

function showCatalogScreen() {
    catalogScreen.style.display = 'block';
    detailScreen.style.display = 'none';
    backToCatalogBtn.style.display = 'none';
    
    // Restaurar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.display = 'flex';
    });
}

function showDetailScreen() {
    catalogScreen.style.display = 'none';
    detailScreen.style.display = 'block';
    backToCatalogBtn.style.display = 'flex';
    
    // Ocultar enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.display = 'none';
    });
}

function handleSearchInput() {
    const query = searchInput.value.toLowerCase().trim();
    currentState.searchQuery = query;
    
    if (query.length === 0) {
        searchSuggestions.style.display = 'none';
        return;
    }
    
    // Filtrar películas para sugerencias
    const suggestions = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.includes(query)
    ).slice(0, 5);
    
    // Mostrar sugerencias
    if (suggestions.length > 0) {
        searchSuggestions.innerHTML = suggestions.map(movie => `
            <div class="search-suggestion-item" data-movie-id="${movie.id}">
                <strong>${movie.title}</strong> (${movie.year})
                <br><small>${movie.genre} • ${movie.rating}</small>
            </div>
        `).join('');
        
        // Agregar event listeners a las sugerencias
        document.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const movieId = parseInt(item.getAttribute('data-movie-id'));
                const movie = movies.find(m => m.id === movieId);
                if (movie) {
                    showMovieDetail(movie);
                }
            });
        });
        
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length === 0) {
        // Si no hay query, mostrar todas
        currentState.currentFilter = 'all';
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
        });
        renderCatalog();
        return;
    }
    
    // Cambiar a sección de catálogo
    switchSection('catalogo');
    
    // Filtrar películas
    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.includes(query) ||
        movie.rating.includes(query)
    );
    
    renderCatalog(filtered);
    searchSuggestions.style.display = 'none';
}

function renderFeatured() {
    const featured = movies.filter(movie => movie.featured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(movie => createMovieCard(movie)).join('');
    
    // Agregar event listeners
    document.querySelectorAll('#featuredMovies .movie-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            showMovieDetail(featured[index]);
        });
    });
}

function renderCatalog(filteredMovies = null) {
    let moviesToShow = filteredMovies || movies;
    
    // Aplicar filtro
    if (currentState.currentFilter !== 'all') {
        moviesToShow = moviesToShow.filter(movie => movie.genre === currentState.currentFilter);
    }
    
    // Aplicar ordenación
    moviesToShow = sortMovies(moviesToShow, currentState.currentSort);
    
    // Mostrar solo las primeras N películas
    const moviesToDisplay = moviesToShow.slice(0, currentState.displayedMovies);
    
    catalogGrid.innerHTML = moviesToDisplay.map(movie => createMovieCard(movie)).join('');
    
    // Mostrar/ocultar botón de cargar más
    loadMoreBtn.style.display = moviesToShow.length > currentState.displayedMovies ? 'block' : 'none';
    
    // Agregar event listeners
    document.querySelectorAll('#catalogGrid .movie-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            showMovieDetail(moviesToDisplay[index]);
        });
    });
}

function renderRecent() {
    let recentMovies = [...movies];
    
    // Filtrar por tiempo
    const now = new Date();
    const timeFilter = currentState.currentTimeFilter;
    
    if (timeFilter === '7d') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        recentMovies = recentMovies.filter(movie => new Date(movie.addedDate) >= weekAgo);
    } else if (timeFilter === '30d') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        recentMovies = recentMovies.filter(movie => new Date(movie.addedDate) >= monthAgo);
    } else if (timeFilter === '90d') {
        const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        recentMovies = recentMovies.filter(movie => new Date(movie.addedDate) >= threeMonthsAgo);
    }
    
    // Ordenar por fecha de adición (más recientes primero)
    recentMovies.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    
    recentGrid.innerHTML = recentMovies.slice(0, 12).map(movie => createMovieCard(movie)).join('');
    
    // Agregar event listeners
    document.querySelectorAll('#recentMovies .movie-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            showMovieDetail(recentMovies[index]);
        });
    });
}

function createMovieCard(movie) {
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/300x450/2a2a2a/eeeeee?text=${encodeURIComponent(movie.title)}'">
            <div class="movie-card-content">
                <h3>${movie.title}</h3>
                <p>${movie.description.substring(0, 100)}...</p>
                <div class="movie-card-footer">
                    <span>${movie.year}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        </div>
    `;
}

function showMovieDetail(movie) {
    currentState.currentMovie = movie;
    
    // Actualizar detalles
    detailTitle.textContent = movie.title;
    detailDescription.textContent = movie.description;
    detailGenre.textContent = movie.genre;
    detailYear.textContent = movie.year;
    detailRating.textContent = movie.rating;
    detailDuration.textContent = movie.duration;
    
    // Configurar video
    videoSource.src = movie.videoUrl;
    videoPlayer.load();
    
    // Configurar botón de descarga
    downloadBtn.onclick = () => downloadMovie(movie);
    
    // Mostrar sugerencias (películas del mismo género)
    renderSuggestions(movie);
    
    // Cambiar a pantalla de detalle
    showDetailScreen();
}

function renderSuggestions(currentMovie) {
    // Obtener películas del mismo género (excluyendo la actual)
    const suggestions = movies
        .filter(movie => 
            movie.id !== currentMovie.id && 
            movie.genre === currentMovie.genre
        )
        .slice(0, 6);
    
    // Si no hay suficientes del mismo género, agregar aleatorias
    if (suggestions.length < 6) {
        const randomMovies = movies
            .filter(movie => 
                movie.id !== currentMovie.id && 
                !suggestions.some(s => s.id === movie.id)
            )
            .slice(0, 6 - suggestions.length);
        suggestions.push(...randomMovies);
    }
    
    suggestionsGrid.innerHTML = suggestions.map(movie => `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/200x300/2a2a2a/eeeeee?text=${encodeURIComponent(movie.title)}'">
            <div class="movie-card-content">
                <h4>${movie.title}</h4>
                <div class="movie-card-footer">
                    <span>${movie.year}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a las sugerencias
    document.querySelectorAll('#suggestionsGrid .movie-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            showMovieDetail(suggestions[index]);
        });
    });
}

function sortMovies(moviesArray, sortBy) {
    const sorted = [...moviesArray];
    
    switch(sortBy) {
        case 'recientes':
            sorted.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
            break;
        case 'viejas':
            sorted.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
            break;
        case 'rating':
            sorted.sort((a, b) => {
                const ratingA = parseFloat(a.rating.split('/')[0]);
                const ratingB = parseFloat(b.rating.split('/')[0]);
                return ratingB - ratingA;
            });
            break;
        case 'nombre':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    return sorted;
}

function loadMoreMovies() {
    currentState.displayedMovies += 6;
    renderCatalog();
}

function updateStats() {
    document.getElementById('totalMovies').textContent = movies.length;
    
    // Simular estadísticas (en un proyecto real, estos vendrían de una base de datos)
    const totalDownloads = Math.floor(movies.length * 150);
    const activeUsers = Math.floor(movies.length * 25);
    
    document.getElementById('totalDownloads').textContent = `${totalDownloads}+`;
    document.getElementById('activeUsers').textContent = `${activeUsers}+`;
}

function downloadMovie(movie) {
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = movie.downloadUrl;
    link.download = `${movie.title.replace(/\s+/g, '_')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Registrar descarga (en un proyecto real, enviarías esto a un servidor)
    console.log(`Descargando: ${movie.title}`);
    
    // Mostrar notificación (opcional)
    alert(`Iniciando descarga de "${movie.title}"`);
}

function downloadCurrentMovie() {
    if (currentState.currentMovie) {
        downloadMovie(currentState.currentMovie);
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
    currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
}

// Funciones para agregar películas (desde consola o interfaz)
function addMovie(newMovie) {
    // Asignar ID único
    newMovie.id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    
    // Agregar fecha si no existe
    if (!newMovie.addedDate) {
        newMovie.addedDate = new Date().toISOString().split('T')[0];
    }
    
    movies.push(newMovie);
    
    // Guardar en localStorage
    localStorage.setItem('cinebot-movies', JSON.stringify(movies));
    
    // Actualizar la interfaz
    renderFeatured();
    renderCatalog();
    renderRecent();
    updateStats();
    
    return newMovie;
}

// Ejemplo de cómo agregar una película desde la consola del navegador:
/*
addMovie({
    title: "Nueva Película",
    description: "Descripción de la nueva película.",
    genre: "accion",
    year: "2024",
    rating: "7.5/10",
    duration: "2h 15m",
    videoUrl: "https://ejemplo.com/nueva.mp4",
    poster: "https://image.tmdb.org/t/p/w500/ejemplo.jpg",
    downloadUrl: "https://ejemplo.com/nueva.mp4",
    featured: false
});
*/

// Función para cargar películas desde un archivo JSON (si decides usar peliculas.json)
async function loadMoviesFromJSON() {
    try {
        const response = await fetch('peliculas.json');
        const data = await response.json();
        movies = data.peliculas;
        localStorage.setItem('cinebot-movies', JSON.stringify(movies));
        loadInitialData();
    } catch (error) {
        console.error('Error cargando películas:', error);
    }
}

// Para cargar desde JSON al inicio, descomenta la siguiente línea:
// loadMoviesFromJSON();
