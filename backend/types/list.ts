import { WithId, Document, ObjectId } from "mongodb";
import { Movie } from "./movie";

export type List = {
  _id: ObjectId;
  user_id: ObjectId;
  list_name: string;
  list_description: string;
  movies: Movie[];
  createdAt: Date;
  updatedAt: Date;
};
