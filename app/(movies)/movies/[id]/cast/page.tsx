import MovieCast from "../../../../../components/movie-cast";
import { IParams } from "../page";

export const metadata = {
  title: "Cast",
};

export default function Cast({ params: { id } }: IParams) {
  return <MovieCast id={id} />;
}
