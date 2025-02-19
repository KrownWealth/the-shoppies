import { useDispatch, useSelector } from "react-redux";
import { nominateMovie, removeNomination } from "../features/moviesSlice";
import { RootState } from "../store";

interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Poster: string;
  };
  isNominated?: boolean;
}

const MovieCard = ({ movie, isNominated = false }: MovieCardProps) => {
  if (!movie) return null;

  const dispatch = useDispatch();
  const nominatedMovies = useSelector((state: RootState) => state.movies.nominatedMovies);
  const isAlreadyNominated = nominatedMovies.some((nom) => nom.imdbID === movie.imdbID);

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md p-4">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-semibold">Title: {movie.Title}</h2>

        {isNominated ? (
          <button
            className="bg-red-500 text-white p-2 rounded-md h-10"
            onClick={() => dispatch(removeNomination(movie.imdbID))}
          >
            Remove
          </button>
        ) : (
          <button
            className={`p-2 rounded-md h-10 ${isAlreadyNominated ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
            onClick={() => dispatch(nominateMovie(movie))}
            disabled={isAlreadyNominated}
          >
            {isAlreadyNominated ? "Nominated" : "Nominate"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
