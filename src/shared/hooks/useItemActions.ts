import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { CreateItemProps, Item, ItemFormValues } from "../../types";

function useItemActions() {
  const {
    mutate: createItemMutate,
    data: newItemData,
    status: newItemStatus,
    error: newItemError,
  } = useMutation({
    mutationFn: async (data: CreateItemProps) => {
      return apiClient<{ item: Item }>("/item/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });

  const {
    mutate: deleteItemMutate,
    data: deleteItemData,
    status: deleteItemStatus,
    error: deleteItemError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return apiClient<{ message: string }>(`/item/${id}`, {
        method: "DELETE",
      });
    },
  });

  const {
    mutate: editItemMutate,
    data: editItemData,
    status: editItemStatus,
    error: editItemError,
  } = useMutation({
    mutationFn: async (data: ItemFormValues) => {
      return apiClient<{ item: Item }>(`/item/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  });

  const createNewItem = (
    data: CreateItemProps,
    onSuccess: (newData: { item: Item }) => void,
    onError: () => void
  ) => {
    createItemMutate(data, {
      onSuccess: (newData) => {
        console.log(newData);
        onSuccess(newData);
      },
      onError,
    });
  };

  const deleteItem = (
    id: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    deleteItemMutate(id, {
      onSuccess,
      onError,
    });
  };

  const editItem = (
    data: ItemFormValues,
    onSuccess: (newData: { item: Item }) => void,
    onError: () => void
  ) => {
    editItemMutate(data, {
      onSuccess: (newData) => {
        console.log(newData);
        onSuccess(newData);
      },
      onError,
    });
  };

  return {
    newItemData,
    newItemError,
    loadingNewItem: newItemStatus === "pending",
    createNewItem,
    deleteItemData,
    deleteItemError,
    loadingDeleteItem: deleteItemStatus === "pending",
    deleteItem,
    editItemData,
    editItemError,
    loadingEditItem: editItemStatus === "pending",
    editItem,
  };
}

export default useItemActions;
