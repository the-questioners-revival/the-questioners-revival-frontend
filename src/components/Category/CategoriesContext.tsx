import React, { createContext, useContext, useEffect, useState } from 'react';
import CategoryApi from '../../api/category'; // Import your API logic
import useAbstractProvider from '../../providers/AbstractProvider';

interface CategoryContextProps {
  categories: any[];
  refetchCategories: Function;
  loading: boolean;
  categoriesOptions: any[];
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined,
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);

  const {
    data: getLatestCategoriesData,
    refetch: refetchCategories,
    loading: getLatestCategoriesLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    CategoryApi.getLatestCategories,
    null,
    true,
  );

  useEffect(() => {
    if (getLatestCategoriesData) {
      setCategories(getLatestCategoriesData);
      setCategoriesOptions(
        getLatestCategoriesData.map((category: any) => ({
          name: category.name,
          value: category.id,
        })),
      );
    }
  }, [getLatestCategoriesData]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        refetchCategories,
        loading: getLatestCategoriesLoading,
        categoriesOptions: categoriesOptions,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      'useCategoryContext must be used within a CategoryProvider',
    );
  }
  return context;
};
