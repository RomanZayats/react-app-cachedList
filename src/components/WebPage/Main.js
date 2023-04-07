import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getItemsFromServer } from "../../services/api";
import {
  getCachedDataByName,
  saveDataToCache,
} from "../../services/browser-cache";

import { TableRow } from "../ContentTable/TableRow";
import { scrollToBottom } from "../../utils";
import { Loader } from "../Loader/Loader";

export const Main = () => {
  const [appData, setAppData] = useState([]);
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      getCachedDataByName("CachedList")
        .then((cachedList) => setAppData(cachedList))
        .catch(() => {
          getItemsFromServer().then((fetchedList) => {
            saveDataToCache("CachedList", fetchedList);
            setAppData(fetchedList);
          });
        });
      initialMount.current = false;
    }
  }, []);

  const addItemHandler = (event) => {
    const emptyItem = {
      name: "",
      age: "",
      about: "",
    };
    setAppData([...appData, emptyItem]);
    scrollToBottom();
  };

  if (!appData.length) return <Loader />;

  return (
    <ContentBox>
      {appData.map((item) => (
        <TableRow
          key={item.about}
          el={item}
          tableData={appData}
          setTableData={setAppData}
        />
      ))}

      <CreateItemBtn
        className="createBtn"
        type="button"
        title="Create Item"
        onClick={(e) => addItemHandler(e)}
      >
        +
      </CreateItemBtn>
    </ContentBox>
  );
};

const ContentBox = styled.main`
  min-height: 85vh;
  padding: 5vh 2.5vw;
`;

const CreateItemBtn = styled.button`
  height: 50px;
  width: 50px;
  padding: 0;
  position: fixed;
  bottom: 5vh;

  border-radius: 50%;
  border: none;
  outline: none;

  background-color: white;
  color: yellowgreen;
  line-height: 50px;
  font-size: 56px;
  cursor: pointer;

  &:hover {
    font-weight: bolder;
    box-shadow: 2px 2px 2px 1px lightslategrey;
  }
`;
