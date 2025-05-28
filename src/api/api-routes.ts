export const API_URL = process.env.API_URL;

//Cria novo usuario
export function POST_USER() {
  return {
    url: API_URL + "/usuarios",
  };
}
