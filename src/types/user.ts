

export type IUser = {
  name: string;
  email: string;
  phone: string;
  role: "tutor"; // Fixed role value
  image: string;
  iat: number; // Issued at timestamp
  exp: number; // Expiry timestamp
};
