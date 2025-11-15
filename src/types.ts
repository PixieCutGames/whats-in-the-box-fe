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
  items: Item[];
};

export type Item = {
  id: string;
};

export enum ContainerType {
  BOX,
}
