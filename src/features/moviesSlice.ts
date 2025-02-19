import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

interface MovieState {
  movies: Movie[];
  nominatedMovies: Movie[];
  status: "pending" | "fulfilled" | "rejected";
}

const initialState: MovieState = {
  movies: [],
  nominatedMovies: [],
  status: "pending",
};

// Async Thunk for Fetching Movies from OMDb API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_OMDB_API_URL}&s=${searchTerm}`
    );
    const data = await response.json();
    return data.Search || [];
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
    },
    nominateMovie: (state, action: PayloadAction<Movie>) => {
      if (state.nominatedMovies.length < 5) {
        state.nominatedMovies.push(action.payload);
      }
    },
    removeNomination: (state, action: PayloadAction<string>) => {
      state.nominatedMovies = state.nominatedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "fulfilled";
          state.movies = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { clearMovies, nominateMovie, removeNomination } =
  movieSlice.actions;
export default movieSlice.reducer;
