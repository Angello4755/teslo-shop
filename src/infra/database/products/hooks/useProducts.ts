import { Product } from "src/core/product/entity";
import useSWR, { SWRConfiguration } from "swr";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());


  export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<Product[]>(`/api${url}`, config);
    return {
        products: data,
        isLoading: !error && !data,
        isError: error
    }
  }