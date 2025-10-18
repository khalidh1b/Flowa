import { getUserAccounts } from '@/app/actions/dashboard'
import { defaultCategories } from '@/data/categories';
import AddTransactionForm from '../_components/transaction-form';
import type { ReactElement } from 'react';
import { getTransaction } from '@/app/actions/transaction';

type SearchParams = { [key: string]: string | string[] | undefined };

const AddTransactionPage = async ({ searchParams }: { searchParams?: Promise<SearchParams> }): Promise<ReactElement> => {
  const accounts = await getUserAccounts();
  const params = await searchParams;
  const editParam = params?.edit;
  const edit = typeof editParam === 'string' ? editParam : Array.isArray(editParam) ? editParam[0] : undefined;
  const editId = edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className='max-w-3xl mx-auto px-5'>
      <h1 className='text-5xl gradient-title mb-8'>
        {editId ? "Edit" : "Add"} Transaction
      </h1>

      <AddTransactionForm accounts={accounts} categories={defaultCategories as any} editMode={!!editId} initialData={initialData} />
    </div>
  )
}

export default AddTransactionPage