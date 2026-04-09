import { type UseTRPCInfiniteQueryResult } from "@trpc/react-query/shared";
import { useMemo, type ReactNode } from "react";

import { config } from "~/config";

import { EmptyState } from "./EmptyState";
import { FetchInView } from "./FetchInView";

const columnMap = {
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 lg:grid-cols-3",
} as const;

type Props<T> = UseTRPCInfiniteQueryResult<T[], unknown, unknown> & {
  renderItem: (item: T, opts: { isLoading: boolean }) => ReactNode;
  columns?: keyof typeof columnMap;
};

export const InfiniteLoading = <T,>({
  data,
  columns = 3,
  isFetchingNextPage,
  isLoading,
  renderItem,
  fetchNextPage,
}: Props<T>): JSX.Element => {
  const loadingItems = useMemo(
    () =>
      Array.from({ length: config.pageSize }).map((_, id) => ({
        id,
      })) as T[],
    [],
  );
  const pages = useMemo(() => data?.pages ?? [], [data?.pages]);
  const items = useMemo(() => {
    const all = pages.reduce<T[]>((acc, x) => acc.concat(x), []);
    const seen = new Set<string>();
    return all.filter((item) => {
      const id = (item as Record<string, unknown>).id as string | undefined;
      if (!id || seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  }, [pages]);

  const hasMore = useMemo(() => {
    if (!pages.length) {
      return false;
    }
    return (pages[pages.length - 1]?.length ?? 0) === config.pageSize;
  }, [pages]);

  return (
    <div>
      {!isLoading && !items.length ? <EmptyState title="No proposals yet! Be the first to create one." /> : null}

      <div className={`mb-16 grid ${columnMap[columns]} gap-4`}>
        {items.map((item) => renderItem(item, { isLoading }))}

        {(isLoading || isFetchingNextPage) && loadingItems.map((item) => renderItem(item, { isLoading }))}
      </div>

      <FetchInView fetchNextPage={fetchNextPage} hasMore={hasMore} isFetchingNextPage={isFetchingNextPage} />
    </div>
  );
};
