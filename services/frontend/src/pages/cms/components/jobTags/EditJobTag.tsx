import React from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { FormikConfig } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

import { Grid } from "@mui/material";

import { UpdateJobTagMutation, UpdateJobTagMutationVariables, JobTypeInput } from "generated/types";

import { IApplicationState } from "store";

import { TextInput } from "components";
import { useCmsContext } from "pages/cms";

import { Form, parseFormValues } from "../Form";
import { jobTagsUrl } from "./Routes";

export const UPDATE_JOB_TYPE_TAGS = gql`
  mutation UpdateJobTag($input: UpdateJobTagInput!) {
    updateJobTag(input: $input) {
      jobTag {
        id
      }
    }
  }
`;

export const EditJobTag: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { refetchJobTags } = useCmsContext();

  const jobTags = useSelector((state: IApplicationState) => state.jobTags.data);
  const selectedJobType = jobTags.find((company) => company.id === id);

  const [updateJobTag] = useMutation<UpdateJobTagMutation, UpdateJobTagMutationVariables>(UPDATE_JOB_TYPE_TAGS);

  const handleSubmit = React.useCallback<FormikConfig<JobTypeInput>["onSubmit"]>(
    async (values, { setSubmitting }) => {
      values = parseFormValues(values, ["title", "notes"]);
      setSubmitting(true);

      const { data: updateData } = await updateJobTag({
        variables: { input: { id: selectedJobType.id, patch: values } },
      });

      if (updateData?.updateJobTag?.jobTag) {
        refetchJobTags();
        history.push(`/cms/${jobTagsUrl}`);
      }

      setSubmitting(false);
    },
    [updateJobTag, selectedJobType, history, refetchJobTags]
  );

  return (
    <Form
      initialValues={selectedJobType}
      validationSchema={Yup.object({
        title: Yup.string().min(3).required("Obavezno polje"),
        notes: Yup.string().nullable(),
      })}
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <TextInput
          name="title"
          type="text"
          placeholder="VSS"
          textFieldProps={{
            label: "Oznaka posla",
            variant: "outlined",
            fullWidth: true,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="notes"
          type="text"
          textFieldProps={{
            label: "Opis",
            variant: "outlined",
            fullWidth: true,
          }}
        />
      </Grid>
    </Form>
  );
};
