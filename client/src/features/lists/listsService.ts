import axios from "axios";
import { Movie } from "../../types/movie";

interface UserToken {
  email: string;
  token: string;
}

const API_URL = "api/lists";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
});

async function getList(userToken: UserToken, id: string) {
  const response = await axiosClient.get(API_URL + `/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + userToken.token,
    },
  });

  return response.data;
}

async function getLists(userToken: UserToken) {
  const response = await axiosClient.get(API_URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + userToken.token,
    },
  });

  return response.data;
}

async function createList(
  userToken: UserToken,
  listName: string,
  listDescription: string,
  movies: Movie[]
) {
  const response = await axiosClient.post(
    API_URL,
    { listName, listDescription, movies },
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + userToken.token,
      },
    }
  );

  return response.data;
}

async function updateList(userToken: UserToken, id: string) {
  const response = await axiosClient.post(API_URL + `/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + userToken.token,
    },
  });

  return response.data;
}

async function deleteList(userToken: UserToken, id: string) {
  const response = await axiosClient.delete(API_URL + `/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + userToken.token,
    },
  });

  return response.data;
}

const listsService = {
  getList,
  getLists,
  createList,
  updateList,
  deleteList,
};

export default listsService;
