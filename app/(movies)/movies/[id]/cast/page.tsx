import MovieCast from "../../../../../components/movie-cast";
import { IParams } from "../page";

export default function Cast({ params: { id } }: IParams) {
  return <MovieCast id={id} />;
}
