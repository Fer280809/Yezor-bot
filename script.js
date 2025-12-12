// ===== BASE DE DATOS COMPLETA =====

let moviesData = [
    {
        id: 1,
        title: "Dune: Parte Dos",
        description: "Paul Atreides se une a los Fremen en el planeta Arrakis para vengar a su familia y liberar al pueblo.",
        year: 2024,
        rating: 8.7,
        genre: ["ciencia ficcion", "aventura", "drama"],
        duration: "2h 46m",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        language: "Español/Inglés",
        type: "pelicula",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg",
        // Video de YouTube (puede ser cualquier enlace)
        videoUrl: "https://www.youtube.com/embed/Way9Dexny3w",
        // Diferentes calidades de descarga
        downloadLinks: {
            "720p": "https://example.com/dune2-720p.mp4",
            "1080p": "https://example.com/dune2-1080p.mp4",
            "4K": "https://example.com/dune2-4k.mp4"
        }
    },
    {
        id: 2,
        title: "John Wick 4",
        description: "John Wick descubre un camino para derrotar a la Alta Mesa. Pero antes de ganar su libertad...",
        year: 2023,
        rating: 8.2,
        genre: ["accion", "suspenso", "crimen"],
        duration: "2h 49m",
        director: "Chad Stahelski",
        actors: "Keanu Reeves, Donnie Yen, Bill Skarsgård",
        language: "Español/Inglés",
        type: "pelicula",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        videoUrl: "https://www.youtube.com/embed/qEVUtrk8_B4",
        downloadLinks: {
            "720p": "https://example.com/johnwick4-720p.mp4",
            "1080p": "https://example.com/johnwick4-1080p.mp4"
        }
    },
    {
        id: 3,
        title: "Spider-Man: Across the Spider-Verse",
        description: "Miles Morales se embarca en una aventura épica que transportará al Spider-Man en ciernes a través del Multiverso.",
        year: 2023,
        rating: 8.6,
        genre: ["animacion", "accion", "aventura"],
        duration: "2h 20m",
        director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
        actors: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
        language: "Español/Inglés",
        type: "pelicula",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        videoUrl: "https://www.youtube.com/embed/shW9i6k8cB0",
        downloadLinks: {
            "720p": "https://example.com/spiderverse-720p.mp4",
            "1080p": "https://example.com/spiderverse-1080p.mp4"
        }
    },
    {
        id: 4,
        title: "Oppenheimer",
        description: "La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.",
        year: 2023,
        rating: 8.3,
        genre: ["drama", "historia", "biografia"],
        duration: "3h 00m",
        director: "Christopher Nolan",
        actors: "Cillian Murphy, Emily Blunt, Matt Damon",
        language: "Español/Inglés",
        type: "pelicula",
        coverImage: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR3n8zh.jpg",
        videoUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
        downloadLinks: {
            "720p": "https://example.com/oppenheimer-720p.mp4",
            "1080p": "https://example.com/oppenheimer-1080p.mp4"
        }
    },
    {
        id: 5,
        title: "The Batman",
        description: "Batman explora la corrupción en Gotham City mientras persigue al asesino serial conocido como el Acertijo.",
        year: 2022,
        rating: 7.8,
        genre: ["accion", "drama", "crimen"],
        duration: "2h 56m",
        director: "Matt Reeves",
        actors: "Robert Pattinson, Zoë Kravitz, Paul Dano",
        language: "Español/Inglés",
        type: "pelicula",
        coverImage: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        videoUrl: "https://www.youtube.com/embed/mqqft2x_Aa4",
        downloadLinks: {
            "720p": "https://example.com/batman-720p.mp4",
            "1080p": "https://example.com/batman-1080p.mp4"
        }
    },
    {
        id: 6,
        title: "Avatar: The Way of Water",
        description: "Jake Sully y Ney'tiri forman una familia en Pandora, pero deben enfrentar nuevas amenazas.",
        year: 2022,
        rating: 7.6,
        genre: ["ciencia ficcion", "aventura", "accion"],
        duration: "3h 12m",
        director: "James Cameron",
        actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        language: "Español/Inglés",
        type: "pelicula",
        coverImage: "https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
        videoUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
        downloadLinks: {
            "720p": "https://example.com/avatar2-720p.mp4",
            "1080p": "https://example.com/avatar2-1080p.mp4"
        }
    },
    {
        id: 7,
        title: "Top Gun: Maverick",
        description: "Después de más de treinta años de servicio, Maverick se enfrenta a los fantasmas de su pasado.",
        year: 2022,
        rating: 8.2,
        genre: ["accion", "drama"],
        duration: "2h 10m",
        director: "Joseph Kosinski",
        actors: "Tom Cruise, Miles Teller, Jennifer Connelly",
        language: "Español/Inglés",
        type: "pelicula",
        coverImage: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        videoUrl: "https://www.youtube.com/embed/giXco2jaZ_4",
        downloadLinks: {
            "720p": "https://example.com/topgun-720p.mp4",
            "1080p": "https://example.com/topgun-1080p.mp4"
        }
    },
    {
        id: 8,
        title: "Black Panther: Wakanda Forever",
        description: "El pueblo de Wakanda lucha para proteger su nación tras la muerte del Rey T'Challa.",
        year: 2022,
        rating: 7.2,
        genre: ["accion", "aventura", "drama"],
        duration: "2h 41m",
        director: "Ryan Coogler",
        actors: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
        language: "Español/Inglés",
        type: "pelicula",
        coverImage: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
        videoUrl: "https://www.youtube.com/embed/RlOB3UALvrQ",
        downloadLinks: {
            "720p": "https://example.com/wakanda-720p.mp4",
            "1080p": "https://example.com/wakanda-1080p.mp4"
        }
    }
];

let seriesData = [
    {
        id: 101,
        title: "Stranger Things",
        description: "Un grupo de niños se enfrenta a fuerzas sobrenaturales en su pequeño pueblo, mientras el gobierno investiga fenómenos paranormales.",
        year: 2016,
        rating: 8.7,
        genre: ["drama", "ciencia ficcion", "terror"],
        status: "En emisión",
        episodeDuration: "50m",
        creator: "Hermanos Duffer",
        actors: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
        language: "Español/Inglés",
        type: "serie",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        // Temporadas y episodios
        seasons: [
            {
                seasonNumber: 1,
                episodes: 8,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Capítulo Uno: La desaparición de Will Byers",
                        duration: "48m",
                        description: "En un pequeño pueblo, un niño desaparece misteriosamente.",
                        videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
                        downloadLinks: {
                            "720p": "https://example.com/st-s1e1-720p.mp4",
                            "1080p": "https://example.com/st-s1e1-1080p.mp4"
                        }
                    },
                    {
                        episodeNumber: 2,
                        title: "Capítulo Dos: La loca de la calle Maple",
                        duration: "52m",
                        description: "Los amigos de Will buscan respuestas en el bosque.",
                        videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
                        downloadLinks: {
                            "720p": "https://example.com/st-s1e2-720p.mp4",
                            "1080p": "https://example.com/st-s1e2-1080p.mp4"
                        }
                    }
                ]
            },
            {
                seasonNumber: 2,
                episodes: 9,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Capítulo Uno: MADMAX",
                        duration: "50m",
                        description: "Un año después, el grupo conoce a una nueva chica.",
                        videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
                        downloadLinks: {
                            "720p": "https://example.com/st-s2e1-720p.mp4",
                            "1080p": "https://example.com/st-s2e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 102,
        title: "The Mandalorian",
        description: "Un pistolero solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República.",
        year: 2019,
        rating: 8.8,
        genre: ["ciencia ficcion", "aventura", "accion"],
        status: "En emisión",
        episodeDuration: "40m",
        creator: "Jon Favreau",
        actors: "Pedro Pascal, Carl Weathers, Gina Carano",
        language: "Español/Inglés",
        type: "serie",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxw0kdF8tVkP1.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: 8,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Capítulo 1: El Mandaloriano",
                        duration: "39m",
                        description: "Un pistolero solitario acepta un misterioso trabajo.",
                        videoUrl: "https://www.youtube.com/embed/aOC8E8z_ifw",
                        downloadLinks: {
                            "720p": "https://example.com/mando-s1e1-720p.mp4",
                            "1080p": "https://example.com/mando-s1e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 103,
        title: "Breaking Bad",
        description: "Un profesor de química con cáncer se asocia con un exalumno para fabricar y vender metanfetamina.",
        year: 2008,
        rating: 9.5,
        genre: ["drama", "crimen", "suspenso"],
        status: "Finalizada",
        episodeDuration: "49m",
        creator: "Vince Gilligan",
        actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
        language: "Español/Inglés",
        type: "serie",
        coverImage: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: 7,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Piloto",
                        duration: "58m",
                        description: "Walter White, un profesor de química, descubre que tiene cáncer.",
                        videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY",
                        downloadLinks: {
                            "720p": "https://example.com/bb-s1e1-720p.mp4",
                            "1080p": "https://example.com/bb-s1e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 104,
        title: "Game of Thrones",
        description: "Nobles familias luchan por el control del Trono de Hierro de los Siete Reinos de Westeros.",
        year: 2011,
        rating: 9.2,
        genre: ["drama", "aventura", "fantasia"],
        status: "Finalizada",
        episodeDuration: "60m",
        creator: "David Benioff, D.B. Weiss",
        actors: "Emilia Clarke, Kit Harington, Peter Dinklage",
        language: "Español/Inglés",
        type: "serie",
        coverImage: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: 10,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Winter Is Coming",
                        duration: "62m",
                        description: "Lord Ned Stark se convierte en la Mano del Rey.",
                        videoUrl: "https://www.youtube.com/embed/BpJYNVhGf1s",
                        downloadLinks: {
                            "720p": "https://example.com/got-s1e1-720p.mp4",
                            "1080p": "https://example.com/got-s1e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 105,
        title: "The Witcher",
        description: "Geralt de Rivia, un cazador de monstruos mutante, viaja en busca de su destino en un mundo turbulento.",
        year: 2019,
        rating: 8.2,
        genre: ["aventura", "fantasia", "accion"],
        status: "En emisión",
        episodeDuration: "60m",
        creator: "Lauren Schmidt Hissrich",
        actors: "Henry Cavill, Anya Chalotra, Freya Allan",
        language: "Español/Inglés",
        type: "serie",
        isFeatured: true,
        coverImage: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: 8,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "El principio del fin",
                        duration: "61m",
                        description: "Geralt de Rivia, un cazador de monstruos, descubre su destino.",
                        videoUrl: "https://www.youtube.com/embed/ndl1W4ltcmg",
                        downloadLinks: {
                            "720p": "https://example.com/witcher-s1e1-720p.mp4",
                            "1080p": "https://example.com/witcher-s1e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 106,
        title: "La Casa de Papel",
        description: "Ocho ladrones toman rehenes en la Fábrica Nacional de Moneda y Timbre de España.",
        year: 2017,
        rating: 8.2,
        genre: ["drama", "crimen", "suspenso"],
        status: "Finalizada",
        episodeDuration: "50m",
        creator: "Álex Pina",
        actors: "Úrsula Corberó, Álvaro Morte, Itziar Ituño",
        language: "Español",
        type: "serie",
        coverImage: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: 13,
                episodesList: [
                    {
                        episodeNumber: 1,
                        title: "Episodio 1",
                        duration: "50m",
                        description: "El Profesor recluta a un equipo para el mayor atraco de la historia.",
                        videoUrl: "https://www.youtube.com/embed/To_kVMMu-Ls",
                        downloadLinks: {
                            "720p": "https://example.com/lcdp-s1e1-720p.mp4",
                            "1080p": "https://example.com/lcdp-s1e1-1080p.mp4"
                        }
                    }
                ]
            }
        ]
    }
];

// ===== ESTADO GLOBAL =====
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let downloads = JSON.parse(localStorage.getItem('downloads')) || [];
let currentContent = null;

// ===== FUNCIONES DE NAVEGACIÓN =====
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    document.getElementById(sectionId).classList.add('active');
    
    switch(sectionId) {
        case 'inicio':
            loadHomeContent();
            break;
        case 'peliculas':
            loadAllMovies();
            break;
        case 'series':
            loadAllSeries();
            break;
        case 'favoritos':
            loadFavorites();
            break;
        case 'descargas':
            loadDownloads();
            break;
    }
}

// ===== FUNCIONES DE CONTENIDO =====
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = item.id;
    card.dataset.type = item.type;
    
    const isFavorite = favorites.includes(item.id);
    
    card.innerHTML = `
        ${item.type === 'serie' ? '<span class="badge serie">SERIE</span>' : ''}
        ${item.isFeatured ? '<span class="badge new">NUEVO</span>' : ''}
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id}, event)">
            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <img src="${item.coverImage}" 
             alt="${item.title}" 
             class="movie-poster"
             onerror="this.src='https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image'">
        <div class="movie-info">
            <h3 class="movie-title">${item.title}</h3>
            <p class="movie-description">${item.description}</p>
            <div class="movie-meta">
                <span class="movie-year">${item.year}</span>
                <span class="movie-rating">${item.rating}/10</span>
            </div>
            ${item.type === 'serie' ? `<div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--accent);">
                <i class="fas fa-tv"></i> ${item.seasons ? item.seasons.length + ' Temp' : '1 Temp'}
            </div>` : ''}
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.favorite-btn')) {
            showDetail(item);
        }
    });
    
    return card;
}

// ===== FUNCIONES DE DETALLE =====
function showDetail(item) {
    currentContent = item;
    const modal = document.getElementById('detailModal');
    const modalBody = document.querySelector('.modal-body');
    
    if (item.type === 'serie') {
        modalBody.innerHTML = createSerieDetailHTML(item);
    } else {
        modalBody.innerHTML = createMovieDetailHTML(item);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createMovieDetailHTML(movie) {
    const isFavorite = favorites.includes(movie.id);
    
    return `
        <div class="detail-header">
            <img src="${movie.coverImage}" alt="${movie.title}" class="detail-poster">
            <div class="detail-info">
                <h1>${movie.title} (${movie.year})</h1>
                <div class="detail-meta">
                    <span class="genre">${movie.genre.join(', ')}</span>
                    <span class="duration">${movie.duration}</span>
                    <span class="rating">⭐ ${movie.rating}/10</span>
                </div>
                <p class="description">${movie.description}</p>
                
                <div class="detail-actions">
                    <button class="action-btn watch-btn" onclick="playVideo('${movie.videoUrl}', '${movie.title}')">
                        <i class="fas fa-play"></i> Ver Ahora
                    </button>
                    <button class="action-btn favorite-btn-detail ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${movie.id})">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> Favorito
                    </button>
                    <button class="action-btn download-btn" onclick="showDownloadOptions(${movie.id}, '${movie.title}')">
                        <i class="fas fa-download"></i> Descargar
                    </button>
                </div>
                
                <div class="detail-extra">
                    <h3><i class="fas fa-info-circle"></i> Información</h3>
                    <div class="info-grid">
                        <div><strong>Director:</strong> ${movie.director}</div>
                        <div><strong>Actores:</strong> ${movie.actors}</div>
                        <div><strong>Idioma:</strong> ${movie.language}</div>
                        <div><strong>Duración:</strong> ${movie.duration}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSerieDetailHTML(serie) {
    const isFavorite = favorites.includes(serie.id);
    
    let seasonsHTML = '';
    if (serie.seasons) {
        seasonsHTML = `
            <div class="seasons-container">
                <h3><i class="fas fa-layer-group"></i> Temporadas</h3>
                ${serie.seasons.map(season => `
                    <div class="season-card" onclick="showSeasonEpisodes(${serie.id}, ${season.seasonNumber})">
                        <div class="season-header">
                            <h4>Temporada ${season.seasonNumber}</h4>
                            <span>${season.episodes} episodios</span>
                        </div>
                        <div class="season-episodes" id="season-${serie.id}-${season.seasonNumber}" style="display: none;">
                            ${season.episodesList ? season.episodesList.map(episode => `
                                <div class="episode-card" onclick="playEpisode('${episode.videoUrl}', '${serie.title} - ${episode.title}')">
                                    <div class="episode-number">${episode.episodeNumber}</div>
                                    <h5>${episode.title}</h5>
                                    <p class="episode-duration">${episode.duration}</p>
                                    <button class="download-episode-btn" onclick="showEpisodeDownload(${serie.id}, ${season.seasonNumber}, ${episode.episodeNumber}, event)">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    return `
        <div class="detail-header">
            <img src="${serie.coverImage}" alt="${serie.title}" class="detail-poster">
            <div class="detail-info">
                <h1>${serie.title} (${serie.year})</h1>
                <div class="detail-meta">
                    <span class="genre">${serie.genre.join(', ')}</span>
                    <span class="status">${serie.status}</span>
                    <span class="rating">⭐ ${serie.rating}/10</span>
                </div>
                <p class="description">${serie.description}</p>
                
                <div class="detail-actions">
                    <button class="action-btn favorite-btn-detail ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${serie.id})">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> Favorito
                    </button>
                    <button class="action-btn download-btn" onclick="showSerieDownloadOptions(${serie.id}, '${serie.title}')">
                        <i class="fas fa-download"></i> Descargar Serie
                    </button>
                </div>
                
                <div class="detail-extra">
                    <h3><i class="fas fa-info-circle"></i> Información</h3>
                    <div class="info-grid">
                        <div><strong>Creador:</strong> ${serie.creator}</div>
                        <div><strong>Actores:</strong> ${serie.actors}</div>
                        <div><strong>Idioma:</strong> ${serie.language}</div>
                        <div><strong>Duración episodio:</strong> ${serie.episodeDuration}</div>
                        <div><strong>Temporadas:</strong> ${serie.seasons ? serie.seasons.length : 1}</div>
                        <div><strong>Estado:</strong> ${serie.status}</div>
                    </div>
                </div>
            </div>
        </div>
        ${seasonsHTML}
    `;
}

// ===== FUNCIONES DE VIDEO =====
function playVideo(videoUrl, title) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoInfo = document.getElementById('videoInfo');
    
    // Configurar el iframe con el video
    // Puede ser YouTube, Vimeo, o un enlace directo a MP4
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // Extraer ID de YouTube
        const videoId = videoUrl.includes('v=') ? 
            videoUrl.split('v=')[1].split('&')[0] : 
            videoUrl.split('/').pop();
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else if (videoUrl.includes('vimeo.com')) {
        // Vimeo
        const videoId = videoUrl.split('/').pop();
        videoPlayer.src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    } else {
        // Enlace directo a MP4 u otro formato
        videoPlayer.src = videoUrl;
    }
    
    videoInfo.innerHTML = `<h3>${title}</h3>`;
    
    // Mostrar opciones de descarga si es una película
    if (currentContent && currentContent.type === 'pelicula' && currentContent.downloadLinks) {
        showDownloadButtons(currentContent.downloadLinks, title);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function playEpisode(videoUrl, title) {
    playVideo(videoUrl, title);
}

// ===== FUNCIONES DE DESCARGA =====
function showDownloadOptions(contentId, title) {
    const content = [...moviesData, ...seriesData].find(item => item.id === contentId);
    if (!content || !content.downloadLinks) return;
    
    showDownloadButtons(content.downloadLinks, title);
}

function showSerieDownloadOptions(serieId, title) {
    const serie = seriesData.find(s => s.id === serieId);
    if (!serie) return;
    
    const modal = document.getElementById('videoModal');
    const qualityButtons = document.getElementById('qualityButtons');
    
    let buttonsHTML = '';
    
    // Opción para descargar toda la serie
    if (serie.seasons) {
        serie.seasons.forEach(season => {
            if (season.episodesList) {
                season.episodesList.forEach(episode => {
                    if (episode.downloadLinks) {
                        Object.entries(episode.downloadLinks).forEach(([quality, url]) => {
                            buttonsHTML += `
                                <button class="quality-btn" onclick="downloadFile('${url}', '${serie.title} - Temp ${season.seasonNumber} Ep ${episode.episodeNumber} - ${quality}')">
                                    <span class="quality-label">T${season.seasonNumber} E${episode.episodeNumber} - ${quality}</span>
                                    <span class="quality-size">~1.5 GB</span>
                                </button>
                            `;
                        });
                    }
                });
            }
        });
    }
    
    qualityButtons.innerHTML = buttonsHTML || '<p>No hay enlaces de descarga disponibles</p>';
    modal.classList.add('active');
}

function showEpisodeDownload(serieId, seasonNum, episodeNum, event) {
    event.stopPropagation();
    
    const serie = seriesData.find(s => s.id === serieId);
    if (!serie || !serie.seasons) return;
    
    const season = serie.seasons.find(s => s.seasonNumber === seasonNum);
    if (!season || !season.episodesList) return;
    
    const episode = season.episodesList.find(e => e.episodeNumber === episodeNum);
    if (!episode || !episode.downloadLinks) return;
    
    showDownloadButtons(episode.downloadLinks, `${serie.title} - Temp ${seasonNum} Ep ${episodeNum}`);
}

function showDownloadButtons(downloadLinks, title) {
    const qualityButtons = document.getElementById('qualityButtons');
    
    let buttonsHTML = '';
    Object.entries(downloadLinks).forEach(([quality, url]) => {
        buttonsHTML += `
            <button class="quality-btn" onclick="downloadFile('${url}', '${title} - ${quality}')">
                <span class="quality-label">${quality}</span>
                <span class="quality-size">${quality === '4K' ? '~5 GB' : quality === '1080p' ? '~2 GB' : '~1 GB'}</span>
            </button>
        `;
    });
    
    qualityButtons.innerHTML = buttonsHTML;
}

function downloadFile(url, filename) {
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Guardar en historial de descargas
    const downloadItem = {
        id: Date.now(),
        title: filename,
        url: url,
        date: new Date().toLocaleString(),
        status: 'completado'
    };
    
    downloads.unshift(downloadItem);
    localStorage.setItem('downloads', JSON.stringify(downloads));
    
    alert(`Descarga iniciada: ${filename}`);
}

// ===== FUNCIONES DE FAVORITOS =====
function toggleFavorite(contentId, event) {
    if (event) event.stopPropagation();
    
    const index = favorites.indexOf(contentId);
    if (index === -1) {
        favorites.push(contentId);
        alert('Agregado a favoritos');
    } else {
        favorites.splice(index, 1);
        alert('Eliminado de favoritos');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Actualizar botones de favorito
    updateFavoriteButtons(contentId);
    
    // Si estamos en la sección de favoritos, recargar
    if (document.getElementById('favoritos').classList.contains('active')) {
        loadFavorites();
    }
}

function updateFavoriteButtons(contentId) {
    // Actualizar botones en tarjetas
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        if (btn.closest('.movie-card').dataset.id == contentId) {
            const isFavorite = favorites.includes(parseInt(contentId));
            btn.classList.toggle('active', isFavorite);
            btn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>`;
        }
    });
    
    // Actualizar botón en detalle
    const detailBtn = document.querySelector('.favorite-btn-detail');
    if (detailBtn && currentContent && currentContent.id == contentId) {
        const isFavorite = favorites.includes(contentId);
        detailBtn.classList.toggle('active', isFavorite);
        detailBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> Favorito`;
    }
}

// ===== FUNCIONES DE CARGA =====
function loadHomeContent() {
    const popularGrid = document.getElementById('popularGrid');
    const seriesGrid = document.getElementById('seriesGrid');
    const estrenosGrid = document.getElementById('estrenosGrid');
    
    // Películas populares
    const popularMovies = moviesData.filter(m => m.isFeatured).slice(0, 6);
    popularGrid.innerHTML = '';
    popularMovies.forEach(movie => {
        popularGrid.appendChild(createContentCard(movie));
    });
    
    // Series destacadas
    const featuredSeries = seriesData.filter(s => s.isFeatured).slice(0, 6);
    seriesGrid.innerHTML = '';
    featuredSeries.forEach(serie => {
        seriesGrid.appendChild(createContentCard(serie));
    });
    
    // Estrenos (últimas películas)
    const estrenos = [...moviesData].sort((a, b) => b.year - a.year).slice(0, 6);
    estrenosGrid.innerHTML = '';
    estrenos.forEach(movie => {
        estrenosGrid.appendChild(createContentCard(movie));
    });
}

function loadAllMovies() {
    const grid = document.getElementById('peliculasGrid');
    grid.innerHTML = '';
    
    moviesData.forEach(movie => {
        grid.appendChild(createContentCard(movie));
    });
}

function loadAllSeries() {
    const grid = document.getElementById('allSeriesGrid');
    grid.innerHTML = '';
    
    seriesData.forEach(serie => {
        grid.appendChild(createContentCard(serie));
    });
}

function loadFavorites() {
    const grid = document.getElementById('favoritosGrid');
    grid.innerHTML = '';
    
    if (favorites.length === 0) {
        grid.innerHTML = '<p class="empty-message">No tienes favoritos aún</p>';
        return;
    }
    
    const allContent = [...moviesData, ...seriesData];
    favorites.forEach(favId => {
        const content = allContent.find(item => item.id === favId);
        if (content) {
            grid.appendChild(createContentCard(content));
        }
    });
}

function loadDownloads() {
    const container = document.getElementById('downloadsContainer');
    
    if (downloads.length === 0) {
        container.innerHTML = '<p class="empty-message">No hay descargas recientes</p>';
        return;
    }
    
    let downloadsHTML = '';
    downloads.forEach(download => {
        downloadsHTML += `
            <div class="download-item">
                <img src="https://via.placeholder.com/100x150/2a2a2a/ffffff?text=🎬" alt="Download">
                <div class="download-info">
                    <h4>${download.title}</h4>
                    <div class="download-meta">
                        <span><i class="far fa-calendar"></i> ${download.date}</span>
                        <span><i class="fas fa-download"></i> ${download.status}</span>
                    </div>
                    <button class="download-again-btn" onclick="window.open('${download.url}', '_blank')">
                        <i class="fas fa-redo"></i> Descargar de nuevo
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = downloadsHTML;
}

// ===== FUNCIONES DE FILTRO =====
function filterAll() {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    showSection('inicio');
}

function filterByGenre(genre) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrar y mostrar contenido del género seleccionado
    const allContent = [...moviesData, ...seriesData];
    const filtered = allContent.filter(item => 
        item.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
    
    const grid = document.getElementById('peliculasGrid');
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.innerHTML = `<p class="empty-message">No hay contenido en ${genre}</p>`;
        return;
    }
    
    filtered.forEach(item => {
        grid.appendChild(createContentCard(item));
    });
    
    // Cambiar a sección de películas para mostrar resultados
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('peliculas').classList.add('active');
}

// ===== FUNCIONES DE BÚSQUEDA =====
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') return;
    
    const allContent = [...moviesData, ...seriesData];
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.genre.some(g => g.toLowerCase().includes(query))
    );
    
    const grid = document.getElementById('peliculasGrid');
    grid.innerHTML = '';
    
    if (results.length === 0) {
        grid.innerHTML = '<p class="empty-message">No se encontraron resultados</p>';
    } else {
        results.forEach(item => {
            grid.appendChild(createContentCard(item));
        });
    }
    
    // Mostrar resultados en sección de películas
    showSection('peliculas');
    searchInput.value = '';
}

// ===== FUNCIONES DE TEMPORADAS =====
function showSeasonEpisodes(serieId, seasonNum) {
    const seasonDiv = document.getElementById(`season-${serieId}-${seasonNum}`);
    const isVisible = seasonDiv.style.display === 'block';
    
    // Ocultar todas las temporadas primero
    document.querySelectorAll('.season-episodes').forEach(div => {
        div.style.display = 'none';
    });
    
    // Mostrar/ocultar la temporada seleccionada
    seasonDiv.style.display = isVisible ? 'none' : 'block';
}

// ===== FUNCIONES DE MODAL =====
function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Pausar video
    videoPlayer.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modales al hacer clic fuera
window.addEventListener('click', (e) => {
    const detailModal = document.getElementById('detailModal');
    const videoModal = document.getElementById('videoModal');
    
    if (e.target === detailModal) {
        closeModal();
    }
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadHomeContent();
    
    // Agregar evento de búsqueda con Enter
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Estilos adicionales para elementos dinámicos
const style = document.createElement('style');
style.textContent = `
    .empty-message {
        text-align: center;
        padding: 3rem;
        color: var(--gray);
        font-size: 1.2rem;
        grid-column: 1 / -1;
    }
    
    .detail-header {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .detail-poster {
        width: 100%;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }
    
    .detail-info h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .detail-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .detail-meta span {
        padding: 0.5rem 1rem;
        background-color: var(--gray-light);
        border-radius: 20px;
        font-size: 0.9rem;
    }
    
    .detail-meta .genre {
        background-color: #ff9f43;
        color: #000;
    }
    
    .detail-meta .rating {
        background-color: var(--primary);
        color: white;
    }
    
    .description {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        color: var(--gray);
    }
    
    .detail-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .action-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: var(--radius);
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
    }
    
    .watch-btn {
        background-color: var(--primary);
        color: white;
    }
    
    .watch-btn:hover {
        background-color: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    .favorite-btn-detail {
        background-color: var(--gray-light);
        color: white;
    }
    
    .favorite-btn-detail.active {
        background-color: #ff4757;
    }
    
    .download-btn {
        background-color: var(--accent);
        color: white;
    }
    
    .detail-extra {
        background-color: var(--gray-dark);
        padding: 1.5rem;
        border-radius: var(--radius);
        margin-top: 2rem;
    }
    
    .detail-extra h3 {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .info-grid div {
        padding: 0.5rem;
        background-color: rgba(255,255,255,0.05);
        border-radius: 8px;
    }
    
    .download-again-btn {
        padding: 0.5rem 1rem;
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: var(--radius);
        cursor: pointer;
        margin-top: 0.5rem;
    }
    
    .download-episode-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--accent);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @media (max-width: 768px) {
        .detail-header {
            grid-template-columns: 1fr;
        }
        
        .detail-poster {
            max-width: 300px;
            margin: 0 auto;
        }
        
        .detail-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
