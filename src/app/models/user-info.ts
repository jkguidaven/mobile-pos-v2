export interface UserInfo {
  id: number;
  username: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  current_address?: string;
  permanent_addres?: string;
  sacode?: string;
  gender?: string;
  birthdate?: string;
  contact: {
    mobile?: string;
    phone?: string;
    email?: string;
  }
};
