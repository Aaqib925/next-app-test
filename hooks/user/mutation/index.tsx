import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSpecificUserSessionRequest } from "hooks/user/interface";
import { USER_QUERIES } from "hooks/user/query";

import { Delete, Post } from "@/utils/apiService";

const deleteSpecificUserSessionAction = async (body: DeleteSpecificUserSessionRequest) => {
  return await Delete({
    url: `/api/v1/sessions/${body.session_id}`,
    body,
    isAuthorized: true,
  });
};

export const useDeleteSpecificUserSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: DeleteSpecificUserSessionRequest) =>
    deleteSpecificUserSessionAction(body),
    onSuccess: () => {
      queryClient.invalidateQueries([USER_QUERIES.FETCH_SESSIONS] as InvalidateQueryFilters)
    }
  });
};



const deleteAllSessionAction = async () => {
  return await Post({
    url: `/api/v1/sessions-all`,
    isAuthorized: true,
  });
};

export const useDeleteAllSessions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
    deleteAllSessionAction(),
    onSuccess: () => {
      queryClient.invalidateQueries([USER_QUERIES.FETCH_SESSIONS] as InvalidateQueryFilters)
    }
  });
};