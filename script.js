// ===== DATOS DE PELÍCULAS =====
const peliculas = [
    {
        id: 1,
        title: "El Padrino",
        description: "La historia de la familia Corleone, una dinastía mafiosa de Nueva York.",
        genre: "drama",
        year: "1972",
        rating: "9.2/10",
        duration: "2h 55m",
        videoUrl: "https://example.com/padrino.mp4",
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        downloadUrl: "https://example.com/padrino.mp4",
        director: "Francis Ford Coppola",
        actors: "Marlon Brando, Al Pacino, James Caan",
        language: "Inglés/Español",
        size: "2.1 GB",
        addedDate: "2024-01-15",
        views: 15000,
        downloads: 8500
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        description: "Los Vengadores se reúnen para revertir el chasquido de Thanos.",
        genre: "accion",
        year: "2019",
        rating: "8.4/10",
        duration: "3h 2m",
        videoUrl: "https://example.com/endgame.mp4",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        downloadUrl: "https://example.com/endgame.mp4",
        director: "Anthony y Joe Russo",
        actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
        language: "Inglés/Español",
        size: "2.8 GB",
        addedDate: "2024-02-20",
        views: 25000,
        downloads: 12000
    },
    {
        id: 3,
        title: "Interestelar",
        description: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.",
        genre: "ciencia-ficcion",
        year: "2014",
        rating: "8.6/10",
        duration: "2h 49m",
        videoUrl: "https://example.com/interstellar.mp4",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        downloadUrl: "https://example.com/interstellar.mp4",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        language: "Inglés/Español",
        size: "2.5 GB",
        addedDate: "2024-03-10",
        views: 18000,
        downloads: 9500
    },
    {
        id: 4,
        title: "Parásitos",
        description: "Una familia pobre se infiltra en el hogar de una familia rica.",
        genre: "drama",
        year: "2019",
        rating: "8.6/10",
        duration: "2h 12m",
        videoUrl: "https://example.com/parasitos.mp4",
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        downloadUrl: "https://example.com/parasitos.mp4",
        director: "Bong Joon-ho",
        actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        language: "Coreano/Español",
        size: "1.9 GB",
        addedDate: "2024-03-25",
        views: 12000,
        downloads: 6500
    },
    {
        id: 5,
        title: "John Wick 4",
        description: "John Wick descubre un camino para derrotar a la Alta Mesa.",
        genre: "accion",
        year: "2023",
        rating: "7.7/10",
        duration: "2h 49m",
        videoUrl: "https://example.com/johnwick4.mp4",
        poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        downloadUrl: "https://example.com/johnwick4.mp4",
        director: "Chad Stahelski",
        actors: "Keanu Reeves, Donnie Yen, Bill Skarsgård",
        language: "Inglés/Español",
        size: "2.3 GB",
        addedDate: "2024-04-05",
        views: 22000,
        downloads: 11000
    },
    {
        id: 6,
        title: "Dune: Parte Dos",
        description: "Paul Atreides se une a los Fremen para vengar a su familia.",
        genre: "ciencia-ficcion",
        year: "2024",
        rating: "8.8/10",
        duration: "2h 46m",
        videoUrl: "https://example.com/dune2.mp4",
        poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg",
        downloadUrl: "https://example.com/dune2.mp4",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        language: "Inglés/Español",
        size: "2.7 GB",
        addedDate: "2024-04-15",
        views: 30000,
        downloads: 15000
    },
    {
        id: 7,
        title: "La La Land",
        description: "Un pianista de jazz y una aspirante a actriz se enamoran en Los Ángeles.",
        genre: "musical",
        year: "2016",
        rating: "8.0/10",
        duration: "2h 8m",
        videoUrl: "https://example.com/lalaland.mp4",
        poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        downloadUrl: "https://example.com/lalaland.mp4",
        director: "Damien Chazelle",
        actors: "Ryan Gosling, Emma Stone, John Legend",
        language: "Inglés/Español",
        size: "2.0 GB",
        addedDate: "2024-02-28",
        views: 9500,
        downloads: 4800
    },
    {
        id: 8,
        title: "El Señor de los Anillos: El Retorno del Rey",
        description: "Gandalf y Aragorn lideran el mundo de los hombres contra Sauron.",
        genre: "fantasia",
        year: "2003",
        rating: "9.0/10",
        duration: "3h 21m",
        videoUrl: "https://example.com/lotr3.mp4",
        poster: "https://image.tmdb.org/t/p/w500/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg",
        downloadUrl: "https://example.com/lotr3.mp4",
        director: "Peter Jackson",
        actors: "Elijah Wood, Viggo Mortensen, Ian McKellen",
        language: "Inglés/Español",
        size: "3.1 GB",
        addedDate: "2024-01-10",
        views: 17500,
        downloads: 9200
    }
];

// ===== VARIABLES GLOBALES =====
let currentMovie = null;
let currentFilter = 'todas';
let currentSort = 'recientes';
let currentSection = 'inicio';
let visibleMovies = 8;
let downloadHistory = JSON.parse(localStorage.getItem('cineweb_downloads')) || [];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadFeaturedMovies();
    loadCatalog();
    loadRecentMovies();
    updateStats();
    loadDownloadHistory();
    setupEventListeners();
}

// ===== NAVEGACIÓN =====
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Ocultar vista de detalle si está visible
    document.getElementById('detallePelicula').classList.remove('active');
    
    // Mostrar la sección solicitada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.nav-btn[onclick*="${sectionId}"]`).classList.add('active');
    
    // Actualizar variable global
    currentSection = sectionId;
    
    // Ocultar sugerencias de búsqueda
    hideSuggestions();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== VISTA DE DETALLE =====
function showMovieDetail(movieId) {
    const movie = peliculas.find(m => m.id === movieId);
    if (!movie) return;
    
    currentMovie = movie;
    
    // Actualizar información en la vista de detalle
    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailGenre').textContent = movie.genre;
    document.getElementById('detailYear').textContent = movie.year;
    document.getElementById('detailRating').textContent = movie.rating;
    document.getElementById('detailDuration').textContent = movie.duration;
    document.getElementById('detailDescription').textContent = movie.description;
    document.getElementById('detailDirector').textContent = movie.director;
    document.getElementById('detailActors').textContent = movie.actors;
    document.getElementById('detailLanguage').textContent = movie.language;
    document.getElementById('detailSize').textContent = movie.size;
    
    // Configurar video
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.src = movie.videoUrl;
    
    // Ocultar todas las secciones y mostrar detalle
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('detallePelicula').classList.add('active');
    
    // Cargar sugerencias
    loadSuggestions(movie.genre, movie.id);
    
    // Actualizar estadísticas
    movie.views = (movie.views || 0) + 1;
    updateStats();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideMovieDetail() {
    document.getElementById('detallePelicula').classList.remove('active');
    showSection(currentSection);
    
    // Pausar video
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.pause();
}

function loadSuggestions(genre, excludeId) {
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    suggestionsGrid.innerHTML = '';
    
    // Obtener películas del mismo género (excluyendo la actual)
    const suggestions = peliculas
        .filter(movie => movie.genre === genre && movie.id !== excludeId)
        .slice(0, 4);
    
    // Si no hay suficientes, agregar películas populares
    if (suggestions.length < 4) {
        const popularMovies = peliculas
            .filter(movie => movie.id !== excludeId)
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 4 - suggestions.length);
        
        suggestions.push(...popularMovies);
    }
    
    // Mostrar sugerencias
    suggestions.forEach(movie => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'movie-card';
        suggestionElement.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster"
                 onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=${movie.title.replace(/\s+/g, '+')}'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rating">${movie.rating}</span>
                </div>
            </div>
        `;
        
        suggestionElement.addEventListener('click', () => showMovieDetail(movie.id));
        suggestionsGrid.appendChild(suggestionElement);
    });
}

// ===== CARGA DE PELÍCULAS =====
function loadFeaturedMovies() {
    const featuredGrid = document.getElementById('featuredGrid');
    const novedadesGrid = document.getElementById('novedadesGrid');
    
    // Películas destacadas (las más vistas)
    const featuredMovies = [...peliculas]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 4);
    
    // Películas más recientes
    const recentMovies = [...peliculas]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 6);
    
    // Cargar destacadas
    featuredGrid.innerHTML = '';
    featuredMovies.forEach(movie => {
        featuredGrid.appendChild(createMovieCard(movie));
    });
    
    // Cargar novedades
    novedadesGrid.innerHTML = '';
    recentMovies.forEach(movie => {
        novedadesGrid.appendChild(createMovieCard(movie));
    });
}

function loadCatalog() {
    const catalogGrid = document.getElementById('catalogGrid');
    catalogGrid.innerHTML = '';
    
    // Aplicar filtro
    let filteredMovies = applyFilter(peliculas, currentFilter);
    
    // Aplicar ordenamiento
    filteredMovies = applySort(filteredMovies, currentSort);
    
    // Mostrar películas visibles
    const moviesToShow = filteredMovies.slice(0, visibleMovies);
    
    moviesToShow.forEach(movie => {
        catalogGrid.appendChild(createMovieCard(movie));
    });
    
    // Actualizar contador
    updateMovieCount(filteredMovies.length);
    
    // Mostrar/ocultar botón "Cargar más"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.style.display = filteredMovies.length > visibleMovies ? 'flex' : 'none';
}

function loadRecentMovies() {
    const recentGrid = document.getElementById('recentGrid');
    recentGrid.innerHTML = '';
    
    // Ordenar por fecha de agregado (más recientes primero)
    const recentMovies = [...peliculas]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 12);
    
    recentMovies.forEach(movie => {
        recentGrid.appendChild(createMovieCard(movie));
    });
}

function loadMoreMovies() {
    visibleMovies += 8;
    loadCatalog();
}

// ===== FILTRADO Y ORDENAMIENTO =====
function filterMovies(filterType) {
    currentFilter = filterType;
    visibleMovies = 8;
    
    // Actualizar botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Recargar catálogo
    if (currentSection === 'catalogo') {
        loadCatalog();
    }
}

function applyFilter(movies, filterType) {
    if (filterType === 'todas') return movies;
    if (filterType === '2024') return movies.filter(m => m.year === '2024');
    return movies.filter(m => m.genre === filterType);
}

function sortMovies() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    loadCatalog();
}

function applySort(movies, sortType) {
    const sorted = [...movies];
    
    switch(sortType) {
        case 'recientes':
            return sorted.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        case 'antiguas':
            return sorted.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
        case 'rating':
            return sorted.sort((a, b) => {
                const ratingA = parseFloat(a.rating);
                const ratingB = parseFloat(b.rating);
                return ratingB - ratingA;
            });
        case 'nombre':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted;
    }
}

function filterRecent(timeRange) {
    // Actualizar botones de tiempo
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // En una implementación real, aquí filtrarías por fecha
    // Por ahora, solo recargamos las recientes
    loadRecentMovies();
}

// ===== BÚSQUEDA =====
function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Filtrar películas que coincidan
    const results = peliculas.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.includes(query) ||
        movie.director.toLowerCase().includes(query)
    ).slice(0, 8);
    
    // Mostrar sugerencias
    showSearchSuggestions(results, query);
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length === 0) return;
    
    // Mostrar sección de catálogo con resultados
    showSection('catalogo');
    
    // Filtrar películas
    const results = peliculas.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.includes(query)
    );
    
    // Mostrar resultados en el catálogo
    const catalogGrid = document.getElementById('catalogGrid');
    catalogGrid.innerHTML = '';
    
    if (results.length === 0) {
        catalogGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1">
                <i class="fas fa-search fa-3x"></i>
                <h3>No se encontraron películas</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
    } else {
        results.forEach(movie => {
            catalogGrid.appendChild(createMovieCard(movie));
        });
    }
    
    // Actualizar contador
    updateMovieCount(results.length);
    
    // Ocultar sugerencias
    hideSuggestions();
    
    // Limpiar búsqueda
    searchInput.value = '';
}

function showSearchSuggestions(results, query) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    suggestionsContainer.innerHTML = '';
    
    if (results.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="suggestion-item">
                <i class="fas fa-search"></i>
                No se encontraron resultados para "${query}"
            </div>
        `;
    } else {
        results.forEach(movie => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${movie.poster}" alt="${movie.title}" 
                         style="width: 40px; height: 60px; object-fit: cover; border-radius: 4px;"
                         onerror="this.src='https://via.placeholder.com/40x60/333/fff?text=+'">
                    <div>
                        <strong>${highlightText(movie.title, query)}</strong>
                        <div style="font-size: 0.8rem; color: #999;">
                            ${movie.year} • ${movie.genre}
                        </div>
                    </div>
                </div>
            `;
            
            suggestionItem.addEventListener('click', () => {
                showMovieDetail(movie.id);
                hideSuggestions();
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
    
    suggestionsContainer.classList.add('active');
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function showSuggestions() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.length > 0) {
        searchMovies();
    }
}

function hideSuggestions() {
    document.getElementById('searchSuggestions').classList.remove('active');
}

// ===== DESCARGA DE PELÍCULAS =====
function downloadCurrentMovie() {
    if (!currentMovie) return;
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = currentMovie.downloadUrl;
    link.download = `${currentMovie.title.replace(/\s+/g, '_')}.mp4`;
    
    // Simular clic para iniciar descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Registrar en historial
    addToDownloadHistory(currentMovie);
    
    // Actualizar estadísticas
    currentMovie.downloads = (currentMovie.downloads || 0) + 1;
    updateStats();
    
    // Mostrar notificación
    showNotification(`Descargando: ${currentMovie.title}`);
}

function addToDownloadHistory(movie) {
    const downloadItem = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        date: new Date().toISOString(),
        size: movie.size
    };
    
    // Agregar al inicio del historial
    downloadHistory.unshift(downloadItem);
    
    // Limitar a 50 items
    downloadHistory = downloadHistory.slice(0, 50);
    
    // Guardar en localStorage
    localStorage.setItem('cineweb_downloads', JSON.stringify(downloadHistory));
    
    // Actualizar vista
    loadDownloadHistory();
}

function loadDownloadHistory() {
    const downloadsList = document.getElementById('downloadsList');
    
    if (downloadHistory.length === 0) {
        downloadsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-download fa-3x"></i>
                <h3>No hay descargas recientes</h3>
                <p>Las películas que descargues aparecerán aquí</p>
            </div>
        `;
        return;
    }
    
    downloadsList.innerHTML = '';
    
    downloadHistory.forEach(item => {
        const movie = peliculas.find(m => m.id === item.id);
        const downloadItem = document.createElement('div');
        downloadItem.className = 'download-item';
        
        downloadItem.innerHTML = `
            <img src="${movie?.poster || item.poster}" 
                 alt="${item.title}"
                 onerror="this.src='https://via.placeholder.com/80x120/333/fff?text=+'">
            <div class="download-info">
                <h4>${item.title}</h4>
                <small>${new Date(item.date).toLocaleDateString()} • ${item.size}</small>
            </div>
            <span class="download-status">Completado</span>
        `;
        
        downloadItem.addEventListener('click', () => {
            if (movie) showMovieDetail(movie.id);
        });
        
        downloadsList.appendChild(downloadItem);
    });
}

function clearDownloads() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial de descargas?')) {
        downloadHistory = [];
        localStorage.removeItem('cineweb_downloads');
        loadDownloadHistory();
        showNotification('Historial de descargas limpiado');
    }
}

// ===== REPRODUCTOR =====
function togglePlay() {
    const videoPlayer = document.getElementById('moviePlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function toggleFullscreen() {
    const videoPlayer = document.getElementById('moviePlayer');
    
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            console.log(`Error al intentar entrar en pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function changeQuality() {
    // En una implementación real, cambiaría la calidad del video
    showNotification('Cambiando calidad a 720p');
}

// ===== FUNCIONES AUXILIARES =====
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    // Verificar si es reciente (últimos 30 días)
    const isRecent = isMovieRecent(movie.addedDate);
    
    card.innerHTML = `
        ${isRecent ? '<span class="movie-badge">NUEVO</span>' : ''}
        <img src="${movie.poster}" 
             alt="${movie.title}" 
             class="movie-poster"
             onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}'">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-rating">${movie.rating}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showMovieDetail(movie.id));
    return card;
}

function isMovieRecent(dateString) {
    const addedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - addedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

function updateStats() {
    // Actualizar estadísticas en la sección de inicio
    document.getElementById('totalMovies').textContent = peliculas.length;
    
    const totalDownloads = peliculas.reduce((sum, movie) => sum + (movie.downloads || 0), 0);
    document.getElementById('totalDownloads').textContent = formatNumber(totalDownloads);
    
    const totalViews = peliculas.reduce((sum, movie) => sum + (movie.views || 0), 0);
    document.getElementById('activeUsers').textContent = formatNumber(Math.floor(totalViews / 100));
}

function updateMovieCount(count) {
    document.getElementById('movieCount').textContent = `${count} películas`;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function showNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== MODAL DE INFORMACIÓN =====
function showInfoModal(type) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');
    
    let title = '';
    let content = '';
    
    switch(type) {
        case 'ayuda':
            title = 'Ayuda y Soporte';
            content = `
                <h2>¿Necesitas ayuda?</h2>
                <p><strong>Para ver una película:</strong></p>
                <ol>
                    <li>Haz clic en cualquier película del catálogo</li>
                    <li>Usa los controles del reproductor para pausar, ajustar volumen, etc.</li>
                    <li>Haz clic en el botón de pantalla completa para mejor experiencia</li>
                </ol>
                <p><strong>Para descargar:</strong></p>
                <ol>
                    <li>Selecciona una película</li>
                    <li>Haz clic en el botón "Descargar" en la vista de detalle</li>
                    <li>La descarga comenzará automáticamente</li>
                </ol>
                <p><strong>Controles de teclado:</strong></p>
                <ul>
                    <li>Espacio: Play/Pausa</li>
                    <li>F: Pantalla completa</li>
                    <li>M: Silenciar</li>
                    <li>Flechas: Navegar en el video</li>
                </ul>
            `;
            break;
            
        case 'contacto':
            title = 'Contacto';
            content = `
                <h2>Contacta con Nosotros</h2>
                <p><strong>Email:</strong> soporte@cineweb.com</p>
                <p><strong>GitHub:</strong> github.com/tuusuario/cineweb</p>
                <p><strong>Issues:</strong> Reporta problemas en GitHub Issues</p>
                <p><strong>Sugerencias:</strong> ¡Nos encanta escuchar tus ideas!</p>
            `;
            break;
            
        case 'faq':
            title = 'Preguntas Frecuentes';
            content = `
                <h2>FAQ</h2>
                <div class="faq-item">
                    <h3>¿Es gratuito?</h3>
                    <p>Sí, CineWeb es completamente gratuito y de código abierto.</p>
                </div>
                <div class="faq-item">
                    <h3>¿Necesito registrarme?</h3>
                    <p>No, no necesitas cuenta para ver o descargar películas.</p>
                </div>
                <div class="faq-item">
                    <h3>¿Puedo usar en móvil?</h3>
                    <p>Sí, la web es totalmente responsive y funciona en cualquier dispositivo.</p>
                </div>
                <div class="faq-item">
                    <h3>¿Las películas tienen virus?</h3>
                    <p>No, todos los archivos son verificados antes de ser publicados.</p>
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 1.5rem; color: var(--primary);">${title}</h2>
        <div style="line-height: 1.8;">${content}</div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('infoModal').classList.remove('active');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Cerrar modal al hacer clic fuera
    document.getElementById('infoModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('infoModal')) {
            closeModal();
        }
    });
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
    
    // Escuchar cambios en el control de volumen
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        document.getElementById('moviePlayer').volume = e.target.value;
    });
    
    // Cerrar vista de detalle con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const detailSection = document.getElementById('detallePelicula');
            if (detailSection.classList.contains('active')) {
                hideMovieDetail();
            }
        }
    });
    
    // Manejar teclas en el campo de búsqueda
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ===== FUNCIONES EXTRA =====
function addToFavorites() {
    if (!currentMovie) return;
    showNotification(`"${currentMovie.title}" agregada a favoritos`);
}

function shareMovie() {
    if (!currentMovie) return;
    
    if (navigator.share) {
        navigator.share({
            title: currentMovie.title,
            text: `Mira "${currentMovie.title}" en CineWeb`,
            url: window.location.href,
        });
    } else {
        // Copiar al portapapeles
        navigator.clipboard.writeText(`${window.location.origin}?movie=${currentMovie.id}`);
        showNotification('Enlace copiado al portapapeles');
    }
}

function loadInitialMovies() {
    // Esta función se llama al cargar la página
    showSection('inicio');
}

// ===== ESTILOS DINÁMICOS =====
// Agregar estilos CSS dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    mark {
        background-color: var(--primary);
        color: white;
        padding: 2px 4px;
        border-radius: 4px;
    }
    
    .faq-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--gray-light);
    }
    
    .faq-item h3 {
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(dynamicStyles);
