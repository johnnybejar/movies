import { ObjectId, OptionalId } from "mongodb";
import connectDB from "../config/db";
import asyncHandler from "express-async-handler";
import { List } from "../types/list";
import { Movie } from "../types/movie";
/**
 * {
 *  id: string/number (autoincrement?)
 *  user_id: string
 *  list_name: string
 *  list_description: string
 *  movies: Array<string>
 * }
 */

const db = await connectDB();
const listCollection = db?.collection<OptionalId<List>>("lists");

export const getLists = asyncHandler(async (req, res) => {
  const cursor = listCollection.find({
    user_id: new ObjectId(req.user?._id),
  });

  const results = (await cursor.toArray()) as List[];

  if (!results) {
    throw new Error("Error finding lists");
  }

  res.status(200).json(results);
});

export const getList = asyncHandler(async (req, res) => {
  const results = await listCollection.findOne({
    user_id: new ObjectId(req.user?._id),
    _id: new ObjectId(req.params.id),
  });

  if (!results) {
    throw new Error("Error finding lists");
  }

  res.status(200).json(results);
});

export const createList = asyncHandler(async (req, res) => {
  const listName = req.body.listName;
  const listDescription = req.body.listDescription;
  const movies: Movie[] = req.body.movies;

  if (!movies) {
    res.status(400);
    throw new Error("Please add at least one film");
  }

  if (!listName) {
    res.status(400);
    throw new Error("Please give the list a name");
  }

  const result = await listCollection?.insertOne({
    user_id: req.user?._id,
    list_name: listName,
    list_description: listDescription,
    movies,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (result) {
    console.log(`A document was inserted with the _id: ${result?.insertedId}`);
  } else {
    console.log("An error occured inserting the document");
  }

  res.status(201).json({
    id: result.insertedId,
    listName,
    listDescription,
    movies,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

export const updateList = asyncHandler(async (req, res) => {
  const listName = req.body.listName;
  const listDescription = req.body.listDescription;
  const movies: Movie[] = req.body.movies;

  if (!movies) {
    res.status(400);
    throw new Error("Please add at least one film");
  }

  if (!listName) {
    res.status(400);
    throw new Error("Please give the list a name");
  }

  const result = await listCollection.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        list_name: listName,
        list_description: listDescription,
        movies,
        updatedAt: new Date(),
      },
    }
  );

  if (!result.lastErrorObject?.updatedExisting) {
    res.status(400).json({ result });
  } else {
    res.status(200).json({ result });
  }
});

export const deleteList = asyncHandler(async (req, res) => {
  const result = await listCollection.findOneAndDelete({
    _id: new ObjectId(req.params.id),
  });

  // Check for result.value bc checking for result.ok
  // will always return 1, even if the document
  // does not exist
  if (result.value) {
    res.status(200).json({ result });
  } else {
    res.status(400).json({ err: "Document does not exist", result });
  }
});
