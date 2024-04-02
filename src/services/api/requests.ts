import { instance } from ".";

const Fetcher = async (path :string) => 
(await instance.get(path)).data;

export { Fetcher };
 