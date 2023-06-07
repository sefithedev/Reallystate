const propertyController = require("express").Router();
const mongoose = require("mongoose");
const Property = require("../models/PropertyModel");
const verifyToken = require("../middlewares/verifyTokem");
const { request } = require("express");

// get all
propertyController.get("/get-all", async (req, res) => {
  try {
    const properties = await Property.find({}).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get featured
propertyController.get("/get-featured", async (req, res) => {
  try {
    const properties = await Property.find({ featured: true });
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get all of a specific type
propertyController.get("/get-type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const typeValues = Property.schema
      .path("type")
      .enumValues.map((value) => value.toLowerCase());
    const lowercaseType = type.toLowerCase();

    if (!typeValues.includes(lowercaseType)) {
      return res
        .status(404)
        .json({ message: "Can't find properties of this type" });
    }

    const properties = await Property.find({ type: lowercaseType });
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get count per type
propertyController.get("/get-count", async (req, res) => {
  try {
    const typeValues = Property.schema.path("type").enumValues;
    let properties = {};
    for (const typeValue of typeValues) {
      properties[typeValue] = await Property.countDocuments({
        type: typeValue,
      });
    }
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get single propert
propertyController.get("/get-single/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const property = await Property.find({ _id: objectId }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(property[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// create new property
propertyController.post("/new", verifyToken, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      currentOwner: req.user.id,
    });
    await property.save();
    return res.status(201).json(property);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// update property
propertyController.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    let property = await Property.findOne({ _id: objectId });
    const userId = property.currentOwner;

    if (userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized to change properties of other owners",
      });
    }
    Object.assign(property, { objectId, ...req.body });
    await property.save();
    return res.status(201).json(property);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// delete property
propertyController.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    let property = await Property.findOne({ _id: objectId });
    const userId = property.currentOwner;

    if (userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized to change properties of other owners",
      });
    }

    await property.deleteOne();
    return res
      .status(201)
      .json({ message: "property was deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = propertyController;
