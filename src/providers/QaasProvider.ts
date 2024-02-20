import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import QaaApi from '../api/qaa';

export default function QaasProvider() {
  const {
    data: qaasData,
    refetch: qaasRefetch,
  }: { data: any; refetch: Function } = useAbstractProvider(
    QaaApi.getLatestQaas,
    null,
    false,
  );

  const {
    data: createQaaData,
    mutate: createQaa,
  }: { data: any; mutate: Function } = useAbstractMutator(QaaApi.createQaa);

  const {
    data: removeQaaData,
    mutate: removeQaa,
  }: { data: any; mutate: Function } = useAbstractMutator(QaaApi.removeQaa);

  const {
    data: editQaaData,
    mutate: editQaa,
  }: { data: any; mutate: Function } = useAbstractMutator(QaaApi.editQaa);

  const {
    data: getAllQaasGroupedByDateData,
    refetch: getAllQaasGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    QaaApi.getAllQaasGroupedByDate,
    null,
    false,
  );

  return {
    qaasData,
    qaasRefetch,
    createQaaData,
    createQaa,
    removeQaaData,
    removeQaa,
    editQaaData,
    editQaa,
    getAllQaasGroupedByDateData,
    getAllQaasGroupedByDate,
  };
}
