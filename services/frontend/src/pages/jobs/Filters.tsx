import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { Box, Switch, FormGroup, FormControlLabel } from "@mui/material";

import { IApplicationState, updateFilters } from "store";
import { SearchSelectInput, ISelectOption } from "components";

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { regions, jobTypes, companies, regionsFilter, jobTypesFilter, companiesFilter, shouldIncludeExpired } =
    useSelector(
      (state: IApplicationState) => ({
        regions: state.regions.data,
        jobTypes: state.jobTypes.data,
        companies: state.companies.data,
        regionsFilter: state.filters.regions,
        jobTypesFilter: state.filters.jobTypes,
        companiesFilter: state.filters.companies,
        shouldIncludeExpired: state.filters.shouldIncludeExpired,
      }),
      shallowEqual
    );

  const [regionOptions, setRegionOptions] = React.useState<ISelectOption[]>([]);
  const [jobTypeOptions, setJobTypeOptions] = React.useState<ISelectOption[]>([]);
  const [companyOptions, setCompanyOptions] = React.useState<ISelectOption[]>([]);

  React.useEffect(() => {
    setRegionOptions(
      regions
        .slice()
        .sort((o1, o2) => o1.orderPriority - o2.orderPriority)
        .map((region) => ({
          label: region.title,
          value: region.id,
        }))
    );
  }, [setRegionOptions, regions]);

  React.useEffect(() => {
    setJobTypeOptions(
      jobTypes.map((jobTypes) => ({
        label: jobTypes.title,
        value: jobTypes.id,
      }))
    );
  }, [setJobTypeOptions, jobTypes]);

  React.useEffect(() => {
    setCompanyOptions(
      companies.map((company) => ({
        label: company.title,
        value: company.id,
      }))
    );
  }, [setCompanyOptions, companies]);

  return (
    <Box marginTop={1} display="grid" rowGap="20px">
      <Formik
        initialValues={{
          regionsFilter,
          jobTypesFilter,
          companiesFilter,
        }}
        validationSchema={Yup.object({
          regionsFilter: Yup.array(),
          jobTypesFilter: Yup.array(),
          companiesFilter: Yup.array(),
        })}
        onSubmit={() => null}
      >
        <FormikForm>
          <Box display="grid" rowGap="1rem" paddingX={2}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={shouldIncludeExpired}
                    onChange={(_event, checked) => {
                      dispatch(updateFilters({ shouldIncludeExpired: checked }));
                    }}
                    color="primary"
                  />
                }
                label="Istekli konkursi"
              />
            </FormGroup>

            <SearchSelectInput
              name="regionIds"
              selectProps={{
                placeholder: "Regija...",
                options: regionOptions,
                value: regionsFilter,
                onChange: (value: ISelectOption[]) => dispatch(updateFilters({ regions: value || [] })),
                isMulti: true,
              }}
            />

            <SearchSelectInput
              name="jobTypeIds"
              selectProps={{
                placeholder: "Vrsta posla...",
                options: jobTypeOptions,
                value: jobTypesFilter,
                onChange: (value: ISelectOption[]) => dispatch(updateFilters({ jobTypes: value || [] })),
                isMulti: true,
              }}
            />

            <SearchSelectInput
              name="companyIds"
              selectProps={{
                placeholder: "Javna ustanova/preduzeće...",
                options: companyOptions,
                value: companiesFilter,
                onChange: (value: ISelectOption[]) => dispatch(updateFilters({ companies: value || [] })),
                isMulti: true,
              }}
            />
          </Box>
        </FormikForm>
      </Formik>
    </Box>
  );
};
