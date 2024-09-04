"use client";

import { Pagination } from '@repo/ui/nextui';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function PaginationNext({ total, page, isDisabled }: { total: number; page: number; isDisabled: boolean }): JSX.Element {
  const urlSearchParams = useMemo(
    () => new URLSearchParams({ page: page.toString() }),
    [page]
  );
  const { replace } = useRouter();

  return (
    <Pagination
        total={total}
        page={page}
        isDisabled={isDisabled}
        onChange={(page) => {
          urlSearchParams.set('page', page.toString());
          replace(`?${urlSearchParams.toString()}`);
        }}
      />
  );
}
