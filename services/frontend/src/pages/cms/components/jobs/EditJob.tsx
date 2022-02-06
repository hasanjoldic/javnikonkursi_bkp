import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FormikConfig } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import {
  Job,
  UpdateJobInput,
  UpdateJobMutation,
  UpdateJobMutationVariables,
  DeleteJobMutation,
  DeleteJobMutationVariables,
} from "generated/types";

import { createOptions } from "@javnikonkursi/shared";

import { Grid } from "@mui/material";

import { useApiClient } from "api";
import { IApplicationState } from "store";

import { TextInput, AutoCompleteInput, DateInput, FileUpload, ISelectOption } from "components";
import { useCmsContext } from "pages/cms";

import { STATIC_PATH } from "env";
import { Form, parseFormValues } from "../Form";
import { jobsUrl } from "./Routes";

export const UPDATE_JOB = gql`
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(input: $input) {
      job {
        id
      }
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($input: DeleteJobInput!) {
    deleteJob(input: $input) {
      job {
        id
      }
    }
  }
`;

export const EditJob: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const apiClient = useApiClient();
  const { refetchJobs } = useCmsContext();

  const [regionOptions, setRegionOptions] = React.useState<ISelectOption[]>([]);
  const [companyOptions, setCompanyOptions] = React.useState<ISelectOption[]>([]);
  const [jobTagOptions, setJobTagOptions] = React.useState<ISelectOption[]>([]);
  const [jobTypeOptions, setJobTypeOptions] = React.useState<ISelectOption[]>([]);

  const { companies, jobs, jobTags, jobTypes, regions } = useSelector(
    (state: IApplicationState) => ({
      companies: state.companies.data,
      jobs: state.jobs.data,
      jobTags: state.jobTags.data,
      jobTypes: state.jobTypes.data,
      regions: state.regions.data,
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

  // const selectedJob = jobs.find((job) => job.id === id);

  const selectedJob = React.useMemo(() => {
    let selectedJob = jobs.find((job) => job.id === id);
    if (!selectedJob) return null;
    selectedJob = { ...selectedJob };

    if (selectedJob.region) {
      selectedJob["regionId"] = {
        label: selectedJob.region?.title,
        value: selectedJob.region?.id,
      };
    }
    if (selectedJob.company) {
      selectedJob["companyId"] = {
        label: selectedJob.company?.title,
        value: selectedJob.company?.id,
      };
    }
    if (selectedJob.jobType) {
      selectedJob["jobTypeId"] = {
        label: selectedJob.jobType?.title,
        value: selectedJob.jobType?.id,
      };
    }

    if (selectedJob["jobsJobTags"].nodes.length) {
      selectedJob["jobTagIds"] = selectedJob["jobsJobTags"].nodes.map((o) => ({
        label: o.jobTag.title,
        value: o.jobTag.id,
      }));
    }

    return selectedJob;
  }, [id, jobs]);

  const [updateJob] = useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UPDATE_JOB);
  const [deleteJob] = useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DELETE_JOB);

  const handleSubmit = React.useCallback<FormikConfig<Job & { internalFile: File }>["onSubmit"]>(
    async ({ internalFile, ...values }, { setSubmitting }) => {
      setSubmitting(true);

      values = parseFormValues(
        values,
        [
          "title",
          "jobTypeId",
          "numberOfOpenings",
          "jobTagIds",
          "companyId",
          "regionId",
          "startDate",
          "endDate",
          "externalUrl",
          "notes",
        ],
        (input) => {
          input["numberOfOpenings"] = Number.parseInt(input["numberOfOpenings"]);
          return input;
        }
      );

      const updatedFields = Object.entries(values).reduce((sum, entry) => {
        const [key, value] = entry;
        if (selectedJob[key] !== value) {
          sum[key] = value;
        }
        return sum;
      }, {} as UpdateJobInput["patch"]);

      const { data: updateData } = await updateJob({
        variables: { input: { id: selectedJob.id, patch: updatedFields } },
      });

      if (internalFile) {
        await apiClient.uploadFile({
          file: internalFile,
          fileName: `${selectedJob.id}`,
        });
      }

      if (updateData?.updateJob?.job) {
        refetchJobs();
        history.push(`/cms/${jobsUrl}`);
      }

      setSubmitting(false);
    },
    [selectedJob, apiClient, updateJob, history, refetchJobs]
  );

  const handleDelete = React.useCallback(async () => {
    await deleteJob({ variables: { input: { id: selectedJob.id } } });
  }, [deleteJob, selectedJob]);

  return (
    <div key={`${regionOptions.length}${companies.length}${jobTypes.length}`}>
      <Form
        initialValues={selectedJob}
        validationSchema={Yup.object({
          title: Yup.string().min(5).required("Obavezno polje"),
          numberOfOpenings: Yup.number().required(),
          jobTypeId: Yup.object().nullable(),
          jobTagIds: Yup.array().of(Yup.object()),
          companyId: Yup.object().required("Obavezno polje"),
          regionId: Yup.object().required("Obavezno polje"),
          startDate: Yup.string().required("Obavezno polje"),
          endDate: Yup.date().required("Obavezno polje"),
          externalUrl: Yup.string()
            .url("Mora biti url, npr: https://www.bhtelecom.ba/karijere.html")
            .required("Obavezno polje"),
          notes: Yup.string().nullable(),
          internalFile: Yup.mixed().nullable(),
        })}
        // @ts-ignore
        onSubmit={handleSubmit}
        onDelete={handleDelete}
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
              label: "Lokacija",
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
          <TextInput
            name="notes"
            textFieldProps={{
              label: "Bilješke",
              variant: "outlined",
              fullWidth: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FileUpload
            name="internalFile"
            label="Interni dokument"
            link={selectedJob ? `${STATIC_PATH}/${selectedJob?.id}` : null}
          />
        </Grid>
      </Form>
    </div>
  );
};
