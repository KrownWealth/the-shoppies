import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./features/moviesSlice";
import { RootState, AppDispatch } from "./store";
import MovieCard from "./components/MovieCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { movies, nominatedMovies, status } = useSelector((state: RootState) => state.movies);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setHasSearched(true);
      dispatch(fetchMovies(searchTerm));
    }
  };

  return (
    <main className="w-full">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-12">
        <h1 className="text-4xl font-bold">The Shoppies</h1>

        {/* Search Input */}
        <div className="flex flex-row items-center justify-center gap-2 rounded-md p-4 bg-gray-100 w-1/2">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for a movie"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md h-10"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-md h-10"
          >
            Search
          </button>
        </div>

        {/* Notification Banner */}
        {nominatedMovies.length === 5 && (
          <div className="bg-green-500 text-white p-2 rounded-md">
            You have nominated 5 movies!
          </div>
        )}

        {/* Nominated Movies Section */}
        <section className="flex flex-col items-start justify-start space-y-4">
          <h2 className="text-2xl font-bold">Nominated Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nominatedMovies.length > 0 ? (
              nominatedMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} isNominated />
              ))
            ) : (
              <p>No movies nominated yet.</p>
            )}
          </div>
        </section>

        {/* All Movies Section */}
        <section className="flex flex-col items-start justify-start space-y-4">
          <h2 className="text-2xl font-bold">All Movies</h2>
          {status === "pending" && hasSearched && <p>Loading...</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!hasSearched ? (
              <p className="text-gray-500">All movies will be here</p>
            ) : movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
