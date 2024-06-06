import iso3166 from "iso-3166-1";
import Flag from "react-world-flags";
import Provider from "../../../../../components/provider";
import { API_URL } from "../../../../constants";
import { IParams } from "../page";
import styles from "../../../../../styles/providers.module.css";

export const Metadata = {
  title: "Providers",
};

export async function getProviders(id: string) {
  const response = await fetch(`${API_URL}/${id}/providers`);
  return response.json();
}

function getCountryName(countryCode) {
  const country = iso3166.whereAlpha2(countryCode);
  return country ? country.country : "Unknown Country";
}

const renderProviderMethod = (
  methodName: string,
  providerData: IProviderData[]
) => {
  if (!providerData) return null;
  if (methodName === "flatrate" || "ads") {
    providerData.forEach((provider) => {
      provider.logo_path = `https://media.themoviedb.org/t/p/original${provider.logo_path}`;
    });
  }
  return (
    <div key={methodName} className={styles.method_box}>
      <h3>{methodName}</h3>
      <Provider method={providerData} />
    </div>
  );
};

interface IProvider {
  link: string;
  flatrate?: IProviderData[];
  buy?: IProviderData[];
  rent?: IProviderData[];
  ads?: IProviderData[];
}

export interface IProviderData {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export default async function Providers({ params: { id } }: IParams) {
  const providers = await getProviders(id);
  const methods = ["flatrate", "rent", "buy", "ads"];
  return (
    <div className={styles.container}>
      {Object.keys(providers).length ? (
        Object.entries(providers).map(
          ([countryCode, providerData]: [
            countryCode: string,
            providerData: IProvider
          ]) => (
            <div key={countryCode} className={styles.provider}>
              <div className={styles.flag_box}>
                <Flag
                  code={countryCode}
                  style={{ width: "180px", height: "auto" }}
                />
                <div className={styles.link_box}>
                  <h2>{getCountryName(countryCode)}</h2>
                  <a href={providerData.link}>Watch Link &rarr;</a>
                </div>
              </div>
              <hr></hr>
              {methods.map((method) =>
                renderProviderMethod(method, providerData[method])
              )}
            </div>
          )
        )
      ) : (
        <div>There is no provider</div>
      )}
    </div>
  );
}
