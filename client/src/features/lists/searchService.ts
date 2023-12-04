import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/movie?query=",
});

async function searchMovie(query: string) {
  const response = await axiosClient.get(
    query + "&include_adult=true&language=en-US&page=1",
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }
  );

  return response.data;
}

export default searchMovie;
