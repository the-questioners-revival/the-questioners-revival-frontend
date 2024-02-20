import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import BlogApi from '../api/blog';

export default function BlogsProvider() {
  const {
    data: getAllBlogsGroupedByDateData,
    refetch: getAllBlogsGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    BlogApi.getAllBlogsGroupedByDate,
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
    getAllBlogsGroupedByDateData,
    getAllBlogsGroupedByDate,
    createBlogData,
    createBlog,
    editBlogData,
    editBlog,
    removeBlogData,
    removeBlog,
  };
}
