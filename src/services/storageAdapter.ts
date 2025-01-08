import { useEffect } from "react";
import { NotifyStorageService, UserStorageService } from "../application/ports";
import { UserList } from "../domain/userList";
import { useStore } from "./store";

const storage = window.localStorage;
export const useUserStorage = (): UserStorageService => {
  const value = useStore();
  if (!value) {
    throw new Error("useUserStorage must be used within a Provider");
  }
  const { userList, setUserList, newUserId, setNewUserId } = value;

  useEffect(() => {
    storage.setItem("users", JSON.stringify(userList));
  }, [userList]);

  function updateUserList(userList: UserList) {
    setUserList(userList);
  }
  return { userList, updateUserList, newUserId, setNewUserId };
};

export const useNotifyStorage = (): NotifyStorageService => {
  const value = useStore();
  if (!value) {
    throw new Error("useUserStorage must be used within a Provider");
  }
  const {
    isSuccessNotify,
    isErrorNotify,
    setIsSuccessNotify,
    setIsErrorNotify,
  } = value;

  return {
    isSuccessNotify,
    isErrorNotify,
    setIsSuccessNotify,
    setIsErrorNotify,
  };
};
