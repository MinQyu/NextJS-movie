import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieCast from "../../../../components/movie-cast";
import Loading from "./loading";

export interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default function MovieDetail({ params: { id } }: IParams) {
  const NUM_OF_EXPORT = 7;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <MovieCast id={id} numOfExport={NUM_OF_EXPORT} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
