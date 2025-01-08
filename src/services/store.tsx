"use client";
import { createContext, useState } from "react";
import { useContext } from "react";
import { UserList } from "../domain/userList";

type Value = {
  userList: UserList;
  newUserId: number | undefined;
  isSuccessNotify: boolean;
  isErrorNotify: boolean;
  setIsSuccessNotify: React.Dispatch<React.SetStateAction<boolean>>;
  setIsErrorNotify: React.Dispatch<React.SetStateAction<boolean>>;
  setUserList: React.Dispatch<React.SetStateAction<UserList>>;
  setNewUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
} | null;

const StoreContext = createContext<Value>(null);
export const useStore: () => Value = () => useContext(StoreContext);
const storage = window.localStorage;

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userList, setUserList] = useState<UserList>(getValue);
  const [newUserId, setNewUserId] = useState<number | undefined>(undefined);
  const [isSuccessNotify, setIsSuccessNotify] = useState(false);
  const [isErrorNotify, setIsErrorNotify] = useState(false);

  function getValue(): UserList {
    const users = storage.getItem("users");
    const userList = users ? JSON.parse(users) : [];
    return userList;
  }

  const value: Value = {
    userList,
    newUserId,
    isSuccessNotify,
    isErrorNotify,
    setIsSuccessNotify,
    setIsErrorNotify,
    setUserList,
    setNewUserId,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
