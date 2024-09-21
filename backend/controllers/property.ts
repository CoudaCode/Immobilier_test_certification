import { Request, Response } from "express";
import { Property } from "../models/property";
class PropertyController {
  static async getAllProperties(req: Request, res: Response) {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching properties", error });
    }
  }

  static async createProperty(req: Request, res: Response) {
    const { title, description, price, location, image } = req.body;
    try {
      const random = Math.floor(Math.random() * 1000);
      const randomId = Math.floor(Math.random() * 100) + 1;
      const image = `https://picsum.photos/id/${randomId}/${random}/${random}`;
      const newProperty = new Property({
        title,
        description,
        price,
        location,
        image,
      });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(500).json({ message: "Error creating property", error });
    }
  }
}

export default PropertyController;
