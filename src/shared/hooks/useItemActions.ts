import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container, CreateItemProps, Item, ItemFormValues } from "../../types";

function useItemActions() {
  const qc = useQueryClient();

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
    retry: false,
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
    retry: false,
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
    retry: false,
  });

  const createNewItem = (
    data: CreateItemProps,
    onSuccess: (newData: { item: Item }) => void,
    onError: () => void
  ) => {
    createItemMutate(data, {
      onSuccess: (data) => {
        onSuccess(data);
        const { item } = data;
        qc.setQueryData<{ items: Item[] }>(["getItems"], (old) =>
          old ? { items: [item, ...old.items] } : old
        );
        qc.setQueryData<{ container: Container }>(
          ["getContainer", item.containerId],
          (old) =>
            old
              ? {
                  ...old,
                  container: {
                    ...old.container,
                    itemsCount: old.container.itemsCount + 1,
                    items: [item, ...old.container.items],
                  },
                }
              : old
        );
        qc.setQueryData<{ containers: Container[] }>(
          ["getContainers"],
          (old) => {
            const containers = old?.containers ?? [];
            return {
              containers: containers.map(
                (container: Container): Container =>
                  container.id === item.containerId
                    ? {
                        ...container,
                        itemsCount: container.itemsCount + 1,
                      }
                    : container
              ),
            };
          }
        );
      },
      onError,
    });
  };

  const deleteItem = (
    id: string,
    containerId: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    deleteItemMutate(id, {
      onSuccess: () => {
        onSuccess();

        qc.setQueryData<{ items: Item[] }>(["getItems"], (old) =>
          old ? { items: old.items.filter((i) => i.id !== id) } : old
        );
        qc.setQueryData<{ container: Container }>(
          ["getContainer", containerId],
          (old) =>
            old
              ? {
                  ...old,
                  container: {
                    ...old.container,
                    itemsCount: old.container.itemsCount - 1,
                    items: old.container.items.filter((i) => i.id !== id),
                  },
                }
              : old
        );
        qc.setQueryData<{ containers: Container[] }>(
          ["getContainers"],
          (old) => {
            const containers = old?.containers ?? [];
            return {
              containers: containers.map(
                (container: Container): Container =>
                  container.id === containerId
                    ? {
                        ...container,
                        itemsCount: container.itemsCount - 1,
                      }
                    : container
              ),
            };
          }
        );
      },
      onError,
    });
  };

  const editItem = (
    data: ItemFormValues,
    onSuccess: (newData: { item: Item }) => void,
    onError: () => void
  ) => {
    editItemMutate(data, {
      onSuccess,
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
