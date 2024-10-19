const apiKey = "dcaebebf1342d25851db4b075b0be17e";
const movieTitle = "Nun";

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
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
