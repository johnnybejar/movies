import { createContext, useState, useContext } from "react";
import { Movie } from "../types/movie";

interface List {
  movies: Movie[];
  setMovies: (a: Object) => void;
}

const ListContext = createContext<List>({
  movies: [],
  setMovies: () => {},
});

export function AuthProvider({ children }) {
  const [movies, setMovies] = useState([]);

  return (
    <ListContext.Provider value={{ movies, setMovies }}>
      {children}
    </ListContext.Provider>
  );
}

export function useAuth() {
  return useContext(ListContext);
}
