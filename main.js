const apiKey = "dcaebebf1342d25851db4b075b0be17e";
const movieTitle = "The Nun";

// search for movies details
fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results[0]);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2FlYmViZjEzNDJkMjU4NTFkYjRiMDc1YjBiZTE3ZSIsIm5iZiI6MTcyOTM2NTQzMi4xNTU0NDEsInN1YiI6IjY3MTQwMjBhMmJiYmE2NWY3YjEwZWRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZ88L4Bl5JfNB2IWU0uWx3TmRc5hVw60wKfqVKBgf34",
  },
};

// top rated movies list api
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => displayTopMovies(response))
  .catch((err) => console.error(err));

const displayTopMovies = (data) => {
  const movieContainer = document.getElementById("top-movies");
  // console.log(movies);
  let movies = data.results;
  movies = movies.slice(0, 6);

  movies.forEach((movie) => {
    console.log(movie);
    let voteAvg = movie.vote_average.toFixed(2);
    const movieCard = document.createElement("div");
    movieCard.innerHTML = `
<div class="card bg-[#50727B] w-80  shadow-xl indicator ">
<span class="indicator-item indicator-bottom indicator-start ml-4 badge badge-success ">⭐ ${voteAvg}</span>
  <figure>
    <img
      src="https://image.tmdb.org/t/p/w400${movie?.backdrop_path}"
      alt="Shoes" />
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
