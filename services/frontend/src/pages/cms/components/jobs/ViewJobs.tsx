import React from "react";
import { useSelector } from "react-redux";

import { IApplicationState } from "store";
import { EDateFormat, dateFormat } from "utils";

import { IColumn, View } from "../View";

const columns: IColumn[] = [
  { id: "title", label: "Naziv" },
  {
    id: "startDate",
    label: "Početak konkursa",
    render: (value: string) => dateFormat(value, EDateFormat["dd.MM.yyyy"]),
  },
  { id: "endDate", label: "Kraj konkursa", render: (value: string) => dateFormat(value, EDateFormat["dd.MM.yyyy"]) },
  {
    id: "_updatedAt",
    label: "Ažurinano",
    render: (value: string) => dateFormat(value, EDateFormat["dd.MM.yyyy HH:mm:ss"]),
  },
];

export const ViewJobs: React.FC = () => {
  const jobs = useSelector((state: IApplicationState) => state.jobs.data);

  return <View url="javni-konkursi" data={jobs} columns={columns} />;
};
