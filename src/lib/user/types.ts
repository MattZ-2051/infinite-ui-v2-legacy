export interface User {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  balance: number;
  availableBalance: number;
}
