// ===== DATOS DE PELÍCULAS =====
let moviesData = [
    {
        id: 1,
        title: "Dunes Parte Dos",
        description: "Para liberdades de unas a los frontera para vengar si se tramita.",
        year: 2024,
        rating: 8.7,
        genre: ["ciencia-ficcion", "aventura"],
        duration: "2h 46m",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        language: "Español/Inglés",
        size: "2.5 GB",
        isFeatured: true,
        isNew: true,
        addedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "John Wick 4",
        description: "John Wick descubra un camino para detenerse a Julia Mega.",
        year: 2023,
        rating: 8.2,
        genre: ["accion", "suspenso"],
        duration: "2h 49m",
        director: "Chad Stahelski",
        actors: "Keanu Reeves, Donnie Yen, Bill Skarsgård",
        language: "Español/Inglés",
        size: "2.3 GB",
        isFeatured: true,
        isNew: false,
        addedDate: "2023-11-20"
    },
    {
        id: 3,
        title: "Paráxicos",
        description: "Una familia pobre es difícil en el hogar de una familia fea.",
        year: 2023,
        rating: 7.5,
        genre: ["drama", "suspenso"],
        duration: "1h 58m",
        director: "Desconocido",
        actors: "Actores Varios",
        language: "Español",
        size: "1.8 GB",
        isFeatured: false,
        isNew: true,
        addedDate: "2024-01-10"
    },
    {
        id: 4,
        title: "Intertextolar",
        description: "Un grupo de exploradores siga a través de un equipo de guantes en el espacio.",
        year: 2023,
        rating: 8.9,
        genre: ["ciencia-ficcion", "aventura"],
        duration: "2h 49m",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway",
        language: "Español/Inglés",
        size: "3.1 GB",
        isFeatured: true,
        isNew: false,
        addedDate: "2023-10-05"
    },
    {
        id: 5,
        title: "LA LA LAND",
        description: "Un pintado de jazz y una superstar a aceite se ensinaron en Los Ángeles.",
        year: 2016,
        rating: 8.0,
        genre: ["romance", "musical", "drama"],
        duration: "2h 8m",
        director: "Damien Chazelle",
        actors: "Ryan Gosling, Emma Stone",
        language: "Español/Inglés",
        size: "2.0 GB",
        isFeatured: false,
        isNew: false,
        addedDate: "2023-09-15"
    },
    {
        id: 6,
        title: "Avengers: Endgame",
        description: "Los Viergaderos se inclinen para recibir el Consolidador Traceso.",
        year: 2019,
        rating: 8.4,
        genre: ["accion", "aventura", "ciencia-ficcion"],
        duration: "3h 2m",
        director: "Anthony y Joe Russo",
        actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
        language: "Español/Inglés",
        size: "3.5 GB",
        isFeatured: true,
        isNew: false,
        addedDate: "2023-08-20"
    },
    {
        id: 7,
        title: "El Padrino",
        description: "El patriarca de una dinastía del crimen organizado transfiere el control a su hijo.",
        year: 1972,
        rating: 9.2,
        genre: ["drama", "crimen"],
        duration: "2h 55m",
        director: "Francis Ford Coppola",
        actors: "Marlon Brando, Al Pacino",
        language: "Español/Inglés",
        size: "2.8 GB",
        isFeatured: false,
        isNew: false,
        addedDate: "2023-07-10"
    },
    {
        id: 8,
        title: "Inception",
        description: "Un ladrón que roba secretos a través de sueños recibe una tarea imposible.",
        year: 2010,
        rating: 8.8,
        genre: ["accion", "ciencia-ficcion", "suspenso"],
        duration: "2h 28m",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt",
        language: "Español/Inglés",
        size: "2.7 GB",
        isFeatured: true,
        isNew: false,
        addedDate: "2023-06-25"
    }
];

// ===== ESTADO GLOBAL =====
let currentFilter = 'todas';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let downloads = JSON.parse(localStorage.getItem('downloads')) || [];
let currentMovieDetail = null;

// ===== FUNCIONES DE NAVEGACIÓN =====
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Ocultar detalle si está visible
    document.getElementById('detallePelicula').classList.remove('active');
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Cargar contenido específico de la sección
    switch(sectionId) {
        case 'inicio':
            loadHomeContent();
            break;
        case 'catalogo':
            loadCatalog();
            break;
        case 'recientes':
            loadRecentMovies();
            break;
        case 'favoritos':
            loadFavorites();
            break;
        case 'descargas':
            loadDownloads();
            break;
    }
}

// ===== FUNCIONES DE PELÍCULAS =====
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;
    card.dataset.genre = movie.genre.join(' ');
    
    const isFavorite = favorites.includes(movie.id);
    
    card.innerHTML = `
        ${movie.isNew ? '<span class="movie-badge">NUEVO</span>' : ''}
        <div class="favorite-badge ${isFavorite ? 'active' : ''}" onclick="toggleMovieFavorite(${movie.id}, event)">
            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </div>
        <img src="https://via.placeholder.com/300x450/2a2a2a/ffffff?text=${encodeURIComponent(movie.title.substring(0, 20))}" 
             alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-rating">${movie.rating}/10</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.favorite-badge')) {
            showMovieDetail(movie.id);
        }
    });
    
    return card;
}

function showMovieDetail(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    currentMovieDetail = movie;
    
    // Actualizar información en el detalle
    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailDescription').textContent = movie.description;
    document.getElementById('detailGenre').textContent = movie.genre.join(', ');
    document.getElementById('detailYear').textContent = movie.year;
    document.getElementById('detailRating').textContent = `${movie.rating}/10`;
    document.getElementById('detailDuration').textContent = movie.duration;
    document.getElementById('detailDirector').textContent = movie.director;
    document.getElementById('detailActors').textContent = movie.actors;
    document.getElementById('detailLanguage').textContent = movie.language;
    document.getElementById('detailSize').textContent = movie.size;
    
    // Actualizar botón de favoritos
    const favoriteBtn = document.getElementById('favoriteBtn');
    const isFavorite = favorites.includes(movie.id);
    favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Quitar de' : 'Agregar a'} Favoritos`;
    
    // Configurar video (simulado)
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.poster = `https://via.placeholder.com/1280x720/2a2a2a/ffffff?text=${encodeURIComponent(movie.title)}`;
    
    // Generar sugerencias
    generateSuggestions(movie);
    
    // Ocultar secciones principales y mostrar detalle
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('detallePelicula').classList.add('active');
}

function hideMovieDetail() {
    document.getElementById('detallePelicula').classList.remove('active');
    document.getElementById('inicio').classList.add('active');
    
    // Actualizar botón activo
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.querySelector('i.fa-home')) {
            btn.classList.add('active');
        }
    });
}

// ===== FILTRADO =====
function filterMovies(filter) {
    // Actualizar botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    currentFilter = filter;
    loadCatalog();
}

function sortMovies() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;
    loadCatalog(sortValue);
}

// ===== FAVORITOS =====
function toggleMovieFavorite(movieId, event) {
    if (event) event.stopPropagation();
    
    const index = favorites.indexOf(movieId);
    
    if (index === -1) {
        favorites.push(movieId);
        showNotification('Película agregada a favoritos');
    } else {
        favorites.splice(index, 1);
        showNotification('Película eliminada de favoritos');
    }
    
    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Recargar la vista actual
    if (document.getElementById('favoritos').classList.contains('active')) {
        loadFavorites();
    } else if (document.getElementById('detallePelicula').classList.contains('active')) {
        // Actualizar botón en detalle
        const favoriteBtn = document.getElementById('favoriteBtn');
        const isFavorite = favorites.includes(currentMovieDetail.id);
        favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Quitar de' : 'Agregar a'} Favoritos`;
    }
    
    // Actualizar todas las tarjetas visibles
    updateFavoriteBadges();
}

function toggleFavorite() {
    if (!currentMovieDetail) return;
    toggleMovieFavorite(currentMovieDetail.id);
}

function clearFavorites() {
    if (confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
        favorites = [];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        showNotification('Favoritos eliminados');
    }
}

function updateFavoriteBadges() {
    document.querySelectorAll('.favorite-badge').forEach(badge => {
        const movieId = parseInt(badge.closest('.movie-card').dataset.id);
        const isFavorite = favorites.includes(movieId);
        
        badge.className = `favorite-badge ${isFavorite ? 'active' : ''}`;
        badge.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>`;
    });
}

function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyFavorites');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    favoritesGrid.innerHTML = '';
    
    const favoriteMovies = moviesData.filter(movie => favorites.includes(movie.id));
    favoriteMovies.forEach(movie => {
        favoritesGrid.appendChild(createMovieCard(movie));
    });
}

// ===== DESCARGAS =====
function downloadCurrentMovie() {
    if (!currentMovieDetail) return;
    
    const download = {
        id: Date.now(),
        movieId: currentMovieDetail.id,
        title: currentMovieDetail.title,
        quality: '1080p',
        date: new Date().toISOString(),
        status: 'completado'
    };
    
    downloads.unshift(download);
    localStorage.setItem('downloads', JSON.stringify(downloads));
    
    showNotification(`Descargando ${currentMovieDetail.title}...`);
    
    // Simular descarga
    setTimeout(() => {
        showNotification(`¡${currentMovieDetail.title} descargada exitosamente!`);
        loadDownloads();
    }, 2000);
}

function clearDownloads() {
    if (confirm('¿Estás seguro de que quieres eliminar el historial de descargas?')) {
        downloads = [];
        localStorage.setItem('downloads', JSON.stringify(downloads));
        loadDownloads();
        showNotification('Historial de descargas eliminado');
    }
}

function loadDownloads() {
    const downloadsList = document.getElementById('downloadsList');
    
    if (downloads.length === 0) {
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
    
    downloads.slice(0, 10).forEach(download => {
        const movie = moviesData.find(m => m.id === download.movieId);
        if (!movie) return;
        
        const downloadItem = document.createElement('div');
        downloadItem.className = 'download-item';
        downloadItem.innerHTML = `
            <img src="https://via.placeholder.com/80x120/2a2a2a/ffffff?text=${encodeURIComponent(movie.title.substring(0, 2))}" 
                 alt="${movie.title}">
            <div class="download-info">
                <h4>${movie.title}</h4>
                <small>${new Date(download.date).toLocaleDateString()} • ${download.quality}</small>
            </div>
            <span class="download-status">${download.status}</span>
        `;
        
        downloadsList.appendChild(downloadItem);
    });
}

// ===== BÚSQUEDA =====
function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        document.getElementById('searchSuggestions').classList.remove('active');
        return;
    }
    
    const suggestions = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    ).slice(0, 5);
    
    const suggestionsContainer = document.getElementById('searchSuggestions');
    suggestionsContainer.innerHTML = '';
    
    if (suggestions.length > 0) {
        suggestions.forEach(movie => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = movie.title;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = '';
                suggestionsContainer.classList.remove('active');
                showMovieDetail(movie.id);
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.classList.add('active');
    } else {
        suggestionsContainer.classList.remove('active');
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') return;
    
    const results = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );
    
    // Mostrar resultados en catálogo
    showSection('catalogo');
    
    const catalogGrid = document.getElementById('catalogGrid');
    catalogGrid.innerHTML = '';
    
    if (results.length > 0) {
        results.forEach(movie => {
            catalogGrid.appendChild(createMovieCard(movie));
        });
        document.getElementById('movieCount').textContent = `${results.length} resultados`;
    } else {
        catalogGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search fa-3x"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otras palabras clave</p>
            </div>
        `;
        document.getElementById('movieCount').textContent = '0 resultados';
    }
    
    searchInput.value = '';
    document.getElementById('searchSuggestions').classList.remove('active');
}

function showSuggestions() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.length >= 2) {
        searchMovies();
    }
}

// ===== CARGA DE CONTENIDO =====
function loadInitialMovies() {
    loadHomeContent();
    loadCatalog();
    loadRecentMovies();
}

function loadHomeContent() {
    // Destacadas
    const featuredMovies = moviesData.filter(movie => movie.isFeatured);
    const featuredGrid = document.getElementById('featuredGrid');
    featuredGrid.innerHTML = '';
    featuredMovies.slice(0, 4).forEach(movie => {
        featuredGrid.appendChild(createMovieCard(movie));
    });
    
    // Novedades
    const newMovies = moviesData.filter(movie => movie.isNew);
    const novedadesGrid = document.getElementById('novedadesGrid');
    novedadesGrid.innerHTML = '';
    newMovies.slice(0, 4).forEach(movie => {
        novedadesGrid.appendChild(createMovieCard(movie));
    });
}

function loadCatalog(sortValue = 'recientes') {
    let filteredMovies = [...moviesData];
    
    // Filtrar por categoría
    if (currentFilter !== 'todas') {
        if (currentFilter === '2024') {
            filteredMovies = filteredMovies.filter(movie => movie.year == 2024);
        } else {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre.some(g => g.toLowerCase().includes(currentFilter))
            );
        }
    }
    
    // Ordenar
    switch(sortValue) {
        case 'recientes':
            filteredMovies.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
            break;
        case 'antiguas':
            filteredMovies.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
            break;
        case 'rating':
            filteredMovies.sort((a, b) => b.rating - a.rating);
            break;
        case 'nombre':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    // Mostrar
    const catalogGrid = document.getElementById('catalogGrid');
    catalogGrid.innerHTML = '';
    
    if (filteredMovies.length === 0) {
        catalogGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-film fa-3x"></i>
                <h3>No hay películas</h3>
                <p>No se encontraron películas con los filtros seleccionados</p>
            </div>
        `;
    } else {
        filteredMovies.forEach(movie => {
            catalogGrid.appendChild(createMovieCard(movie));
        });
    }
    
    // Actualizar contador
    document.getElementById('movieCount').textContent = `${filteredMovies.length} películas`;
}

function loadRecentMovies() {
    const recentMovies = [...moviesData]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 8);
    
    const recentGrid = document.getElementById('recentGrid');
    recentGrid.innerHTML = '';
    recentMovies.forEach(movie => {
        recentGrid.appendChild(createMovieCard(movie));
    });
}

function filterRecent(timeFilter) {
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // En una implementación real, aquí filtrarías por fecha
    // Por ahora solo recargamos
    loadRecentMovies();
}

function loadMoreMovies() {
    // En una implementación real, cargarías más películas
    // Por ahora solo mostramos un mensaje
    showNotification('Cargando más películas...');
}

// ===== SUGERENCIAS =====
function generateSuggestions(currentMovie) {
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    suggestionsGrid.innerHTML = '';
    
    // Buscar películas del mismo género
    const suggestions = moviesData
        .filter(movie => 
            movie.id !== currentMovie.id &&
            movie.genre.some(g => currentMovie.genre.includes(g))
        )
        .slice(0, 4);
    
    if (suggestions.length === 0) {
        // Si no hay del mismo género, mostrar películas destacadas
        moviesData
            .filter(movie => movie.id !== currentMovie.id && movie.isFeatured)
            .slice(0, 4)
            .forEach(movie => {
                suggestionsGrid.appendChild(createMovieCard(movie));
            });
    } else {
        suggestions.forEach(movie => {
            suggestionsGrid.appendChild(createMovieCard(movie));
        });
    }
}

// ===== REPRODUCTOR =====
function togglePlay() {
    const videoPlayer = document.getElementById('moviePlayer');
    const playBtn = document.getElementById('playPauseBtn');
    
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function skipForward() {
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.currentTime += 10;
}

function skipBackward() {
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.currentTime -= 10;
}

function toggleFullscreen() {
    const videoPlayer = document.getElementById('moviePlayer');
    
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function changeQuality() {
    const qualityBtn = document.querySelector('.quality-btn');
    const qualities = ['480p', '720p', '1080p', '4K'];
    const currentIndex = qualities.indexOf(qualityBtn.textContent.trim());
    const nextIndex = (currentIndex + 1) % qualities.length;
    
    qualityBtn.innerHTML = `<i class="fas fa-hd"></i> ${qualities[nextIndex]}`;
    showNotification(`Calidad cambiada a ${qualities[nextIndex]}`);
}

// ===== UTILIDADES =====
function updateStats() {
    document.getElementById('totalMovies').textContent = `${moviesData.length}+`;
    document.getElementById('totalDownloads').textContent = `${downloads.length}+`;
    
    // Usuarios activos (simulado)
    const activeUsers = Math.floor(Math.random() * 5000) + 1000;
    document.getElementById('activeUsers').textContent = `${activeUsers}+`;
}

function showInfoModal(type) {
    const modalBody = document.getElementById('modalBody');
    let content = '';
    
    switch(type) {
        case 'ayuda':
            content = `
                <h2><i class="fas fa-question-circle"></i> Ayuda</h2>
                <p>Para ver una película, simplemente haz clic en ella.</p>
                <p>Puedes buscar películas por título o descripción.</p>
                <p>Marca películas como favoritas para encontrarlas fácilmente.</p>
            `;
            break;
        case 'contacto':
            content = `
                <h2><i class="fas fa-envelope"></i> Contacto</h2>
                <p>Email: soporte@cineweb.com</p>
                <p>Teléfono: +1 234 567 890</p>
                <p>Horario: Lunes a Viernes 9:00 - 18:00</p>
            `;
            break;
        case 'faq':
            content = `
                <h2><i class="fas fa-comments"></i> Preguntas Frecuentes</h2>
                <p><strong>¿Es gratis?</strong> Sí, completamente gratuito.</p>
                <p><strong>¿Necesito registrarme?</strong> No, no es necesario.</p>
                <p><strong>¿Puedo descargar películas?</strong> Sí, en varias calidades.</p>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    document.getElementById('infoModal').classList.add('active');
}

function closeModal() {
    document.getElementById('infoModal').classList.remove('active');
}

function showNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Estilos para notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 4000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function shareMovie() {
    if (!currentMovieDetail) return;
    
    const shareText = `¡Mira ${currentMovieDetail.title} en CineWeb!`;
    
    // Copiar al portapapeles como fallback
    navigator.clipboard.writeText(shareText);
    showNotification('Enlace copiado al portapapeles');
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Cargar contenido inicial
    loadInitialMovies();
    updateStats();
    loadFavorites();
    loadDownloads();
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('searchSuggestions').classList.remove('active');
        }
    });
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('infoModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
