import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

const options = [
  {
    name: 'Personal',
    value: 'personal',
  },
  {
    name: 'Work',
    value: 'work',
  },
  {
    name: 'Project',
    value: 'project',
  },
];

const EditQaaForm = ({ editQaa, qaa }: { editQaa: Function; qaa: any }) => {
  // Updated component name
  return (
    <Formik
      initialValues={{
        question: qaa.question,
        answer: qaa.answer,
        link: qaa.link,
        type: qaa.type,
      }}
      onSubmit={(values, actions) => {
        editQaa({ id: qaa.id, ...values }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="question" type="input" />
              <CustomField name="answer" type="textArea" />
              <CustomField name="link" type="input" required={false} />
              <CustomField name="type" type="select" options={options} />

              <Button
                mt={4}
                display="flex"
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default EditQaaForm; // Updated component name
