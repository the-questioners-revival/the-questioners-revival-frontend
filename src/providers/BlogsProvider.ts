import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import BlogApi from '../api/blog';

export default function BlogsProvider() {
  const {
    data: getAllBlogsGroupedByDateData,
    refetch: getAllBlogsGroupedByDate,
    loading: getAllBlogsGroupedByDateDataLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    BlogApi.getAllBlogsGroupedByDate,
    null,
    false,
  );

  const {
    data: getBlogByTodoIdData,
    refetch: getBlogByTodoId,
    loading: getBlogByTodoIdLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    BlogApi.getBlogByTodoId,
    null,
    false,
  );

  const {
    data: getBlogByIdData,
    refetch: getBlogByIdRefetch,
    loading: getBlogByIdLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    BlogApi.getBlogById,
    null,
    false,
  );

  const {
    data: createBlogData,
    mutate: createBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.createBlog);

  const {
    data: editBlogData,
    mutate: editBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.editBlog);

  const {
    data: removeBlogData,
    mutate: removeBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.removeBlog);

  return {
    getBlogByTodoIdData,
    getBlogByTodoId,
    getBlogByTodoIdLoading,
    getBlogByIdRefetch,
    getBlogByIdData,
    getBlogByIdLoading,
    getAllBlogsGroupedByDateData,
    getAllBlogsGroupedByDate,
    getAllBlogsGroupedByDateDataLoading,
    createBlogData,
    createBlog,
    editBlogData,
    editBlog,
    removeBlogData,
    removeBlog,
  };
}
