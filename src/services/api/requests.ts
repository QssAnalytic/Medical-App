import { instance } from ".";

const getData = async (path: string) => (await instance.get(path)).data;
const getDataViaPost = async (path: string, { arg }: { arg: unknown }) => (await instance.post(path, arg)).data;
const postData = async (path: string, { arg }: { arg: unknown }) => (await instance.post(path, arg)).data;

export { getData, getDataViaPost, postData };
