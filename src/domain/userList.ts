import {User} from "./user";

export type UserList = User[]

export function addUser (userList: UserList, user: User): UserList {
    return [...userList, user]
}

export function removeUser (userList: UserList, user: User): UserList {
    return userList.filter(u => u.id !== user.id)
}

export function updateUser (userList: UserList, user: User): UserList {
    return userList.map(u => u.id === user.id ? user : u)
}

export function findUser (userList: UserList, id: number): User | undefined {
    return userList.find(u => u.id === id)
}
