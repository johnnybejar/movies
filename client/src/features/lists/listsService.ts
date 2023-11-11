import axios from "axios";

const API_URL = "api/lists";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
});

async function getLists(userToken) {
  const response = await axiosClient.get(API_URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + userToken.token,
    },
  });

  return response.data;
}

function createList() {}

function updateList() {}

function deleteList() {}

const listsService = {
  getLists,
  createList,
  updateList,
  deleteList,
};

export default listsService;
