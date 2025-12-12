// ===== CONFIGURACIÓN INICIAL =====
const CONFIG = {
    appName: "CineWeb Pro",
    version: "2.0.0",
    githubRepo: "https://github.com/tuusuario/cineweb",
    telegramChannel: "https://t.me/cineweb_oficial",
    whatsappGroup: "https://chat.whatsapp.com/INVITACION",
    discordServer: "https://discord.gg/INVITACION",
    adminPassword: "cineweb2024", // Cambia esto
};

// ===== DATOS DE PELÍCULAS MEJORADOS =====
let peliculas = JSON.parse(localStorage.getItem('cineweb_peliculas')) || [
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
        downloads: 8500,
        isFeatured: true,
        quality: "1080p",
        subtitles: ["Español", "Inglés"],
        trailer: "https://example.com/padrino-trailer.mp4"
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
        downloads: 12000,
        isFeatured: true,
        quality: "4K",
        subtitles: ["Español", "Inglés", "Francés"],
        trailer: "https://example.com/endgame-trailer.mp4"
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
        downloads: 9500,
        isFeatured: true,
        quality: "1080p",
        subtitles: ["Español", "Inglés"],
        trailer: "https://example.com/interstellar-trailer.mp4"
    },
    // Agrega más películas aquí...
];

// ===== VARIABLES GLOBALES =====
let currentMovie = null;
let currentFilter = 'todas';
let currentSort = 'recientes';
let currentSection = 'inicio';
let visibleMovies = 12;
let downloadHistory = JSON.parse(localStorage.getItem('cineweb_downloads')) || [];
let favorites = JSON.parse(localStorage.getItem('cineweb_favorites')) || [];
let watchHistory = JSON.parse(localStorage.getItem('cineweb_watch_history')) || [];

// ===== PANTALLA DE CARGA =====
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        
        // Simular progreso de carga
        let progress = 0;
        const progressBar = document.getElementById('loadingProgress');
        const percentage = document.getElementById('loadingPercentage');
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (percentage) percentage.textContent = `${Math.floor(progress)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    initApp();
                }, 500);
            }
        }, 100);
    } else {
        initApp();
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', showLoadingScreen);

function initApp() {
    // Verificar si es primera visita
    if (!localStorage.getItem('cineweb_first_visit')) {
        localStorage.setItem('cineweb_first_visit', 'true');
        showWelcomeModal();
    }
    
    // Cargar datos iniciales
    loadFeaturedMovies();
    loadCatalog();
    loadRecentMovies();
    updateStats();
    loadDownloadHistory();
    setupEventListeners();
    
    // Mostrar notificación de bienvenida
    showNotification(`¡Bienvenido a ${CONFIG.appName} v${CONFIG.version}!`);
    
    // Iniciar auto-save
    startAutoSave();
}

function showWelcomeModal() {
    const modalBody = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem; background: linear-gradient(135deg, #FF3366, #00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎬</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, #FF3366, #00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">¡Bienvenido a CineWeb Pro!</h2>
            <p style="font-size: 1.2rem; color: rgba(255,255,255,0.8); margin-bottom: 2rem; line-height: 1.6;">
                La mejor plataforma para ver y descargar películas gratis. <br>
                ¡Disfruta de nuestro catálogo en constante crecimiento!
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
                <button onclick="joinChannel('telegram')" class="action-btn" style="background: #0088cc;">
                    <i class="fab fa-telegram"></i> Únete a Telegram
                </button>
                <button onclick="joinChannel('whatsapp')" class="action-btn" style="background: #25D366;">
                    <i class="fab fa-whatsapp"></i> Grupo de WhatsApp
                </button>
                <button onclick="joinChannel('discord')" class="action-btn" style="background: #7289DA;">
                    <i class="fab fa-discord"></i> Servidor de Discord
                </button>
            </div>
            <p style="margin-top: 2rem; color: rgba(255,255,255,0.5); font-size: 0.9rem;">
                Puedes cerrar esta ventana para comenzar a explorar.
            </p>
        </div>
    `;
    
    showModal('¡Bienvenido!', modalBody);
}

// ===== FUNCIONES PARA UNIRSE A CANALES =====
function joinChannel(channel) {
    let url = '';
    switch(channel) {
        case 'telegram':
            url = CONFIG.telegramChannel;
            break;
        case 'whatsapp':
            url = CONFIG.whatsappGroup;
            break;
        case 'discord':
            url = CONFIG.discordServer;
            break;
    }
    
    if (url) {
        window.open(url, '_blank');
        showNotification('¡Redirigiendo al canal!');
    }
}

function openAdminPanel() {
    const password = prompt('Ingresa la contraseña de administrador:');
    if (password === CONFIG.adminPassword) {
        window.location.href = 'actualizar.html';
    } else {
        showNotification('Contraseña incorrecta', 'error');
    }
}

// ===== SISTEMA DE ACTUALIZACIONES =====
function checkForUpdates() {
    // Simular verificación de actualizaciones
    const lastUpdate = localStorage.getItem('cineweb_last_update');
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (!lastUpdate || lastUpdate !== currentDate) {
        showNotification('¡Nuevas películas disponibles!', 'info');
        localStorage.setItem('cineweb_last_update', currentDate);
    }
}

function startAutoSave() {
    // Guardar automáticamente cada 5 minutos
    setInterval(() => {
        saveData();
        showNotification('Datos guardados automáticamente', 'success');
    }, 300000);
}

function saveData() {
    localStorage.setItem('cineweb_peliculas', JSON.stringify(peliculas));
    localStorage.setItem('cineweb_downloads', JSON.stringify(downloadHistory));
    localStorage.setItem('cineweb_favorites', JSON.stringify(favorites));
    localStorage.setItem('cineweb_watch_history', JSON.stringify(watchHistory));
}

// ===== FUNCIONES DE PELÍCULAS MEJORADAS =====
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;
    
    // Determinar si es nueva (menos de 7 días)
    const isNew = isMovieNew(movie.addedDate);
    const isFeatured = movie.isFeatured;
    
    let badges = '';
    if (isNew) badges += '<span class="movie-badge">NUEVO</span>';
    if (isFeatured) badges += '<span class="movie-badge" style="background: linear-gradient(135deg, #FFAA00, #FF7A00); top: 60px;">DESTACADA</span>';
    if (movie.quality === '4K') badges += '<span class="movie-badge" style="background: linear-gradient(135deg, #9D4EDD, #7B2CBF); top: 105px;">4K</span>';
    
    card.innerHTML = `
        ${badges}
        <img src="${movie.poster}" 
             alt="${movie.title}" 
             class="movie-poster"
             onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/333/fff?text=${encodeURIComponent(movie.title.substring(0, 20))}'">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-rating">${movie.rating}</span>
                <span style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">
                    <i class="fas fa-download"></i> ${formatNumber(movie.downloads || 0)}
                </span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showMovieDetail(movie.id));
    
    // Agregar menú contextual
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showMovieContextMenu(e, movie);
    });
    
    return card;
}

function isMovieNew(dateString) {
    const addedDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - addedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
}

function showMovieContextMenu(event, movie) {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${event.clientY}px;
        left: ${event.clientX}px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid var(--primary);
        border-radius: 12px;
        padding: 1rem;
        z-index: 5000;
        min-width: 200px;
        box-shadow: var(--shadow);
    `;
    
    menu.innerHTML = `
        <div style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
            ${movie.title}
        </div>
        <button onclick="addToFavorites(${movie.id})" style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 0.8rem; background: transparent; border: none; color: white; cursor: pointer; transition: all 0.3s; border-radius: 8px;">
            <i class="fas fa-heart"></i> Agregar a favoritos
        </button>
        <button onclick="downloadMovie(${movie.id})" style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 0.8rem; background: transparent; border: none; color: white; cursor: pointer; transition: all 0.3s; border-radius: 8px;">
            <i class="fas fa-download"></i> Descargar
        </button>
        <button onclick="shareMovie(${movie.id})" style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 0.8rem; background: transparent; border: none; color: white; cursor: pointer; transition: all 0.3s; border-radius: 8px;">
            <i class="fas fa-share"></i> Compartir
        </button>
        <button onclick="showTrailer(${movie.id})" style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 0.8rem; background: transparent; border: none; color: white; cursor: pointer; transition: all 0.3s; border-radius: 8px;">
            <i class="fas fa-play-circle"></i> Ver trailer
        </button>
    `;
    
    document.body.appendChild(menu);
    
    // Cerrar menú al hacer clic fuera
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// ===== DESCARGA MEJORADA =====
function downloadMovie(movieId) {
    const movie = peliculas.find(m => m.id === movieId);
    if (!movie) return;
    
    // Simular descarga progresiva
    showDownloadProgress(movie);
    
    // Registrar en historial
    const downloadItem = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        date: new Date().toISOString(),
        size: movie.size,
        status: 'downloading',
        progress: 0
    };
    
    downloadHistory.unshift(downloadItem);
    saveData();
    
    // Simular progreso
    simulateDownload(downloadItem);
}

function showDownloadProgress(movie) {
    const progressModal = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--accent);">
                <i class="fas fa-download"></i>
            </div>
            <h3 style="margin-bottom: 1rem;">Descargando: ${movie.title}</h3>
            <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; margin: 2rem 0; overflow: hidden;">
                <div id="downloadProgressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00D4FF, #0099FF); border-radius: 5px; transition: width 0.3s;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
                <span id="downloadSpeed">Velocidad: 0 MB/s</span>
                <span id="downloadTime">Tiempo restante: --:--</span>
            </div>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                Tamaño: ${movie.size} | Calidad: ${movie.quality || 'HD'}
            </p>
        </div>
    `;
    
    showModal('Descargando...', progressModal, false);
}

function simulateDownload(downloadItem) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        // Actualizar barra de progreso
        const bar = document.getElementById('downloadProgressBar');
        if (bar) bar.style.width = `${progress}%`;
        
        // Actualizar velocidad y tiempo
        const speed = document.getElementById('downloadSpeed');
        const time = document.getElementById('downloadTime');
        
        if (speed) speed.textContent = `Velocidad: ${(Math.random() * 5 + 2).toFixed(1)} MB/s`;
        if (time) {
            const remaining = Math.floor((100 - progress) / 10);
            time.textContent = `Tiempo restante: ${remaining}:00`;
        }
        
        // Actualizar en historial
        downloadItem.progress = progress;
        downloadItem.status = progress < 100 ? 'downloading' : 'completed';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                closeModal();
                showNotification(`¡${downloadItem.title} descargada exitosamente!`);
                
                // Iniciar descarga real (simulada)
                const link = document.createElement('a');
                link.href = '#';
                link.download = `${downloadItem.title.replace(/\s+/g, '_')}.mp4`;
                link.click();
                
                // Actualizar estadísticas
                const movie = peliculas.find(m => m.id === downloadItem.id);
                if (movie) {
                    movie.downloads = (movie.downloads || 0) + 1;
                    saveData();
                    updateStats();
                }
            }, 1000);
        }
    }, 500);
}

// ===== FUNCIONES DE BÚSQUEDA MEJORADAS =====
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        showNotification('Escribe algo para buscar', 'warning');
        return;
    }
    
    // Mostrar resultados en modal
    const results = peliculas.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.actors.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        showModal('Resultados de búsqueda', `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; color: rgba(255,255,255,0.3); margin-bottom: 1rem;">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No se encontraron resultados</h3>
                <p style="color: rgba(255,255,255,0.7); margin: 1rem 0;">
                    No hay películas que coincidan con: <strong>${query}</strong>
                </p>
                <button onclick="closeModal(); showSection('catalogo');" class="btn-primary" style="margin-top: 2rem;">
                    <i class="fas fa-film"></i> Ver todo el catálogo
                </button>
            </div>
        `);
        return;
    }
    
    let resultsHTML = `
        <div style="margin-bottom: 2rem;">
            <h3>${results.length} resultados para: "${query}"</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; max-height: 400px; overflow-y: auto; padding-right: 1rem;">
    `;
    
    results.forEach(movie => {
        resultsHTML += `
            <div class="movie-card" onclick="showMovieDetail(${movie.id}); closeModal();" style="cursor: pointer;">
                <img src="${movie.poster}" alt="${movie.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin-bottom: 0.5rem;">
                <div style="padding: 0.5rem;">
                    <h4 style="margin: 0 0 0.3rem 0; font-size: 0.9rem;">${movie.title}</h4>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: rgba(255,255,255,0.6);">
                        <span>${movie.year}</span>
                        <span>${movie.rating}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    
    showModal(`Resultados: "${query}"`, resultsHTML);
    
    // Limpiar búsqueda
    searchInput.value = '';
    hideSuggestions();
}

// ===== FUNCIONES DE USUARIO =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('cineweb_dark_mode', document.body.classList.contains('dark-mode'));
    showNotification('Modo oscuro ' + (document.body.classList.contains('dark-mode') ? 'activado' : 'desactivado'));
}

function exportData() {
    const data = {
        peliculas: peliculas,
        config: CONFIG,
        stats: getStats()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cineweb_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Respaldo exportado exitosamente');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (confirm('¿Estás seguro de que quieres importar estos datos? Esto sobrescribirá la información actual.')) {
                    peliculas = data.peliculas || peliculas;
                    saveData();
                    location.reload();
                }
            } catch (error) {
                showNotification('Error al importar datos', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ===== FUNCIONES DE ESTADÍSTICAS MEJORADAS =====
function getStats() {
    const totalMovies = peliculas.length;
    const totalDownloads = peliculas.reduce((sum, m) => sum + (m.downloads || 0), 0);
    const totalViews = peliculas.reduce((sum, m) => sum + (m.views || 0), 0);
    const totalSize = peliculas.reduce((sum, m) => {
        const size = parseFloat(m.size) || 0;
        return sum + size;
    }, 0);
    
    const genres = {};
    peliculas.forEach(movie => {
        genres[movie.genre] = (genres[movie.genre] || 0) + 1;
    });
    
    const popularGenre = Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b);
    
    return {
        totalMovies,
        totalDownloads,
        totalViews,
        totalSize: `${totalSize.toFixed(1)} GB`,
        popularGenre,
        lastUpdate: localStorage.getItem('cineweb_last_update') || 'Nunca',
        userSince: localStorage.getItem('cineweb_first_visit') || new Date().toISOString()
    };
}

function updateStats() {
    const stats = getStats();
    
    // Actualizar contadores
    document.getElementById('totalMovies').textContent = stats.totalMovies;
    document.getElementById('totalDownloads').textContent = formatNumber(stats.totalDownloads);
    document.getElementById('activeUsers').textContent = formatNumber(stats.totalViews / 100);
    
    // Actualizar estadísticas ocultas
    const hiddenStats = document.getElementById('hiddenStats');
    if (hiddenStats) {
        hiddenStats.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; color: var(--accent); font-weight: bold;">${stats.totalSize}</div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Espacio total</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; color: var(--success); font-weight: bold;">${stats.popularGenre}</div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Género popular</div>
                </div>
            </div>
        `;
    }
}

// ===== FUNCIONES AUXILIARES MEJORADAS =====
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Colores según tipo
    let background = 'linear-gradient(135deg, #FF3366, #FF6B6B)';
    if (type === 'error') background = 'linear-gradient(135deg, #FF3333, #FF6666)';
    if (type === 'warning') background = 'linear-gradient(135deg, #FFAA00, #FFCC00)';
    if (type === 'info') background = 'linear-gradient(135deg, #00D4FF, #0099FF)';
    if (type === 'success') background = 'linear-gradient(135deg, #00FF88, #00CC66)';
    
    notification.style.background = background;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showModal(title, content, showClose = true) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        ${showClose ? '<button class="modal-close" onclick="closeModal()">&times;</button>' : ''}
        <h2 style="margin-bottom: 1.5rem; color: var(--primary);">${title}</h2>
        <div style="line-height: 1.8;">${content}</div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('infoModal').classList.remove('active');
}

// ===== CONFIGURACIÓN DE EVENTOS MEJORADA =====
function setupEventListeners() {
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            const detailSection = document.getElementById('detallePelicula');
            if (detailSection.classList.contains('active')) {
                hideMovieDetail();
            }
        }
    });
    
    // Búsqueda con Ctrl+F
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });
    
    // Actualizar cada hora
    setInterval(checkForUpdates, 3600000);
    
    // Verificar conexión
    window.addEventListener('online', () => {
        showNotification('Conexión restablecida', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('Sin conexión a internet', 'warning');
    });
}

// ===== INICIALIZAR LA APP =====
window.initApp = initApp;
window.showMovieDetail = showMovieDetail;
window.hideMovieDetail = hideMovieDetail;
window.showSection = showSection;
window.performSearch = performSearch;
window.filterMovies = filterMovies;
window.sortMovies = sortMovies;
window.downloadMovie = downloadMovie;
window.showModal = showModal;
window.closeModal = closeModal;
window.joinChannel = joinChannel;
window.openAdminPanel = openAdminPanel;
window.exportData = exportData;
window.importData = importData;
window.toggleDarkMode = toggleDarkMode;

// Mantener compatibilidad con funciones anteriores
const filterMovies = (filterType) => {
    currentFilter = filterType;
    visibleMovies = 12;
    loadCatalog();
};

const sortMovies = () => {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    loadCatalog();
};
