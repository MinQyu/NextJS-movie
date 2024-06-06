import { IProviderData } from "../app/(movies)/movies/[id]/providers/page";
import styles from "../styles/provider.module.css";

interface ProviderProps {
  method: IProviderData[];
}
export default function Provider({ method }: ProviderProps) {
  return (
    <div className={styles.container}>
      {method.map((m) => (
        <img key={m.provider_id} src={m.logo_path} alt={m.provider_name} />
      ))}
    </div>
  );
}
