import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type MainContextData = {
  selectedGenreId: number;
  setSelectedGenreId: (state: number) => void;
  genres: GenreResponseProps[];
  setGenres: (state: GenreResponseProps[]) => void;
  movies: MovieProps[];
  setMovies: (state: MovieProps[]) => void;
  selectedGenre: GenreResponseProps;
  setSelectedGenre: (state: GenreResponseProps) => void;
  getGenreData: () => void;
  getMovieData: () => void;
  handleClickButton: (id: number) => void;
}

export const MainContext = createContext({} as MainContextData);

type MainContextProviderProps = {
  children: ReactNode;
}

export function MainContextProvider({ children }: MainContextProviderProps) {
  
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  async function getGenreData() {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }
  async function getMovieData() {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MainContext.Provider
      value={{
        selectedGenreId,
        setSelectedGenreId,
        genres,
        setGenres,
        movies,
        setMovies,
        selectedGenre,
        setSelectedGenre,
        getGenreData,
        getMovieData,
        handleClickButton
      }}>

      {children}

    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  return useContext(MainContext);
}