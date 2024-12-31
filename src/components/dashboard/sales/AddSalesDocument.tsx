import SplitButton from '@src/components/shared/SplitButton';
import { useState } from 'react';
import { IssuedInvoiceReader } from './BillingDocument/IssuedInvoiceReader';
import WithholdingReader from './Withholding/WithholdingReader';

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

      <IssuedInvoiceReader
        open={issuedInvoiceOpen}
        onClose={() => setIssuedInvoiceOpen(false)}
      />

      <WithholdingReader
        open={withholdingOpen}
        onClose={() => setWithholdingOpen(false)}
      />
    </>
  );
};

export default AddSalesDocument;
