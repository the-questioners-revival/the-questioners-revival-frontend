import React, { useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from '@chakra-ui/react';
import { Field } from 'formik';

export interface SelectOption {
  name: string;
  value: string;
}

const CustomField = ({
  name,
  required = true,
  type,
  options,
  rows,
  inputType,
}: {
  name: string;
  required?: boolean;
  type: string;
  options?: SelectOption[];
  rows?: number;
  inputType?: string;
}) => {
  const [query, setQuery] = useState('');

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Field name={name} validate={(value: string) => validateField(name, value)}>
      {({ field, form, meta }: { field: any; form: any; meta: any }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{capitalizeFirstLetter(name)}</FormLabel>

          {type === 'input' ? (
            <Input {...field} placeholder={name} bg="white" type={inputType} />
          ) : null}

          {type === 'textArea' ? (
            <Textarea {...field} placeholder={name} bg="white" rows={rows} />
          ) : null}

          {type === 'select' ? (
            <Select {...field} placeholder="Select option" bg="white">
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          ) : null}

          {type === 'searchableSelect' ? (
            <Menu>
              <MenuButton as={Button} width="100%" bg="white" textAlign="left">
                {meta.value || 'Select option'}
              </MenuButton>
              <MenuList>
                <Box padding="10px">
                  <Input
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                </Box>
                {options
                  ?.filter((option) =>
                    option.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => form.setFieldValue(name, option.value)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          ) : null}

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomField;
