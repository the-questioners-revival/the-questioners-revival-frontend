import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { goalOptions } from './CreateGoalForm';

const EditGoalForm = ({
  goal,
  editGoal,
}: {
  editGoal: Function;
  goal: any;
}) => {
  return (
    <Formik
      initialValues={{ title: goal.title, type: goal.type }}
      onSubmit={(values, actions) => {
        editGoal({
          ...goal,
          ...values,
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

export default EditGoalForm; // Updated component name
