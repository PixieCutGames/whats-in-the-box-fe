import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import {
  Container,
  ContainerFormValues,
  CreateContainerProps,
  Item,
} from "../../types";
import toast from "react-hot-toast";

const togglePinned = (qc: QueryClient, id: string, pinned: boolean) => {
  qc.setQueryData<{ containers: Container[] }>(["getContainers"], (old) =>
    old
      ? {
          containers: old.containers.map(
            (c): Container => (c.id === id ? { ...c, pinned } : c)
          ),
        }
      : old
  );
  qc.setQueryData<{ container: Container }>(["getContainer", id], (old) =>
    old
      ? {
          container: {
            ...old.container,
            pinned,
          },
        }
      : old
  );
};

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

  const {
    mutate: pinContainerMutate,
    data: pinContainerData,
    status: pinContainerStatus,
    error: pinContainerError,
  } = useMutation({
    mutationFn: async (data: { id: string }) => {
      return apiClient<{ container: Container }>(`/container/${data.id}/pin`, {
        method: "POST",
      });
    },
    retry: false,
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: ["getContainer", id] });
      await qc.cancelQueries({ queryKey: ["getContainers"] });
      await qc.cancelQueries({ queryKey: ["getContainers-recent"] });
      await qc.cancelQueries({ queryKey: ["getContainers-pinned"] });
      togglePinned(qc, id, true);
    },
    onError: (err, { id }) => {
      console.log(err);
      toast.error("Failed to pin box.");
      togglePinned(qc, id, false);
    },
    onSettled: (_data, _error, variables) => {
      qc.fetchQuery({ queryKey: ["getContainers"] });
      qc.fetchQuery({ queryKey: ["getContainers-recent"] });
      qc.fetchQuery({ queryKey: ["getContainers-pinned"] });
      qc.fetchQuery({ queryKey: ["getContainer", variables] });
    },
  });

  const {
    mutate: unpinContainerMutate,
    data: unpinContainerData,
    status: unpinContainerStatus,
    error: unpinContainerError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return apiClient<{ container: Container }>(`/container/${id}/pin`, {
        method: "DELETE",
      });
    },
    retry: false,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["getContainer", id] });
      await qc.cancelQueries({ queryKey: ["getContainers"] });
      await qc.cancelQueries({ queryKey: ["getContainers-recent"] });
      await qc.cancelQueries({ queryKey: ["getContainers-pinned"] });
      togglePinned(qc, id, false);
    },
    onError: (err, id) => {
      console.log(err);
      toast.error("Failed to unpin box.");
      togglePinned(qc, id, true);
    },
    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({ queryKey: ["getContainers"] });
      qc.invalidateQueries({ queryKey: ["getContainers-recent"] });
      qc.invalidateQueries({ queryKey: ["getContainers-pinned"] });
      qc.invalidateQueries({ queryKey: ["getContainer", variables] });
    },
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
        qc.invalidateQueries({ queryKey: ["getContainers-recent"] });
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
        qc.invalidateQueries({ queryKey: ["getContainers-recent"] });
        qc.invalidateQueries({ queryKey: ["getContainers-pinned"] });
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
        qc.invalidateQueries({ queryKey: ["getContainers-recent"] });
        qc.invalidateQueries({ queryKey: ["getContainers-pinned"] });
      },
      onError,
    });
  };

  const pinContainer = (id: string) => {
    pinContainerMutate({ id });
  };

  const unpinContainer = (id: string) => {
    unpinContainerMutate(id);
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
    pinContainer,
    pinContainerLoading: pinContainerStatus === "pending",
    pinContainerError,
    pinContainerData,
    unpinContainer,
    unpinContainerLoading: unpinContainerStatus === "pending",
    unpinContainerError,
    unpinContainerData,
  };
}

export default useContainerActions;
