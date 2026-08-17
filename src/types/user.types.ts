export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
  STORE = "STORE",
  GUEST = "GUEST",
}

export interface Store {
  id: string;
  name: string;
  siteName?: string;
  logo?: string;
  createAt: Date;
  updateAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  store?: Store;
  createAt: Date;
  updateAt: Date;
}
