import express from "express";
import dotenv from "dotenv";
import mongodb, { ObjectId } from "mongodb";
import connectDB from "../config/db";
import asyncHandler from "express-async-handler";
/**
 * {
 *  id: string/number (autoincrement?)
 *  userid: string
 *  listName: string
 *  description: string
 *  movies: Array<string>
 * }
 */

const db = await connectDB();
const listCollection = db?.collection("lists");

export const getLists = asyncHandler(async (req, res) => {
  const cursor = listCollection.find({});

  const results = await cursor.toArray();

  console.log(results);

  if (!results) {
    throw new Error("Error finding lists");
  }

  res.status(200).json(results);
});

export const createList = asyncHandler(async (req, res) => {
  const listName = req.body.listName;
  const listDescription = req.body.listDescription;
  const movies: Array<string> = req.body.movies;

  if (!movies) {
    res.status(400);
    throw new Error("Please add at least one film");
  }

  if (!listName) {
    res.status(400);
    throw new Error("Please give the list a name");
  }

  const doc = {
    user_id: "guajvuiasduiwe",
    list_name: listName,
    list_description: listDescription,
    movies,
  };

  const result = await listCollection?.insertOne(doc);

  if (result) {
    console.log(`A document was inserted with the _id: ${result?.insertedId}`);
  } else {
    console.log("An error occured inserting the document");
  }

  res.status(201).json({
    listName,
    listDescription,
    movies,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

export const updateList = asyncHandler(async (req, res) => {});

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
