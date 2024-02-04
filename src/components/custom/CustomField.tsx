import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Field } from 'formik';

interface SelectOption {
  name: string;
  value: string;
}

const CustomField = ({
  name,
  required = true,
  type,
  options,
}: {
  name: string;
  required?: boolean;
  type: string;
  options?: SelectOption[];
}) => {
  function validateField(name: string, value: string) {
    let error;
    if (required && !value) {
      error = `Field ${name} is required`;
    }
    return error;
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Field name={name} validate={(value: string) => validateField(name, value)}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{capitalizeFirstLetter(name)}</FormLabel>
          {type === 'input' ? (
            <Input {...field} placeholder={name} bg="white" />
          ) : null}
          {type === 'textArea' ? (
            <Textarea {...field} placeholder={name} bg="white" />
          ) : null}

          {type === 'select' ? (
            <Select {...field} placeholder="Select option" bg="white">
              {options?.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
          ) : null}
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomField;
