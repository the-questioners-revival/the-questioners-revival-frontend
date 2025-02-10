import { Text, Heading, Select, Box } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { useEffect, useState } from 'react';
import ProtectedPage from '../ProtectedPage';
import CategoryApi from '../../api/category';
import useAbstractProvider from '../../providers/AbstractProvider';
import CategoryTree from './CategoryTree';
import { Category } from '../../types';
import useAbstractMutator from '../../providers/AbstractMutator';

const CategoriesPage = () => {
  const {
    data: getLatestCategoriesData,
    refetch: getLatestCategories,
    loading: getLatestCategoriesLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    CategoryApi.getCategoryTree,
    null,
    true,
  );

  const {
    data: createCategoryData,
    mutate: createCategory,
  }: { data: any; mutate: Function } = useAbstractMutator(
    CategoryApi.createCategory,
  );

  useEffect(() => {
    if (createCategoryData) {
      getLatestCategories();
    }
  }, [createCategoryData]);

  return (
    <ProtectedPage>
      <CustomLayout maxWidth={false}>
        <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
          Categories
        </Heading>
        <Box mb="20px">
          <CategoryTree
            categories={getLatestCategoriesData}
            getLatestCategories={getLatestCategories}
            addCategory={(parentCategoryId, categoryName) => {
              createCategory({
                name: categoryName,
                category_id: parentCategoryId,
              });
            }}
          />
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default CategoriesPage;
