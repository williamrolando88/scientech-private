import { Invoice } from 'src/@types/invoiceParsers';
import { xml2js } from 'xml-js';
import { InvoiceParser } from '../parsers/invoiceParsers';

const cleanObjectTree = (obj: any): any => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanObjectTree(item));
  }
  const result: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key]._text) {
      result[key] = obj[key]._text;
    } else {
      result[key] = cleanObjectTree(obj[key]);
    }
  });
  return result;
};

const facturaXmlToJs = (xmlText: string) => {
  const billData = xml2js(xmlText, {
    compact: true,
    ignoreAttributes: true,
  });

  // eslint-disable-next-line no-unsafe-optional-chaining
  const { _cdata, factura } = (billData as any)?.autorizacion?.comprobante;

  if (_cdata) {
    const data = xml2js(_cdata, {
      compact: true,
      ignoreAttributes: true,
    }) as any;

    if (data.factura) {
      return data.factura;
    }

    return data;
  }

  return factura;
};

export const parseFactura = (xmlText: string): Invoice | null => {
  const convertedFactura = facturaXmlToJs(xmlText);
  const cleanFactura = cleanObjectTree(convertedFactura);

  const parsedFactura = InvoiceParser.safeParse(cleanFactura);

  if (parsedFactura.success) {
    return parsedFactura.data;
  }

  return null;
};
