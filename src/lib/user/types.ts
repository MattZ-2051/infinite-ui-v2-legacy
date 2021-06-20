export interface User {
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  balance: number;
  availableBalance: number;
}
