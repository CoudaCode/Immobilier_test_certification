import { Request, Response } from "express";
import { AuthRequest } from "../interface/authRequest";
import { compareMdpHash, hasHMdp } from "../utils/Hash";
import { generateToken, tokenVerify } from "../utils/token";
import { IUser, User } from "./../models/users";

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, role, email } = req.body; // Removed phoneNumber
      const exist: IUser | null = await User.findOne({ username });

      if (exist)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user existe déjà" });

      // Hash the password
      const hashedPassword = await hasHMdp(password);
      console.log("hashed password", hashedPassword); // Log the hashed password

      const newUser = await User.create({
        username,
        password: hashedPassword,
        role,
        email,
      });

      if (!newUser)
        return res
          .status(400)
          .json({ statut: false, message: "Erreur lors de la création" });

      res.status(200).json({
        statut: true,
        message: { ...newUser.toObject(), password: undefined },
      });
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async updateUser(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist: IUser | null = await User.findById(id);
      const { password, newPassword, ...body } = req.body;

      if (!exist)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user n'existe pas" });

      if (auth && auth._id !== id) {
        return res
          .status(400)
          .json({ statut: false, message: "Action non autorisée" });
      }

      let updateUser: object;

      if (newPassword) {
        updateUser = await User.updateOne(
          { _id: id },
          { password: await hasHMdp(newPassword), ...body }
        );
      } else {
        updateUser = await User.updateOne({ _id: id }, { ...body });
      }

      if (!updateUser)
        return res
          .status(400)
          .json({ statut: false, message: "Erreur lors de la modification" });

      return res.status(200).json({
        statut: true,
        message: "User modifié !!!",
      });
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async deleteUser(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const user: IUser | null = await User.findById(id);
      if (id !== auth._id)
        return res
          .status(400)
          .json({ statut: false, message: "Action non autorisée" });

      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user n'existe pas" });

      await User.deleteOne({ _id: id });
      res.status(200).json({ statut: true, message: "Succès" });
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: IUser | null = await User.findById(id);
      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user n'existe pas" });

      res.status(200).json({
        statut: true,
        message: { ...user.toObject(), password: undefined },
      });
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body; // Changed to use username

      const exist: IUser | null = await User.findOne({ username });

      if (exist && (await compareMdpHash(password, exist.password))) {
        res.cookie(
          "token",
          generateToken({ ...exist.toObject(), password: undefined }),
          {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }
        );
        return res.status(200).json({
          statut: true,
          message: { ...exist.toObject(), password: undefined },
          token: generateToken({ ...exist.toObject(), password: undefined }),
        });
      }
      res.status(400).json({
        statut: false,
        message: "Nom d'utilisateur ou mot de passe incorrect",
      });
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  static async checkValidateToken(req: Request, res: Response) {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
      }

      const userData = tokenVerify(token);

      if (userData) {
        return res.status(200).json(userData);
      } else {
        return res.status(401).json({ message: "Token invalide ou expiré" });
      }
    } catch (e: any) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default UserController;
