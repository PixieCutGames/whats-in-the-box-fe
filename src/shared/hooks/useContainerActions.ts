import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import {
  Container,
  ContainerFormValues,
  CreateContainerProps,
  Item,
} from "../../types";

function useContainerActions() {
  const qc = useQueryClient();
  const {
    mutate: createContainerMutate,
    data: newContainerData,
    status: newContainerStatus,
    error: newContainerError,
  } = useMutation({
    mutationFn: async (data: CreateContainerProps) => {
      return apiClient<{ container: Container }>("/container/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    retry: false,
  });

  const {
    mutate: deleteContainerMutate,
    data: deleteContainerData,
    status: deleteContainerStatus,
    error: deleteContainerError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return apiClient<{ message: string }>(`/container/${id}`, {
        method: "DELETE",
      });
    },
    retry: false,
  });

  const {
    mutate: editContainerMutate,
    data: editContainerData,
    status: editContainerStatus,
    error: editContainerError,
  } = useMutation({
    mutationFn: async (data: ContainerFormValues) => {
      return apiClient<{ container: Container }>(`/container/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    retry: false,
  });

  const createNewContainer = (
    data: CreateContainerProps,
    onSuccess: (newData: { container: Container }) => void,
    onError: () => void
  ) => {
    createContainerMutate(data, {
      onSuccess: (data) => {
        onSuccess(data);
        const { container } = data;
        qc.setQueryData<{ containers: Container[] }>(
          ["getContainers"],
          (old?) =>
            old
              ? {
                  containers: [
                    { ...container, itemsCount: 0 },
                    ...old.containers,
                  ],
                }
              : old
        );
      },
      onError,
    });
  };

  const deleteContainer = (
    id: string,
    itemsIds: string[],
    onSuccess: () => void,
    onError: () => void
  ) => {
    deleteContainerMutate(id, {
      onSuccess: () => {
        onSuccess();
        qc.setQueryData<{ items: Item[] }>(["getItems"], (old) =>
          old
            ? { items: old.items.filter((i) => !itemsIds.includes(i.id)) }
            : old
        );
        qc.setQueryData<{ containers: Container[] }>(
          ["getContainers"],
          (old?) =>
            old
              ? {
                  containers: old.containers.filter(
                    (container) => container.id !== id
                  ),
                }
              : old
        );
      },
      onError,
    });
  };

  const editContainer = (
    data: ContainerFormValues,
    onSuccess: (newData: { container: Container }) => void,
    onError: () => void
  ) => {
    editContainerMutate(data, {
      onSuccess: (data) => {
        onSuccess(data);
        const { container } = data;
        qc.setQueryData<{ containers: Container[] }>(["getContainers"], (old) =>
          old
            ? {
                containers: old.containers.map(
                  (c): Container => (c.id === container.id ? container : c)
                ),
              }
            : old
        );
        qc.setQueryData<{ container: Container }>(
          ["getContainer", container.id],
          (old) =>
            old
              ? {
                  container,
                }
              : old
        );
      },
      onError,
    });
  };

  return {
    createNewContainer,
    createNewLoading: newContainerStatus === "pending",
    newContainerError,
    newContainerData,
    deleteContainer,
    deleteContainerLoading: deleteContainerStatus === "pending",
    deleteContainerData,
    deleteContainerError,
    editContainer,
    editContainerLoading: editContainerStatus === "pending",
    editContainerError,
    editContainerData,
  };
}

export default useContainerActions;
