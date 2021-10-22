export interface UserModal {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  projectIds: string[];
  address?: AddressModal;
  identity?: IdentityModal;
  dateOfBirth?: string;
}

export interface AddressModal  {
  province: string;
  city: string;
  district: string;
  street?: string;
}

export enum IdentityType  {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface IdentityModal {
  identityNo: string | null;
  identityType: IdentityType |null;
}
