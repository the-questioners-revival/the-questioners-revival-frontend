import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import moment from 'moment';

export const goalOptions = [
  {
    name: 'Weekly',
    value: 'weekly',
  },
  {
    name: 'Monthly',
    value: 'monthly',
  },
  {
    name: 'Yearly',
    value: 'yearly',
  },
];

const CreateGoalForm = ({
  createGoal,
  date,
}: {
  createGoal: Function;
  date: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{
        title: '',
        type: '',
      }}
      onSubmit={(values, actions) => {
        const startOf = values.type.slice(0, -2) as any;
        const startDate = moment(date).startOf(startOf).toISOString();
        createGoal({
          title: values.title,
          type: values.type,
          given_at: startDate,
        }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="title" type="input" />
              <CustomField name="type" type="select" options={goalOptions} />

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

export default CreateGoalForm; // Updated component name
