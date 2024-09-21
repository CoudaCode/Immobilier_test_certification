export interface userType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

export interface SignupFormInputs {
  username: string;
  password: string;
  role?: string;
  email: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface LoginResponse {
  statut: boolean;
  message: userType | userType[] | string;
  token?: string;
}
