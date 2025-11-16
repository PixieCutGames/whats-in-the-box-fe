import * as Yup from "yup";

export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
};

export type CreateContainerProps = {
  name: string;
  description?: string;
  location?: string;
  imageId?: Yup.Maybe<string>;
};

export type Container = {
  id: string;
  type: ContainerType;
  userId: string;
  name: string;
  description?: string;
  location?: string;
  imageUrl: null;
  updatedAt: Date;
  createdAt: Date;
  items: { id: string }[];
};

export type ContainerFormValues = {
  name: string;
  description?: string;
  location?: string;
  imageId?: Yup.Maybe<string>;
  id: string;
};

export type Item = {
  id: string;
};

export enum ContainerType {
  BOX,
}
