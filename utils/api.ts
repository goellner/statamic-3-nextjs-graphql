import { DocumentNode } from "graphql";
import { request } from "graphql-request";
import { print } from "graphql/language/printer";

export const fetchData = async <R = Record<string, unknown>>(
  query: DocumentNode | string,
  vars?: Record<string, unknown>
): Promise<R> => {
  const queryString = typeof query === "string" ? query : print(query);

  try {
    const data = await request<R>(process.env.API_URL!, queryString, vars);

    return data;
  } catch (e) {
    console.error(e);
    return {} as R;
  }
};

export const fetchURL = async (url, vars) => {
  try {
    let u = url;
    if (vars) {
      u += "?";
      for (const prop in vars) {
        u += `${prop}=${vars[prop]}`;
        u += "&";
      }
      u = u.substring(0, u.length - 1);
    }

    const data = (await fetch(u)).json();
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};
