import { useRef, useState } from "react";
import { API } from "./api";
import { perPage } from "../constants";
import { UserDTO } from "../application/dto/dto";
import { User } from "../domain/user";

export function useGetUsers() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);
  const totalPageRef = useRef(0);

  async function getUsersApi() {
    try {
      if (totalPageRef.current && totalPageRef.current < pageRef.current) {
        return [];
      }
      setIsLoading(true);
      const response = await API.getUsers(pageRef.current, perPage);
      if (response.status === 200) {
        totalPageRef.current = response.data.total_pages;
        pageRef.current++;
        setIsError(false);
        return response.data.data;
      } else {
        setIsError(true);
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { getUsersApi, isLoading, isError };
}

export function useUpdateUserApiService() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function updateUserApi(user: UserDTO) {
    try {
      setIsLoading(true);
      const response = await API.updateUser(user);
      if (response.status === 200) {
        setIsError(false);
        return response.data;
      } else {
        setIsError(true);
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { updateUserApi, isLoading, isError };
}

export const registerNewUserservice = async (user: {
  name: string;
  job: string;
}) => {
  try {
    const response = await API.registerNewUser(user);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log("Error: ", response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserApi = async (user: UserDTO) => {
  try {
    const response = await API.updateUser(user);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error: ", response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const useDeleteUserApiService = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteUserApi(userID: User["id"]) {
    try {
      setIsLoading(true);
      const response = await API.removeUser(userID);
      if (response.status === 204) {
        setIsError(false);
        return true;
      } else {
        setIsError(true);
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { deleteUserApi, isLoading, isError };
};
