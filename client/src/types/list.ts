import { Movie } from "./movie";

export type ListType = {
  _id: string;
  createdAt?: string;
  list_description?: string;
  list_name?: string;
  movies?: Movie[];
  updatedAt?: string;
  user_id?: string;
};
