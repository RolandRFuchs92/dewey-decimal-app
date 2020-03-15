import React from "react";

import PageBase from "components/page/PageBase";
import repo from "./authors.repo";

const defaultColumns = [
  {
    name: "author_id",
    label: "Id",
    type: {
      header: "Author"
    }
  },
  {
    name: "name",
    label: "First name",
    type: "textfield"
  },
  {
    name: "second_name",
    label: "Second name",
    type: "textfield"
  },
  {
    name: "surname",
    label: "Last name",
    type: "textField"
  }
];

export default () => {
  const handleDeleteRow = repo.deleteRow;
  const handleEditAddRow = repo.addOrUpdate;
  const getAll = repo.getAll;

  return (
    <PageBase
      {...{ defaultColumns, getAll, handleDeleteRow, handleEditAddRow }}
    ></PageBase>
  );
};
