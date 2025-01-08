import { useState } from "react";
import { Header } from "./ui/header/header";
import { Layout } from "./ui/layout/layout";
import { Modal } from "./ui/modal/modal";
import { TableHeader } from "./ui/tableHeader/tableHeader";
import { SuccessNote } from "./ui/notify/success/successNote";
import { ErrorNote } from "./ui/notify/error/errorNote";
import { useNotifyStorage } from "./services/storageAdapter";
import { List } from "./ui/list/list";
import { useStore } from "./services/store";

type SortType = "up" | "down" | "none";
type SortName = "name" | "date" | "gender" | "id";
export type Sort = { name: SortName; type: SortType };

const initSort: Sort = { name: "id", type: "up" };
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSuccessNotify, isErrorNotify } = useNotifyStorage();
  const [sort, setSort] = useState<Sort>(initSort);
  const [searchQuery, setSearchQuery] = useState("");
  const store = useStore();

  const changeSort = (sort: Sort) => {
    setSort(sort);
    if (store?.setNewUserId) {
      store.setNewUserId(undefined);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Layout>
        <Header openModal={() => setIsModalOpen(true)} />
        <TableHeader
          setSort={changeSort}
          sort={sort}
          initSort={initSort}
          onSearchChange={handleSearchChange}
        />
        <List sort={sort} searchQuery={searchQuery} />
        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)} user={null} />
        )}
      </Layout>
      {isSuccessNotify && <SuccessNote />}
      {isErrorNotify && <ErrorNote />}
    </>
  );
}

export default App;
