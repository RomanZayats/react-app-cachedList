import { useEffect, useState } from "react";
import styled from "styled-components";
import "react-dom";

import { saveDataToCache } from "../../services/browser-cache";
import {
  deleteItemFromServer,
  saveItemOnServer,
  addItemOnServer,
} from "../../services/api";

import { Loader } from "../Loader/Loader";

export const TableRow = ({ el, tableData, setTableData }) => {
  const [updatingMode, setUpdatingMode] = useState(false);
  const [fetchingMode, setFetchingMode] = useState(false);

  useEffect(() => {
    //ToDo: study more performant way to disable buttons
    const btnArr = [...document.querySelectorAll(".deleteBtn,.updateBtn")];
    updatingMode
      ? btnArr.forEach((btn) => (btn.disabled = true))
      : btnArr.forEach((btn) => (btn.disabled = false));
  }, [updatingMode]);

  //ToDo: encapsulate request parts
  const updateHandler = (event) => {
    const inputsArr = [
      event.target.parentElement.parentElement[0],
      event.target.parentElement.parentElement[1],
      event.target.parentElement.parentElement[2],
    ];
    inputsArr.forEach((input) => (input.disabled = false));
    event.target.parentElement.parentElement.classList.add("touched");
    setUpdatingMode(true);
  };

  //ToDo: encapsulate request parts
  const saveHandler = (event, formID) => {
    setFetchingMode(true);

    const inputsArr = [
      event.target.parentElement.parentElement[0],
      event.target.parentElement.parentElement[1],
      event.target.parentElement.parentElement[2],
    ];
    const newData = {
      name: inputsArr[0].value,
      age: inputsArr[1].value,
      about: inputsArr[2].value,
    };

    //ToDo: encapsulate request parts
    if (!formID) {
      return addItemOnServer(newData)
        .then((newItem) => {
          Object.assign(
            tableData.find(({ id }) => !id),
            newItem
          );
          saveDataToCache("CachedList", tableData);
          inputsArr.forEach((input) => (input.disabled = true));
          event.target.parentElement.parentElement.classList.remove("touched");
          setUpdatingMode(false);
        })
        .catch(() => {
          setUpdatingMode(true);
        })
        .finally(() => {
          setFetchingMode(false);
        });
    }

    //ToDo: encapsulate request parts
    saveItemOnServer(formID, newData)
      .then(() => {
        Object.assign(
          tableData.find(({ id }) => id === formID),
          newData
        );
        saveDataToCache("CachedList", tableData);
        inputsArr.forEach((input) => (input.disabled = true));
        setUpdatingMode(false);
      })
      .catch(() => setUpdatingMode(true))
      .finally(() => setFetchingMode(false));
  };

  //ToDo: encapsulate request parts
  const deleteHandler = (rowID) => {
    setFetchingMode(true);
    deleteItemFromServer(rowID)
      .then(() => {
        const updatedList = tableData.filter((el) => el.id !== rowID);
        saveDataToCache("CachedList", updatedList);
        setTableData(updatedList);
      })
      .finally(() => setFetchingMode(false));
  };

  if (fetchingMode) return <Loader />;

  return (
    <>
      {/*ToDo: encapsulate components*/}

      <RowBox key={el.id}>
        <RowInput
          key={el.name}
          type="text"
          disabled={true}
          defaultValue={`${el.name}`}
          placeholder="Enter name"
        />
        <RowInput
          key={el.age}
          type="number"
          min="18"
          max="100"
          disabled={true}
          defaultValue={el.age}
          placeholder="Enter age"
        />
        <RowInput
          key={el.about}
          type="text"
          minlength="4"
          maxlength="30"
          size="10"
          disabled={true}
          defaultValue={el.about}
          placeholder="Enter position"
        />

        <ControlsBox>
          {!updatingMode && (
            <RowButton
              className="updateBtn"
              type="button"
              title="Update"
              onClick={(e) => updateHandler(e)}
            >
              Update
            </RowButton>
          )}
          {updatingMode && (
            <RowButton
              className="saveBtn"
              type="button"
              title="Save"
              onClick={(e) => saveHandler(e, el.id)}
            >
              Save
            </RowButton>
          )}
          <RowButton
            className="deleteBtn"
            type="button"
            title="Delete"
            onClick={() => deleteHandler(el.id)}
          >
            Delete
          </RowButton>
        </ControlsBox>
      </RowBox>
    </>
  );
};

const RowBox = styled.form`
  padding: 2px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 0.3px solid darkgrey;

  &:last-child {
    border: none;
  }

  &.touched,
  &:hover {
    background-color: lightsteelblue;
  }
`;

const RowInput = styled.input`
  width: 35vw;
  padding: 0;
  border: none;
  outline: none;
  background-color: unset;

  &:nth-child(2) {
    width: 9vw;
  }

  &:focus {
    font-weight: bolder;
  }
`;

const ControlsBox = styled.div`
  width: 11vw;
  text-align: center;
`;

const RowButton = styled.button`
  margin: 1px;
  width: 65px;
  border: 1px solid black;
  outline: none;
  border-radius: 4px;
  cursor: pointer;

  &.updateBtn {
    background-color: darkseagreen;
  }

  &.saveBtn {
    background-color: steelblue;
  }

  &.cancelBtn,
  &.deleteBtn {
    background-color: indianred;
  }

  &.confirmBtn {
    background-color: darkseagreen;
  }

  &:hover {
    font-weight: bold;
  }
`;
