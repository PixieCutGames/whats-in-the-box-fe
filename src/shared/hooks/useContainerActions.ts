import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container, CreateContainerProps } from "../../types";

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
    retry: true,
  });

  const createNewContainer = (
    data: CreateContainerProps,
    onSuccess: (newData: { container: Container }) => void,
    onError: () => void
  ) => {
    createContainerMutate(data, {
      onSuccess: (newData) => {
        console.log(newData);
        onSuccess(newData);
      },
      onError,
    });
  };

  return {
    createNewContainer,
    createNewLoading: newContainerStatus === "pending",
    newContainerError,
    newContainerData,
  };
}

export default useContainerActions;
