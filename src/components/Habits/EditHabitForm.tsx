import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { habitRepeatOptions, habitTypeOptions } from '../Qaa/CreateHabitForm';

const EditHabitForm = ({
  editHabit,
  habit,
}: {
  editHabit: Function;
  habit: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{
        title: habit.title,
        type: habit.type,
        repeat: habit.repeat,
      }}
      onSubmit={(values, actions) => {
        editHabit({
          ...habit,
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
              <CustomField
                name="type"
                type="select"
                options={habitTypeOptions}
              />
              <CustomField
                name="repeat"
                type="select"
                options={habitRepeatOptions}
                required={false}
              />

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

export default EditHabitForm; // Updated component name
