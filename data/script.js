  // Data: Books and Reviews
        const data = {
            books: [
                {
                    id: "1",
                    title: "Cien Años de Soledad",
                    author: "Gabriel García Márquez",
                    description: "Una obra maestra de la literatura latinoamericana.",
                    year: 1967,
                    genre: "Ficción",
                    cover: "img/cien_anios_de_soledad.jpg"
                },
                {
                    id: "2",
                    title: "Don Quijote de la Mancha",
                    author: "Miguel de Cervantes",
                    description: "Las aventuras de Don Quijote y su escudero Sancho Panza.",
                    year: 1605,
                    genre: "Clásico",
                    cover: "don_quijote.jpg"
                },
                {
                    id: "3",
                    title: "La Casa de los Espíritus",
                    author: "Isabel Allende",
                    description: "Una saga familiar llena de magia y realismo.",
                    year: 1982,
                    genre: "Realismo mágico",
                    cover: "img/la_casa_de_los_espiritus.jpg"
                }
            ],
            reviews: []
        };

        // Show/Hide Sections
        function showSection(section) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(sec => sec.style.display = 'none');
            document.getElementById(section).style.display = 'block';
        }

        // Display Book List
        function displayBooks() {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';
            data.books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <img src="${book.cover}" alt="${book.title} cover">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                    <p>${book.description}</p>
                    <button onclick="showDetails(${book.id})">Ver más</button>
                `;
                bookList.appendChild(bookDiv);
            });
        }

        // Show Book Details
        function showDetails(bookId) {
            const book = data.books.find(b => b.id === bookId.toString());
            if (book) {
                const bookDetails = document.getElementById('book-details');
                bookDetails.innerHTML = `
                    <img src="${book.cover}" alt="${book.title} cover">
                    <h2>${book.title}</h2>
                    <p>Autor: ${book.author}</p>
                    <p>${book.description}</p>
                    <p>Año de publicación: ${book.year}</p>
                    <p>Género: ${book.genre}</p>
                    <button onclick="addToFavorites(${book.id})">Añadir a Favoritos</button>
                `;
                showSection('details');
            }
        }

        // Add to Favorites
        function addToFavorites(bookId) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(bookId.toString())) {
                favorites.push(bookId.toString());
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Libro añadido a favoritos');
            } else {
                alert('Este libro ya está en tus favoritos');
            }
        }

        // Display Favorites
        function displayFavorites() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const bookList = document.getElementById('favorites-list');
            bookList.innerHTML = '';
            const favoriteBooks = data.books.filter(book => favorites.includes(book.id.toString()));
            favoriteBooks.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <img src="${book.cover}" alt="${book.title} cover">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                    <p>${book.description}</p>
                    <button onclick="showDetails(${book.id})">Ver más</button>
                `;
                bookList.appendChild(bookDiv);
            });
        }

        // Search Books
        document.getElementById('search-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const query = document.getElementById('search-query').value.toLowerCase();
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '';
            
            const results = data.books.filter(book => 
                book.title.toLowerCase().includes(query) || 
                book.author.toLowerCase().includes(query)
            );
            results.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <img src="${book.cover}" alt="${book.title} cover">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                    <p>${book.description}</p>
                    <button onclick="showDetails(${book.id})">Ver más</button>
                `;
                resultsContainer.appendChild(bookDiv);
            });
        });

        // Add Review
        document.getElementById('review-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const bookId = document.getElementById('book-id').value;
            const reviewText = document.getElementById('review-text').value;
            
            data.reviews.push({ bookId, reviewText });
            alert('Reseña añadida');
        });

        // Display Reviews
        function displayReviews() {
            const reviewList = document.getElementById('review-list');
            reviewList.innerHTML = '';
            
            data.reviews.forEach(review => {
                const book = data.books.find(b => b.id === review.bookId);
                if (book) {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.classList.add('book');
                    reviewDiv.innerHTML = `
                        <h2>${book.title}</h2>
                        <p>Reseña: ${review.reviewText}</p>
                    `;
                    reviewList.appendChild(reviewDiv);
                }
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            showSection('home');
            displayBooks();
        });
