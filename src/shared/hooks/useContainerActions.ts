import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import {
  Container,
  ContainerFormValues,
  CreateContainerProps,
} from "../../types";

function useContainerActions() {
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
  });

  const createNewContainer = (
    data: CreateContainerProps,
    onSuccess: (newData: { container: Container }) => void,
    onError: () => void
  ) => {
    createContainerMutate(data, {
      onSuccess,
      onError,
    });
  };

  const deleteContainer = (
    id: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    deleteContainerMutate(id, {
      onSuccess,
      onError,
    });
  };

  const editContainer = (
    data: ContainerFormValues,
    onSuccess: (newData: { container: Container }) => void,
    onError: () => void
  ) => {
    editContainerMutate(data, {
      onSuccess,
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
