import { Student } from "models";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress } from "@material-ui/core";
import {InputField, RadioGroupField, SelectField} from "components/FormFields";
import { useAppSelector } from "app/hooks";
import { selectCityOptions } from "features/city/citySlice";
import { Alert } from '@material-ui/lab';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name.")
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;

      const parts = value?.split(" ") || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive("Please enter a positive number.")
    .min(18, "Min is 18")
    .max(60, "Max is 60")
    .integer("Please enter an integer.")
    .required("Please enter age.")
    .typeError("Please enter a valid number."),
  mark: yup
    .number()
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .required("Please enter mark.")
    .typeError("Please enter a valid number."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select either male or female.")
    .required("Please select gender."),
  city: yup.string().required("Please select city."),
});
export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (formValues: Student) => {
    try {
      // Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      console.log("Failure to add/update student", error);
      setError(error.message);
    }
  };

  const cityOptions = useAppSelector(selectCityOptions);

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}
        {error && <Alert severity="error">{error}</Alert>}


        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}{" "}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
