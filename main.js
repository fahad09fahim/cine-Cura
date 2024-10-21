const apiKey = "dcaebebf1342d25851db4b075b0be17e";

// search for movies details

const movieData = async (searchText) => {
  console.log(searchText);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`
    );

    if (!response.ok) {
      throw new Error("Movie not found");
    }
    const data = await response.json();
    const movies = data.results[0];
    // console.log(data.results);
    displayMovie(movies);
    if (movies.length === 0) {
      alert("Phone not found");
      location.reload();
      return;
    }
  } catch (error) {
    // Handle network or other errors
    console.error(error);
    alert(error.message || "An error occurred");
  }
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2FlYmViZjEzNDJkMjU4NTFkYjRiMDc1YjBiZTE3ZSIsIm5iZiI6MTcyOTM2NTQzMi4xNTU0NDEsInN1YiI6IjY3MTQwMjBhMmJiYmE2NWY3YjEwZWRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZ88L4Bl5JfNB2IWU0uWx3TmRc5hVw60wKfqVKBgf34",
  },
};

// top rated movies list api
const topMovies = (isShowAll) => {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => displayTopMovies(response, isShowAll))
    .catch((err) => console.error(err));
};
// display top movies
const displayTopMovies = (data, isShowAll) => {
  const movieContainer = document.getElementById("top-movies");
  let movies = data.results;
  const showAll = document.getElementById("showAll-button");
  if (movies.length > 6 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  if (!isShowAll) {
    movies = movies.slice(0, 6);
  }

  movies.forEach((movie) => {
    // console.log(movie);
    let voteAvg = movie.vote_average.toFixed(2);
    const movieCard = document.createElement("div");
    movieCard.innerHTML = `
<div class="card bg-[#50727B] w-80  shadow-xl indicator p-2">
<span class="indicator-item indicator-bottom indicator-start ml-6 badge badge-success ">⭐ ${voteAvg}</span>
  <figure>
    <img
      src="https://image.tmdb.org/t/p/w400${movie?.backdrop_path}"
      alt="movie poster" />
  </figure>
  <div class="p-4">
    <h2 class="text-lg font-semibold truncate">${movie?.title}</h2>
    <p>Release Date: ${movie?.release_date || "Release Date is not found."}</p>
  </div>
</div>
 `;
    movieContainer.appendChild(movieCard);
  });
};
// handle movie search
const handleSearch = () => {
  const searchField = document.getElementById("search-movie");
  const searchText = searchField.value;
  // console.log(searchText);
  movieData(searchText);
};

// handle movie search results
const displayMovie = (movie) => {
  const resultContainer = document.getElementById("result-container");
  const movieCard = document.createElement("div");
  resultContainer.textContent = " ";
  movieCard.innerHTML = `
    <div class="card lg:card-side bg-[#50727B] shadow-xl  ">
  <figure>
    <img
    class="w-full"
      src="https://image.tmdb.org/t/p/w400/${movie?.poster_path}"
      alt="Album" />
  </figure>
  <div class="card-body ">
    <h2 class="text-center text-3xl">${movie?.title}</h2>
    <h4>overview: ${movie?.overview}</h4>
    <h4>Release Date: ${movie?.release_date}</h4>
    <h4>Rating: ${movie?.vote_average.toFixed(2)}/10</h4>
    <h4>Total vote: ${movie?.vote_count}</h4>
    <h4>language: ${movie?.original_language.toUpperCase()}</h4>
  </div>
</div>

    `;
  resultContainer.appendChild(movieCard);
  console.log(movie);
};

const handleShowAll = () => {
  topMovies(true);
};

topMovies();
