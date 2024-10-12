import GithubApi from '../api/github';
import useAbstractProvider from './AbstractProvider';

export default function GithubProvider() {
  const {
    data: fetchGitHubContributionsData,
    refetch: fetchGitHubContributions,
    loading: fetchGitHubContributionsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    GithubApi.fetchGitHubContributions,
    null,
    false,
  );

  return {
    fetchGitHubContributionsData,
    fetchGitHubContributions,
    fetchGitHubContributionsLoading,
  };
}
