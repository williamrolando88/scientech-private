import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { Invoice } from '@src/types/expenses';
import { FC } from 'react';

const InvoiceList: FC = () => {
  const { data: invoices } = useListExpensesByType<Invoice>('invoice');

  return (
    <div>
      <h3>Invoices List</h3>
      <pre>{JSON.stringify(invoices, null, 2)}</pre>
    </div>
  );
};

export default InvoiceList;
