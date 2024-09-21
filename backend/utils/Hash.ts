import { compare } from "bcrypt";

export const compareMdpHash = async (
  from: string,
  to: string
): Promise<boolean> => {
  try {
    return await compare(from, to);
  } catch (e) {
    return false;
  }
};

import bcrypt from "bcrypt";

export const hasHMdp = async (password: string): Promise<any> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
