export interface UserData {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
  email?: string;
}

export interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}