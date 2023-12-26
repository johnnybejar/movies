import { createContext, useState, useContext } from "react";
import { Movie } from "../types/movie";
import { List } from "../types/list";

/**
 * Using a global context to render a list of movies that was selected
 * prevents us from having to query the database again looking for a
 * specific list. We set the list context to the whenever a list is clicked on
 * and in the List.tsx component, we grab whatever is stored in that context
 * and render it.
 */

interface ListA {
  movies: List;
  setMovies: (a: Object) => void;
}

const ListContext = createContext<ListA>({
  movies: { _id: "" },
  setMovies: () => {},
});

export function ListProvider({ children }) {
  const [movies, setMovies] = useState<List>({ _id: "" });

  return (
    <ListContext.Provider value={{ movies, setMovies }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  return useContext(ListContext);
}
