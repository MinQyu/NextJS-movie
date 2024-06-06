import { API_URL } from "../app/constants";
import styles from "../styles/movie-cast.module.css";

interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  order: number;
}

async function getCast(id: string): Promise<ICast[]> {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCast({ id }: { id: string }) {
  const NUMBER_OF_EXPORT = 7;
  const cast = await getCast(id);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      {cast.slice(0, NUMBER_OF_EXPORT).map((c) => (
        <div key={c.id} className={styles.profile_box}>
          <img src={c.profile_path} />
          <p>{c.name}</p>
          <p>{c.character}</p>
        </div>
      ))}
    </div>
  );
}
