import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { Expense } from '@src/types/expenses';
import { FC } from 'react';

const NonDeductibleList: FC = () => {
  const { data: nonDeductible } =
    useListExpensesByType<Expense>('non_deductible');

  return (
    <div>
      <pre>{JSON.stringify(nonDeductible, null, 2)}</pre>
    </div>
  );
};

export default NonDeductibleList;
