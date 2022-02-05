import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import { CreateJobMutation, CreateJobMutationVariables } from "generated/types";

import { Grid } from "@mui/material";

import { createOptions } from "@javnikonkursi/shared";

import { useApiClient } from "api";
import { IApplicationState } from "store";

import { TextInput, AutoCompleteInput, DateInput, FileUpload, ISelectOption } from "components";
import { useCmsContext } from "pages/cms";

import { Form, parseFormValues } from "../Form";
import { jobsUrl } from "./Routes";

const initialValues = {
  title: "",
  jobTypeId: "",
  numberOfOpenings: 1,
  jobTagIds: [],
  companyId: "",
  regionId: "",
  startDate: null,
  endDate: null,
  externalUrl: "",
  internalFile: null,
};

const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      job {
        id
      }
    }
  }
`;

export const AddJob: React.FC = () => {
  const history = useHistory();
  const apiClient = useApiClient();
  const { refetchJobs } = useCmsContext();

  const [regionOptions, setRegionOptions] = React.useState<ISelectOption[]>([]);
  const [companyOptions, setCompanyOptions] = React.useState<ISelectOption[]>([]);
  const [jobTagOptions, setJobTagOptions] = React.useState<ISelectOption[]>([]);
  const [jobTypeOptions, setJobTypeOptions] = React.useState<ISelectOption[]>([]);

  const { regions, companies, jobTags, jobTypes } = useSelector(
    (state: IApplicationState) => ({
      regions: state.regions.data,
      companies: state.companies.data,
      jobTags: state.jobTags.data,
      jobTypes: state.jobTypes.data,
    }),
    shallowEqual
  );

  React.useEffect(() => {
    setRegionOptions(createOptions(regions, "id", "title"));
  }, [setRegionOptions, regions]);

  React.useEffect(() => {
    setCompanyOptions(createOptions(companies, "id", "title"));
  }, [setCompanyOptions, companies]);

  React.useEffect(() => {
    setJobTagOptions(createOptions(jobTags, "id", "title"));
  }, [setJobTagOptions, jobTags]);

  React.useEffect(() => {
    setJobTypeOptions(createOptions(jobTypes, "id", "title"));
  }, [setJobTypeOptions, jobTypes]);

  const [createJob] = useMutation<CreateJobMutation, CreateJobMutationVariables>(CREATE_JOB);

  const handleSubmit = React.useCallback(
    async ({ internalFile, jobTagIds, ...values }, { setSubmitting }) => {
      setSubmitting(true);

      values = parseFormValues(values, (input) => {
        input["numberOfOpenings"] = Number.parseInt(input["numberOfOpenings"]);
        return input;
      });
      const { data } = await createJob({
        variables: {
          input: {
            job: { ...values, jobsJobTagsUsingId: { create: jobTagIds.map((jobTag) => ({ jobTagId: jobTag.value })) } },
          },
        },
      });
      const job = data?.createJob?.job;

      const isSuccess = await apiClient.uploadFile({
        file: internalFile,
        fileName: `${job.id}`,
      });

      if (isSuccess) {
        refetchJobs();
        history.push(`/cms/${jobsUrl}`);
      }
      setSubmitting(false);
    },
    [createJob, apiClient, history, refetchJobs]
  );

  return (
    <Form
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().min(5).required("Obavezno polje"),
        numberOfOpenings: Yup.string().required("Obavezno polje"),
        jobTypeId: Yup.string(),
        jobTagIds: Yup.string(),
        companyId: Yup.string().required("Obavezno polje"),
        regionId: Yup.string().required("Obavezno polje"),
        startDate: Yup.date().required("Obavezno polje"),
        endDate: Yup.date().required("Obavezno polje"),
        externalUrl: Yup.string().url("Mora biti url, npm: https://www.bhtelecom.ba/karijere.html"),
        internalFile: Yup.mixed().required(),
      })}
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <TextInput
          name="title"
          type="text"
          placeholder="Strucni saradnik za pravne poslove"
          textFieldProps={{
            label: "Naziv radnog mjesta",
            variant: "outlined",
            fullWidth: true,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <AutoCompleteInput
          name="jobTypeId"
          autocompleteProps={{
            options: jobTypeOptions,
          }}
          textFieldProps={{
            label: "Vrsta posla",
            variant: "outlined",
            fullWidth: true,
            placeholder: "Doktor medicine",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <AutoCompleteInput
          name="jobTagIds"
          autocompleteProps={{
            options: jobTagOptions,
            multiple: true,
          }}
          textFieldProps={{
            label: "Oznaka posla",
            variant: "outlined",
            fullWidth: true,
            placeholder: "VSS",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <AutoCompleteInput
          name="companyId"
          autocompleteProps={{
            options: companyOptions,
          }}
          textFieldProps={{
            label: "Javna ustanova/preduzeće",
            variant: "outlined",
            fullWidth: true,
            placeholder: "https://www.bhtelecom.ba/karijere.html",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="numberOfOpenings"
          type="number"
          placeholder="1"
          textFieldProps={{
            label: "Broj otvorenih mjesta",
            variant: "outlined",
            fullWidth: true,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <AutoCompleteInput
          name="regionId"
          autocompleteProps={{
            options: regionOptions,
          }}
          textFieldProps={{
            label: "Regija",
            variant: "outlined",
            fullWidth: true,
            placeholder: "Tuzlanski Kanton",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <DateInput
          name="startDate"
          placeholder="01.01.2000"
          datePickerProps={{
            label: "Pocetak konkursa",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <DateInput
          name="endDate"
          placeholder="01.01.2000"
          datePickerProps={{
            label: "Kraj konkursa",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="externalUrl"
          type="url"
          placeholder="https://www.bhtelecom.ba/karijere.html"
          textFieldProps={{
            label: "Web stranica konkursa",
            variant: "outlined",
            fullWidth: true,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FileUpload name="internalFile" label="Interni dokument" />
      </Grid>
    </Form>
  );
};
