import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";

function useMedia() {
  const {
    mutate: uploadMediaMutate,
    data: uploadMediaData,
    status: uploadMediaStatus,
    error: uploadMediaError,
  } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient<{ publicId: string }>(
        "/media/upload",
        {
          method: "POST",
          body: formData,
        },
        true
      );
    },
  });

  const uploadMedia = (
    file: File,
    onSuccess: (publicId: string) => void,
    onError: () => void
  ) => {
    uploadMediaMutate(file, {
      onSuccess: (data) => {
        onSuccess(data.publicId);
      },
      onError,
    });
  };
  return {
    uploadMedia,
    uploadMediaData,
    uploadMediaError,
    loadingUploadMedia: uploadMediaStatus === "pending",
  };
}

export default useMedia;
