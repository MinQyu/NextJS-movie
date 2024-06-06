import Link from "next/link";
import { API_URL } from "../app/constants";
import styles from "../styles/movie-cast.module.css";

export interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  order: number;
}

export async function getCast(id: string): Promise<ICast[]> {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCast({
  id,
  numOfExport,
}: {
  id: string;
  numOfExport?: number;
}) {
  const cast = await getCast(id);
  const NUM_OF_EXPORT = numOfExport ? numOfExport : cast.length;
  const defaultImagePath = "/images/no_img.png";
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      {numOfExport ? (
        <Link href={`/movies/${id}/cast`}>more &rarr;</Link>
      ) : (
        <></>
      )}
      {cast.slice(0, NUM_OF_EXPORT).map((c) => (
        <div key={c.id} className={styles.profile_box}>
          <img
            src={c.profile_path ? c.profile_path : defaultImagePath}
            alt="no_img"
          />
          <p>{c.name}</p>
          <p>{c.character}</p>
        </div>
      ))}
    </div>
  );
}
