import SplitButton from '@src/components/shared/SplitButton';
import { useState } from 'react';
import { AddBillingDocument } from './BillingDocument/IssuedInvoiceReader';

const AddSalesDocument = () => {
  const [issuedInvoiceOpen, setIssuedInvoiceOpen] = useState(false);
  const [withholdingOpen, setWithholdingOpen] = useState(false);

  return (
    <>
      <SplitButton
        action={{
          label: 'Cargar facturas',
          onClick: () => setIssuedInvoiceOpen(true),
        }}
        options={[
          {
            label: 'Cargar retenciones',
            onClick: () => setWithholdingOpen(true),
          },
        ]}
      />

      <AddBillingDocument
        open={issuedInvoiceOpen}
        onClose={() => setIssuedInvoiceOpen(false)}
      />
    </>
  );
};

export default AddSalesDocument;
