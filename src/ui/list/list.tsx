import styles from "./list.module.css";
import trashPath from "../../assets/images/trash.svg";
import editPath from "../../assets/images/edit.svg";
import femaleIconPath from "../../assets/images/female-black.svg";
import maleIconPath from "../../assets/images/male-black.svg";
import { User } from "../../domain/user";
import { useUserStorage } from "../../services/storageAdapter";
import { useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { DeleteNote } from "../notify/delete/deleteNote";
import { useDeleteUser } from "../../application/userListCases";
import { Loading } from "../loading/loading";
import { Sort } from "../../App";
import { parse } from "date-fns";

type Props = {
  sort: Sort;
  searchQuery: string;
};

export function List({ sort, searchQuery }: Props) {
  const { userList, newUserId } = useUserStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);
  const { deleteUserFromList, isLoading } = useDeleteUser();

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };
  const openModal = () => setIsModalOpen(true);

  const closeDeleteNote = () => {
    setEditUser(null);
    setIsDeleteNoteOpen(false);
  };

  const deleteUser = () => {
    if (editUser) {
      deleteUserFromList(editUser);
    }
    setEditUser(null);
    closeDeleteNote();
  };

  const filteredUserList = useMemo(() => {
    return userList.filter((user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [userList, searchQuery]);

  return (
    <>
      <div className={styles["list"]}>
        {sortList(filteredUserList, sort).map((user) => (
          <ListItem
            key={user.id}
            user={user}
            openDeleteNote={() => setIsDeleteNoteOpen(true)}
            openModal={openModal}
            setUser={setEditUser}
            newUserId={newUserId}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} type="edit" user={editUser} />
      )}
      {isDeleteNoteOpen && editUser && !isLoading && (
        <DeleteNote
          name={editUser.first_name + " " + editUser.last_name}
          deleteUser={deleteUser}
          close={closeDeleteNote}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}

type ListItemProps = {
  user: User;
  openModal: () => void;
  openDeleteNote: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  newUserId: number | undefined;
};

function ListItem({
  user,
  openModal,
  setUser,
  openDeleteNote,
  newUserId,
}: ListItemProps) {
  return (
    <div
      className={`${styles["list-item"]} ${
        newUserId === user.id ? styles["list-item__new"] : ""
      }`}
    >
      <div className={styles["list-item__avatar-wrapper"]}>
        <img
          className={styles["list-item__avatar"]}
          src={user.avatar}
          alt="avatar"
        />
        <span className={styles["list-item__name"]}>
          {user.first_name} {user.last_name}
        </span>
      </div>

      <span className={styles["list-item__mail"]}>{user.email}</span>
      <span className={styles["list-item__date"]}>{user.birthdate}</span>
      <div className={styles["list-item__gender"]}>
        <img
          className={styles["list-item__gender-icon"]}
          src={user.gender === "мужской" ? maleIconPath : femaleIconPath}
          alt="gender-icon"
        />
        <span>{user.gender === "мужской" ? "Мужской" : "Женский"}</span>
      </div>
      <span className={styles["list-item__role"]}>{user.role}</span>
      <div className={styles["list-item__btns"]}>
        <button
          className={`${styles["list-item__btn"]} ${styles["list-item__btn__edit"]} `}
          onClick={() => {
            setUser(user);
            openModal();
          }}
        >
          <img src={editPath} alt="edit" />
        </button>
        <button
          className={`${styles["list-item__btn"]} ${styles["list-item__btn__delete"]}`}
          onClick={() => {
            setUser(user);
            openDeleteNote();
          }}
        >
          <img src={trashPath} alt="trash" />
        </button>
      </div>
    </div>
  );
}

function sortList(userList: User[], sort: Sort): User[] {
  if (sort.name === "name") {
    if (sort.type === "up") {
      return [...userList].sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        )
      );
    } else {
      return [...userList].sort((b, a) =>
        `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        )
      );
    }
  }

  if (sort.name === "date") {
    if (sort.type === "up") {
      return [...userList].sort(
        (a, b) =>
          parse(a.birthdate, "dd.MM.yyyy", new Date()).getTime() -
          parse(b.birthdate, "dd.MM.yyyy", new Date()).getTime()
      );
    } else {
      return [...userList].sort(
        (b, a) =>
          parse(a.birthdate, "dd.MM.yyyy", new Date()).getTime() -
          parse(b.birthdate, "dd.MM.yyyy", new Date()).getTime()
      );
    }
  }
  if (sort.name === "gender") {
    if (sort.type === "up") {
      return [...userList].sort((a, b) => a.gender.localeCompare(b.gender));
    } else {
      return [...userList].sort((b, a) => a.gender.localeCompare(b.gender));
    }
  }
  return userList;
}
