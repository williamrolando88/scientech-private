import { xml2js } from 'xml-js';
import { get } from 'lodash';

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

const digestedDataParser = (source: string, path: string) => {
  const data = xml2js(source, {
    compact: true,
    ignoreAttributes: true,
  }) as any;

  const nestedPathValue = get(data, path);

  if (nestedPathValue) {
    return nestedPathValue;
  }

  return null;
};

export const xmlToJsParser = (xmlText: string, path: string) => {
  const docData = xml2js(xmlText, {
    compact: true,
    ignoreAttributes: true,
  });

  const sourceData = Object.values(docData).find((value) =>
    Boolean(value?.comprobante)
  );

  const _cdata = get(sourceData, 'comprobante._cdata');
  const _text = get(sourceData, 'comprobante._text');
  const pathValue = get(sourceData, `comprobante.${path}`);

  if (_cdata) {
    return digestedDataParser(_cdata, path);
  }
  if (_text) {
    return digestedDataParser(_text, path);
  }

  return pathValue;
};

export const documentParser = (xmlText: string, path: string) => {
  const convertedDocument = xmlToJsParser(xmlText, path);

  return cleanObjectTree(convertedDocument);
};
