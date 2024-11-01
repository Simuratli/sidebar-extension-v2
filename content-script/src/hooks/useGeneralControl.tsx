import React, { useEffect } from "react";
import { useUserSearchButton } from "../hooks/useUserSearchButton";
import { usePaging } from "./usePaging";

export const useGeneralControl = () => {
  const { updated } = usePaging();
  const { addForUserSearch } = useUserSearchButton();

  return {};
};
