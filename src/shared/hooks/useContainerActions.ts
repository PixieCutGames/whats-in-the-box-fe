import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";

function useContainerActions() {
  const {
    mutate: createContainerMutate,
    data: newContainerData,
    status: newContainerStatus,
    error: newContainerError,
  } = useMutation({
    mutationFn: async (data: any) => {
      return apiClient<{ container: { id: string } }>("/container/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    retry: true,
  });

  const createNewContainer = (
    data: { name: string; description?: string; location?: string },
    onSuccess: (newData: { container: { id: string } }) => void,
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
