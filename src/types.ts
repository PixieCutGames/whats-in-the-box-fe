import * as Yup from "yup";

export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
};

export type ContainersSearchQuery = {
  limit?: number;
  pinned?: boolean;
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
  pinned: boolean;
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

export type Activity = {
  id: string;
  userId: string;
  type: ActivityType;
  message: string;
  metadata?: Record<string, any>;
  createdAt: Date;
};

export enum ContainerType {
  BOX,
}

export enum ActivityType {
  ITEM_CREATED = "item_created",
  ITEM_UPDATED = "item_updated",
  ITEM_DELETED = "item_deleted",
  CONTAINER_CREATED = "container_created",
  CONTAINER_UPDATED = "container_updated",
  CONTAINER_DELETED = "container_deleted",
  ITEM_MOVED = "item_moved",
}
