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
  imageUrl: Yup.Maybe<string>;
  updatedAt: Date;
  createdAt: Date;
  itemsCount: number;
  items: ContainerItem[];
};

export type ContainerFormValues = {
  name: string;
  description?: string;
  location?: string;
  imageId?: Yup.Maybe<string>;
  imageUrl?: Yup.Maybe<string>;
  id: string;
};

export type ContainerItem = {
  id: string;
  name: string;
  quantity: number;
  updatedAt: Date;
  imageUrl: Yup.Maybe<string>;
};

export type Item = {
  id: string;
  name: string;
  description?: string;
  imageUrl: Yup.Maybe<string>;
  quantity: number;
  containerId: string;
  container: Container;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateItemProps = {
  name: string;
  description?: string;
  imageId?: Yup.Maybe<string>;
  quantity: number;
  containerId: string;
};

export type ItemFormValues = {
  id: string;
  name: string;
  description?: string;
  imageId?: Yup.Maybe<string>;
  imageUrl?: Yup.Maybe<string>;
  quantity: number;
  containerId: string;
};

export enum ContainerType {
  BOX,
}
