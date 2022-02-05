import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  Box,
  Hidden,
  Divider,
  Drawer as MuiDrawer,
  DrawerProps,
  Toolbar,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import { IApplicationState, updateFilters } from "store";
import { SearchSelectInput, ISelectOption } from "components";

import { drawerWidth } from "./utils";

export const DrawerComponent = styled(MuiDrawer)(() => ({
  minWidth: drawerWidth,
  maxWidth: "75vw",
  "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
}));

export const DrawerContainer: React.FC<DrawerProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <>
      <Hidden mdUp>
        <DrawerComponent {...props} variant="temporary" ModalProps={{ keepMounted: true }}>
          {children}
        </DrawerComponent>
      </Hidden>
      <Hidden smDown>
        <DrawerComponent {...props} variant="permanent" open>
          <Toolbar sx={{ backgroundColor: theme.palette.primary.main }} />
          <Divider />
          {children}
        </DrawerComponent>
      </Hidden>
    </>
  );
};

export const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
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
      regions.map((region) => ({
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

  console.log({ jobTypeOptions });

  return (
    <DrawerContainer open={open} onClose={onClose}>
      <Box p={1} display="grid" rowGap="20px">
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
            <SearchSelectInput
              name="regionIds"
              selectProps={{
                placeholder: "Lokacija...",
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
          </FormikForm>
        </Formik>
      </Box>
    </DrawerContainer>
  );
};
