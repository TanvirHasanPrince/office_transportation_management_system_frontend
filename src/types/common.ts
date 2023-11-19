export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  success?: boolean,
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ILocation {
  id: string;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  __v: number
}

export interface IAdmin {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    _id: string;
  };
  role: string;
  password: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IEmployee {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    _id: string;
  };
  role: string;
  password: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}