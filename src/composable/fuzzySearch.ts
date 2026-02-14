import Fuse, { type IFuseOptions } from 'fuse.js';
import { type MaybeRef, computed, toValue } from 'vue';

export { useFuzzySearch };

function useFuzzySearch<Data>({
  search,
  data,
  options = {},
}: {
  search: MaybeRef<string>
  data: Data[]
  options?: IFuseOptions<Data> & { filterEmpty?: boolean }
}) {
  const { filterEmpty = true, ...fuseOptions } = options;
  const fuse = new Fuse(data, fuseOptions);

  const searchResult = computed<Data[]>(() => {
    const query = toValue(search);

    if (!filterEmpty && query === '') {
      return data;
    }

    return fuse.search(query).map(({ item }) => item);
  });

  return { searchResult };
}
