// Datos de ejemplo de películas
const movies = [
    {
        id: 1,
        title: "El Padrino",
        description: "Epic crime drama about the Corleone crime family.",
        genre: "drama",
        year: "1972",
        rating: "9.2/10",
        videoUrl: "https://ejemplo.com/padrino.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=El+Padrino",
        downloadUrl: "https://ejemplo.com/padrino.mp4"
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        description: "Los Vengadores se reúnen para revertir el chasquido de Thanos.",
        genre: "accion",
        year: "2019",
        rating: "8.4/10",
        videoUrl: "https://ejemplo.com/endgame.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=Avengers",
        downloadUrl: "https://ejemplo.com/endgame.mp4"
    },
    {
        id: 3,
        title: "Interestelar",
        description: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.",
        genre: "ciencia-ficcion",
        year: "2014",
        rating: "8.6/10",
        videoUrl: "https://ejemplo.com/interstellar.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=Interestelar",
        downloadUrl: "https://ejemplo.com/interstellar.mp4"
    },
    {
        id: 4,
        title: "El Viaje de Chihiro",
        description: "Una niña atrapada en un mundo de espíritus debe trabajar para liberar a sus padres.",
        genre: "animacion",
        year: "2001",
        rating: "8.6/10",
        videoUrl: "https://ejemplo.com/chihiro.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=Chihiro",
        downloadUrl: "https://ejemplo.com/chihiro.mp4"
    },
    {
        id: 5,
        title: "Parásitos",
        description: "Una familia pobre se infiltra en el hogar de una familia rica.",
        genre: "drama",
        year: "2019",
        rating: "8.6/10",
        videoUrl: "https://ejemplo.com/parasitos.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=Parasitos",
        downloadUrl: "https://ejemplo.com/parasitos.mp4"
    },
    {
        id: 6,
        title: "John Wick",
        description: "Un ex asesino sale de su retiro para vengar el robo de su auto y la muerte de su perro.",
        genre: "accion",
        year: "2014",
        rating: "7.4/10",
        videoUrl: "https://ejemplo.com/johnwick.mp4",
        poster: "https://via.placeholder.com/300x450/333/fff?text=John+Wick",
        downloadUrl: "https://ejemplo.com/johnwick.mp4"
    }
];

// Elementos DOM
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
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const movieTitle = document.getElementById('movieTitle');
const movieDescription = document.getElementById('movieDescription');
const movieGenre = document.getElementById('movieGenre');
const movieYear = document.getElementById('movieYear');
const movieRating = document.getElementById('movieRating');

// Modal
const modal = document.getElementById('infoModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

// Estado
let currentFilter = 'all';
let currentMovie = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    setupEventListeners();
    selectFirstMovie();
});

// Cargar películas en la cuadrícula
function loadMovies(filteredMovies = movies) {
    moviesGrid.innerHTML = '';
    
    filteredMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.dataset.genre = movie.genre;
        
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-card-content">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <div class="movie-card-footer">
                    <span>${movie.year}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        `;
        
        movieCard.addEventListener('click', () => playMovie(movie));
        moviesGrid.appendChild(movieCard);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Controles del reproductor
    playBtn.addEventListener('click', () => videoPlayer.play());
    pauseBtn.addEventListener('click', () => videoPlayer.pause());
    
    volumeSlider.addEventListener('input', () => {
        videoPlayer.volume = volumeSlider.value;
    });
    
    fullscreenBtn.addEventListener('click', () => {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        }
    });
    
    smallScreenBtn.addEventListener('click', () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    });
    
    // Actualizar tiempo
    videoPlayer.addEventListener('timeupdate', updateTimeDisplay);
    videoPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(videoPlayer.duration);
    });
    
    // Filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            
            const filtered = currentFilter === 'all' 
                ? movies 
                : movies.filter(movie => movie.genre === currentFilter);
            
            loadMovies(filtered);
        });
    });
    
    // Búsqueda
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Reproducir película
function playMovie(movie) {
    currentMovie = movie;
    
    videoSource.src = movie.videoUrl;
    videoPlayer.load();
    videoPlayer.play();
    
    // Actualizar información
    movieTitle.textContent = movie.title;
    movieDescription.textContent = movie.description;
    movieGenre.textContent = movie.genre;
    movieYear.textContent = movie.year;
    movieRating.textContent = movie.rating;
    
    // Actualizar enlace de descarga
    downloadBtn.href = movie.downloadUrl;
    downloadBtn.download = `${movie.title}.mp4`;
    
    // Resaltar película seleccionada
    document.querySelectorAll('.movie-card').forEach(card => {
        card.style.border = 'none';
    });
    
    const selectedCard = [...document.querySelectorAll('.movie-card')]
        .find(card => card.querySelector('h3').textContent === movie.title);
    
    if (selectedCard) {
        selectedCard.style.border = '3px solid var(--primary-color)';
    }
}

// Seleccionar primera película al cargar
function selectFirstMovie() {
    if (movies.length > 0) {
        playMovie(movies[0]);
    }
}

// Formatear tiempo (MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Actualizar display de tiempo
function updateTimeDisplay() {
    currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
}

// Buscar películas
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        loadMovies(movies);
        return;
    }
    
    const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
    );
    
    loadMovies(filtered);
}

// Mostrar información
function showAbout() {
    modalTitle.textContent = 'Acerca de CineWeb';
    modalText.innerHTML = `
        <p>CineWeb es una plataforma de streaming gratuita creada con HTML, CSS y JavaScript.</p>
        <p><strong>Características:</strong></p>
        <ul>
            <li>Reproducción de películas en alta calidad</li>
            <li>Modo pantalla completa</li>
            <li>Descarga de películas</li>
            <li>Catálogo organizado por géneros</li>
            <li>Búsqueda inteligente</li>
            <li>Interfaz responsive</li>
        </ul>
        <p>Esta web está alojada en GitHub Pages y es totalmente gratuita.</p>
    `;
    modal.style.display = 'block';
}

function showHelp() {
    modalTitle.textContent = 'Ayuda';
    modalText.innerHTML = `
        <p><strong>Guía de uso:</strong></p>
        <ul>
            <li>Haz clic en cualquier película para reproducirla</li>
            <li>Usa los botones de control para pausar, ajustar volumen, etc.</li>
            <li>Haz clic en el icono de expansión para pantalla completa</li>
            <li>Usa el botón de descarga para guardar la película</li>
            <li>Filtra por género usando los botones superiores</li>
            <li>Usa la barra de búsqueda para encontrar películas específicas</li>
        </ul>
        <p><strong>Nota:</strong> Las URLs de video son de ejemplo. Debes reemplazarlas con tus propios archivos.</p>
    `;
    modal.style.display = 'block';
}

// Soporte para arrastrar y soltar archivos de video
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        
        const customMovie = {
            id: Date.now(),
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "Película cargada localmente",
            genre: "personalizado",
            year: new Date().getFullYear(),
            rating: "Personal",
            videoUrl: url,
            poster: "https://via.placeholder.com/300x450/333/fff?text=Personal",
            downloadUrl: url
        };
        
        playMovie(customMovie);
    }
});

// Manejo de teclas para controles
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'k':
            e.preventDefault();
            videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
            break;
        case 'f':
            fullscreenBtn.click();
            break;
        case 'm':
            videoPlayer.muted = !videoPlayer.muted;
            break;
        case 'ArrowLeft':
            videoPlayer.currentTime -= 10;
            break;
        case 'ArrowRight':
            videoPlayer.currentTime += 10;
            break;
        case 'ArrowUp':
            if (videoPlayer.volume < 1) videoPlayer.volume += 0.1;
            break;
        case 'ArrowDown':
            if (videoPlayer.volume > 0) videoPlayer.volume -= 0.1;
            break;
    }
});
