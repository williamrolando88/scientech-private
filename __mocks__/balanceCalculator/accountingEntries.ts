import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';

export const balanceCalculatorInput: Record<string, DoubleEntryAccounting> = {
  '1Yiib5ZqfNy1oARagyX0': {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.19'],
    createdAt: new Date('2024-07-31T23:27:03.769Z'),
    description: 'Anticipo Javier Pilataxi tablero biologia',
    id: '1Yiib5ZqfNy1oARagyX0',
    issueDate: new Date('2024-07-22T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 100, debit: 0 },
      { accountId: '1.01.02.05.02.19', credit: 0, debit: 100 },
    ],
    updatedAt: new Date('2024-07-31T23:27:03.769Z'),
  },
  '1fVaNV5baG1gxbf0FptK': {
    accounts: [
      '1.01.01.03.01',
      '5.01.01.13',
      '1.01.05.01',
      '1.01.02.05.02.19',
      '1.01.01.03.01',
    ],
    createdAt: new Date('2024-08-29T18:52:59.872Z'),
    description:
      'Factura recibida: 1720790151001-Instalacion tablero de control ICB u Biologia',
    id: '1fVaNV5baG1gxbf0FptK',
    issueDate: new Date('2024-08-28T16:46:31.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: '1fVaNV5baG1gxbf0FptK',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 600.7, debit: 0 },
      { accountId: '5.01.01.13', credit: 0, debit: 522.35 },
      { accountId: '1.01.05.01', credit: 0, debit: 78.35 },
      { accountId: '1.01.02.05.02.19', credit: 250, debit: 0 },
      { accountId: '1.01.01.03.01', credit: 0, debit: 250 },
    ],
    updatedAt: new Date('2024-09-06T19:50:08.757Z'),
  },
  '4iUNFZQeQUBuzBQe1I1h': {
    accounts: ['1.01.01.03.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-05T22:27:48.368Z'),
    description:
      'Factura recibida: 1791948963001-angulo 1 1/4 x 1/8 - 8.05, kilo suelda  6011 1/B8 AGA, ANTICORROSIVO 1/4 NG CONDOR MA',
    id: '4iUNFZQeQUBuzBQe1I1h',
    issueDate: new Date('2024-07-04T22:24:21.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: '4iUNFZQeQUBuzBQe1I1h',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 60.15, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 52.3 },
      { accountId: '1.01.05.01', credit: 0, debit: 7.85 },
    ],
    updatedAt: new Date('2024-07-31T20:52:48.655Z'),
  },
  '9z0ricIuuBt7cL0h323q': {
    accounts: ['1.01.02.05.02.01', '4.01.02', '2.01.07.01'],
    createdAt: new Date('2025-01-05T21:22:32.552Z'),
    description:
      "Factura emitida: 1-1-246\nA: Consorcio Maho\n\n1035.35 - Ductos de Tol Galvanizado sin aislamiento térmico- ICB\n64 - Rejilla de extracción 6'' x 6'' color blanco, ICB\n64 - manga flexible sin aislamiento d=6\"\n1 - Vetilador centifugo 4480 cfm@1.5inWC 3HP. Incluye caja e instalacion\n1 - Construcción de tablero de control\n70 - Damper mecanico\n1 - Extractor 150cfm incluye conexion - biologia\n4 - Rejilla de extracción 6'' x 6'' color blanco- Biologia\n71.37 - Ductos de Tol Galvanizado cuadrado sin aislamiento termico- Biologia",
    id: '9z0ricIuuBt7cL0h323q',
    issueDate: new Date('2024-08-28T17:00:00.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      saleId: '9z0ricIuuBt7cL0h323q',
    },
    transactions: [
      { accountId: '1.01.02.05.02.01', credit: 0, debit: 14127.47 },
      { accountId: '4.01.02', credit: 12284.75, debit: 0 },
      { accountId: '2.01.07.01', credit: 1842.71, debit: 0 },
    ],
    updatedAt: new Date('2025-01-05T21:24:44.259Z'),
  },
  '9z0ricIuuBt7cL0h323q-spc': {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.01', '2.02.06'],
    createdAt: new Date('2025-01-05T21:24:04.961Z'),
    description: 'Cobro de factura emitida: 1-1-246',
    id: '9z0ricIuuBt7cL0h323q-spc',
    issueDate: new Date('2024-09-26T21:21:17.379Z'),
    locked: true,
    ref: {
      paymentCollectionId: '9z0ricIuuBt7cL0h323q-spc',
      projectId: 'M68lnROy56aCUgiog214',
      saleId: '9z0ricIuuBt7cL0h323q',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 0, debit: 4127.47 },
      {
        accountId: '1.01.02.05.02.01',
        credit: 14127.470000000001,
        debit: 0,
      },
      { accountId: '2.02.06', credit: 0, debit: 10000 },
    ],
    updatedAt: new Date('2025-01-05T21:24:44.315Z'),
  },
  DiSXGYN34bDttOGxOYBy: {
    accounts: ['2.01.04.01.01', '5.01.01.02'],
    createdAt: new Date('2024-07-03T22:56:08.645Z'),
    description:
      'Nota de venta: FERRETERIA EL CONSTRUCTOR /0201123197001 / 002-001-4115 SPRIT ROJO',
    id: 'DiSXGYN34bDttOGxOYBy',
    issueDate: new Date('2024-07-03T22:54:00.449Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'DiSXGYN34bDttOGxOYBy',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 2.3, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 2.3 },
    ],
    updatedAt: new Date('2024-07-03T22:58:40.234Z'),
  },
  Ew19ZFjcsOS6bhqchada: {
    accounts: ['1.01.01.03.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-08-29T18:45:31.632Z'),
    description: 'Factura recibida: 1791408381001-Mangas 4 in',
    id: 'Ew19ZFjcsOS6bhqchada',
    issueDate: new Date('2024-08-19T16:46:31.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'Ew19ZFjcsOS6bhqchada',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 36.8, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 32 },
      { accountId: '1.01.05.01', credit: 0, debit: 4.8 },
    ],
    updatedAt: new Date('2024-08-29T18:45:31.632Z'),
  },
  FPT05eeXs1aSqzF6Lt11: {
    accounts: ['2.01.04.01.01', '5.02.01.17'],
    createdAt: new Date('2024-08-29T17:43:14.700Z'),
    description: 'Gasto no deducible: Almuerzos almuerzos',
    id: 'FPT05eeXs1aSqzF6Lt11',
    issueDate: new Date('2024-08-14T16:46:31.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'FPT05eeXs1aSqzF6Lt11',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 6, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 6 },
    ],
    updatedAt: new Date('2024-08-29T17:43:14.700Z'),
  },
  FQgsaF4s5GZmmWcuo6j9: {
    accounts: ['1.01.01.03.01', '2.02.06'],
    createdAt: new Date('2024-07-31T23:01:33.941Z'),
    description: 'Anticipo proyecto EPN',
    id: 'FQgsaF4s5GZmmWcuo6j9',
    issueDate: new Date('2024-07-08T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 0, debit: 3000 },
      { accountId: '2.02.06', credit: 3000, debit: 0 },
    ],
    updatedAt: new Date('2024-07-31T23:01:33.941Z'),
  },
  G4l44fOPnvptJZpaelbl: {
    accounts: ['1.01.01.03.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-08T23:52:51.386Z'),
    description:
      'Factura recibida: 1791408381001-1 vent centrifugo doble oido, 1motor electrico 3hp, 1kit poleas',
    id: 'G4l44fOPnvptJZpaelbl',
    issueDate: new Date('2024-07-08T23:47:40.832Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'G4l44fOPnvptJZpaelbl',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 1862.77, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 1619.8 },
      { accountId: '1.01.05.01', credit: 0, debit: 242.97 },
    ],
    updatedAt: new Date('2024-07-31T20:51:15.260Z'),
  },
  KOYroJmDjRmbyi2mXcFL: {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.19'],
    createdAt: new Date('2024-07-31T23:28:43.757Z'),
    description: 'Anticipo Fernando Ojeda',
    id: 'KOYroJmDjRmbyi2mXcFL',
    issueDate: new Date('2024-07-26T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 600, debit: 0 },
      { accountId: '1.01.02.05.02.19', credit: 0, debit: 600 },
    ],
    updatedAt: new Date('2024-07-31T23:28:43.757Z'),
  },
  NDSytAdFataUxFMTL26x: {
    accounts: ['2.01.04.01.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-02T00:02:57.910Z'),
    description:
      'Factura recibida: 1790041220001-guante nitrilo, casco tipo 1, calibrador 6" digital, cono flexible pvc',
    id: 'NDSytAdFataUxFMTL26x',
    issueDate: new Date('2024-07-01T23:58:19.530Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'NDSytAdFataUxFMTL26x',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 91.37, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 79.45 },
      { accountId: '1.01.05.01', credit: 0, debit: 11.92 },
    ],
    updatedAt: new Date('2024-07-02T00:02:57.910Z'),
  },
  OhL4Pw9sBhvRDoLRA0OT: {
    accounts: ['1.01.01.03.01', '5.02.02.04'],
    createdAt: new Date('2024-07-31T23:27:52.266Z'),
    description: 'Viaticos Sebas',
    id: 'OhL4Pw9sBhvRDoLRA0OT',
    issueDate: new Date('2024-07-24T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 15, debit: 0 },
      { accountId: '5.02.02.04', credit: 0, debit: 15 },
    ],
    updatedAt: new Date('2024-07-31T23:27:52.266Z'),
  },
  OqY9pXKCL8g7UapFUHmb: {
    accounts: ['2.01.04.01.01', '5.02.01.17'],
    createdAt: new Date('2024-07-31T17:36:23.297Z'),
    description: 'Gasto no deducible: viaticos Sebastian Viaticos',
    id: 'OqY9pXKCL8g7UapFUHmb',
    issueDate: new Date('2024-07-29T16:59:26.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'OqY9pXKCL8g7UapFUHmb',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 5, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 5 },
    ],
    updatedAt: new Date('2024-07-31T17:36:23.297Z'),
  },
  RBgEOBDf34ZOKESjs0EK: {
    accounts: ['1.01.01.03.01', '5.01.01.13', '1.01.02.05.02.19'],
    createdAt: new Date('2024-09-30T20:17:59.062Z'),
    description:
      'Factura recibida: 1722026315001-Instalacion de sistema ventilacion mecanica ICB y biologia',
    id: 'RBgEOBDf34ZOKESjs0EK',
    issueDate: new Date('2024-09-13T20:09:57.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'RBgEOBDf34ZOKESjs0EK',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 2777.19, debit: 0 },
      { accountId: '5.01.01.13', credit: 0, debit: 6107.19 },
      { accountId: '1.01.02.05.02.19', credit: 3330, debit: 0 },
    ],
    updatedAt: new Date('2024-09-30T20:25:32.433Z'),
  },
  S1QYGMGZbopvwfaFAbqi: {
    accounts: ['2.01.04.01.01', '5.02.01.17'],
    createdAt: new Date('2024-07-03T22:57:23.159Z'),
    description:
      'Nota de venta: restaurante el pap / 1704795424001 / 124 ALMUERZO',
    id: 'S1QYGMGZbopvwfaFAbqi',
    issueDate: new Date('2024-07-03T22:54:00.449Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'S1QYGMGZbopvwfaFAbqi',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 3, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 3 },
    ],
    updatedAt: new Date('2024-07-03T22:57:23.159Z'),
  },
  SWTxzbjY8i5uOksXyeTO: {
    accounts: ['1.01.01.03.01', '5.02.02.01'],
    createdAt: new Date('2024-08-29T16:37:15.283Z'),
    description: 'Sueldo Julio Sebastian',
    id: 'SWTxzbjY8i5uOksXyeTO',
    issueDate: new Date('2024-08-01T15:39:09.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 460, debit: 0 },
      { accountId: '5.02.02.01', credit: 0, debit: 460 },
    ],
    updatedAt: new Date('2024-08-29T18:37:08.410Z'),
  },
  TGGpQoLaUQczpgeE4jAO: {
    accounts: ['1.01.01.03.01', '5.02.01.17'],
    createdAt: new Date('2024-07-03T02:09:21.153Z'),
    description:
      'Gasto no deducible: Ines Transferido a Ines para viaticos de Sebastian',
    id: 'TGGpQoLaUQczpgeE4jAO',
    issueDate: new Date('2024-07-02T01:35:19.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'TGGpQoLaUQczpgeE4jAO',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 20, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 20 },
    ],
    updatedAt: new Date('2024-07-03T02:09:21.153Z'),
  },
  WkR1lvdzkbBF2EDQjW7g: {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.19'],
    createdAt: new Date('2024-07-31T23:14:29.340Z'),
    description: 'Anticipo Fernando Ojeda',
    id: 'WkR1lvdzkbBF2EDQjW7g',
    issueDate: new Date('2024-07-16T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 230, debit: 0 },
      { accountId: '1.01.02.05.02.19', credit: 0, debit: 230 },
    ],
    updatedAt: new Date('2024-07-31T23:14:29.340Z'),
  },
  Z8TZ8Oi3xXLalNMD8n7W: {
    accounts: ['2.01.04.01.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-08T23:54:50.038Z'),
    description: 'Factura recibida: 1791408381001-1 rejilla de mando 6¨x6¨',
    id: 'Z8TZ8Oi3xXLalNMD8n7W',
    issueDate: new Date('2024-07-08T23:47:40.832Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'Z8TZ8Oi3xXLalNMD8n7W',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 11.96, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 10.4 },
      { accountId: '1.01.05.01', credit: 0, debit: 1.56 },
    ],
    updatedAt: new Date('2024-07-31T18:28:35.713Z'),
  },
  c9AJru3hlkvyB1Yssgb6: {
    accounts: ['1.01.01.03.01', '2.02.06'],
    createdAt: new Date('2024-09-30T17:01:03.737Z'),
    description: 'cobro al consorcio maho',
    id: 'c9AJru3hlkvyB1Yssgb6',
    issueDate: new Date('2024-09-06T15:42:11.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 0, debit: 3000 },
      { accountId: '2.02.06', credit: 3000, debit: 0 },
    ],
    updatedAt: new Date('2024-09-30T20:37:09.094Z'),
  },
  dOUwPjkDL8w4qj6tX20x: {
    accounts: ['1.01.01.03.01', '5.02.01.17'],
    createdAt: new Date('2024-08-29T16:35:03.290Z'),
    description: 'Viaticos Sebas',
    id: 'dOUwPjkDL8w4qj6tX20x',
    issueDate: new Date('2024-08-01T15:39:09.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 10, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 10 },
    ],
    updatedAt: new Date('2024-08-29T16:35:03.290Z'),
  },
  jne3m5cMJ0oxJ2AeGPPX: {
    accounts: ['2.01.04.01.01', '5.01.01.02'],
    createdAt: new Date('2024-07-05T22:31:09.025Z'),
    description:
      'Nota de venta: FERRETERIA EL CONSTRUCTOR /0201123197001 / 002-001-4126 30 tacos, 30arandelas, 30 tuercas',
    id: 'jne3m5cMJ0oxJ2AeGPPX',
    issueDate: new Date('2024-07-05T22:24:21.579Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'jne3m5cMJ0oxJ2AeGPPX',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 9.9, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 9.9 },
    ],
    updatedAt: new Date('2024-07-05T22:31:09.025Z'),
  },
  mRon7YZkunKi2QlqCxpN: {
    accounts: ['1.01.01.03.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-31T22:48:36.006Z'),
    description: 'Factura recibida: 1791408381001-rejillas extraccion',
    id: 'mRon7YZkunKi2QlqCxpN',
    issueDate: new Date('2024-07-02T16:59:26.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'mRon7YZkunKi2QlqCxpN',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 500.48, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 435.2 },
      { accountId: '1.01.05.01', credit: 0, debit: 65.28 },
    ],
    updatedAt: new Date('2024-07-31T22:48:36.006Z'),
  },
  myWM1ILJSsOx5VCgC1LX: {
    accounts: ['2.01.04.01.01', '5.01.01.02'],
    createdAt: new Date('2024-08-29T20:45:14.996Z'),
    description: 'resistencias de potencia',
    id: 'myWM1ILJSsOx5VCgC1LX',
    issueDate: new Date('2024-08-20T15:39:09.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 5.85, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 5.85 },
    ],
    updatedAt: new Date('2024-08-29T20:45:14.996Z'),
  },
  oVu6f9QevOC1gLPhywOM: {
    accounts: ['1.01.01.03.01', '2.02.06'],
    createdAt: new Date('2024-06-24T22:22:51.196Z'),
    description: 'anticipo proyecto EPN Extracion ICB',
    id: 'oVu6f9QevOC1gLPhywOM',
    issueDate: new Date('2024-06-18T21:14:46.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 0, debit: 4000 },
      { accountId: '2.02.06', credit: 4000, debit: 0 },
    ],
    updatedAt: new Date('2024-09-30T20:33:25.733Z'),
  },
  pBhenHyWQx6vcVWOlVzc: {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.19'],
    createdAt: new Date('2024-07-31T23:29:31.752Z'),
    description: 'Anticipo Javier Pilataxi tablero ICB',
    id: 'pBhenHyWQx6vcVWOlVzc',
    issueDate: new Date('2024-07-26T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 150, debit: 0 },
      { accountId: '1.01.02.05.02.19', credit: 0, debit: 150 },
    ],
    updatedAt: new Date('2024-07-31T23:29:31.752Z'),
  },
  qSQwCOxYUxyFuGX5nGx5: {
    accounts: ['1.01.01.03.01', '5.02.02.04'],
    createdAt: new Date('2024-07-31T23:11:35.573Z'),
    description: 'Viaticos Sebas',
    id: 'qSQwCOxYUxyFuGX5nGx5',
    issueDate: new Date('2024-07-15T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 20, debit: 0 },
      { accountId: '5.02.02.04', credit: 0, debit: 20 },
    ],
    updatedAt: new Date('2024-07-31T23:11:35.573Z'),
  },
  qYRRnun65FY892AbHMxn: {
    accounts: ['2.01.04.01.01', '5.02.01.17'],
    createdAt: new Date('2024-08-29T17:47:07.986Z'),
    description: 'Gasto no deducible: viaticos sebastian viaticos sebastian',
    id: 'qYRRnun65FY892AbHMxn',
    issueDate: new Date('2024-08-20T16:46:31.000Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'qYRRnun65FY892AbHMxn',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 10, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 10 },
    ],
    updatedAt: new Date('2024-08-29T17:47:07.986Z'),
  },
  uXjYKd5g7fBUSO2TIU1X: {
    accounts: ['2.01.04.01.01', '5.02.01.17'],
    createdAt: new Date('2024-07-02T00:05:22.484Z'),
    description:
      'Nota de venta: restaurante el pap / 1704795424001 1 almuerzo ',
    id: 'uXjYKd5g7fBUSO2TIU1X',
    issueDate: new Date('2024-07-01T23:58:19.530Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'uXjYKd5g7fBUSO2TIU1X',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 3, debit: 0 },
      { accountId: '5.02.01.17', credit: 0, debit: 3 },
    ],
    updatedAt: new Date('2024-07-02T00:05:22.484Z'),
  },
  vAh7WbyNc05fXG46c2cy: {
    accounts: ['2.01.04.01.01', '5.01.01.02'],
    createdAt: new Date('2024-07-08T23:49:22.955Z'),
    description:
      'Nota de venta: FERRETERIA EL CONSTRUCTOR / 002-001-4135 100 tornillos ',
    id: 'vAh7WbyNc05fXG46c2cy',
    issueDate: new Date('2024-07-08T23:47:40.832Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'vAh7WbyNc05fXG46c2cy',
    },
    transactions: [
      { accountId: '2.01.04.01.01', credit: 3.5, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 3.5 },
    ],
    updatedAt: new Date('2024-07-08T23:49:22.955Z'),
  },
  wkFbn3kCGGH3G5yE3tIl: {
    accounts: ['1.01.01.03.01', '5.01.01.02', '1.01.05.01'],
    createdAt: new Date('2024-07-02T23:26:38.464Z'),
    description:
      'Factura recibida: 1792076056001-Gualotuña & Gualotuña Cia Ltda',
    id: 'wkFbn3kCGGH3G5yE3tIl',
    issueDate: new Date('2024-07-02T23:09:32.892Z'),
    locked: true,
    ref: {
      projectId: 'M68lnROy56aCUgiog214',
      purchaseId: 'wkFbn3kCGGH3G5yE3tIl',
    },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 96.11, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 83.57 },
      { accountId: '1.01.05.01', credit: 0, debit: 12.54 },
    ],
    updatedAt: new Date('2024-07-31T20:47:02.080Z'),
  },
  wzkCJ2oUltXwHH3G2GCK: {
    accounts: ['1.01.01.03.01', '5.01.01.02'],
    createdAt: new Date('2024-07-31T23:53:16.284Z'),
    description: 'flexible ventilador',
    id: 'wzkCJ2oUltXwHH3G2GCK',
    issueDate: new Date('2024-07-19T16:22:24.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 10, debit: 0 },
      { accountId: '5.01.01.02', credit: 0, debit: 10 },
    ],
    updatedAt: new Date('2024-07-31T23:53:16.284Z'),
  },
  zJDrStvGxr6MOuQeQtY4: {
    accounts: ['1.01.01.03.01', '1.01.02.05.02.19'],
    createdAt: new Date('2024-06-24T22:27:35.895Z'),
    description: 'anticipo  Ferndando por proyecto EPN',
    id: 'zJDrStvGxr6MOuQeQtY4',
    issueDate: new Date('2024-06-19T21:14:46.000Z'),
    locked: false,
    ref: { projectId: 'M68lnROy56aCUgiog214' },
    transactions: [
      { accountId: '1.01.01.03.01', credit: 2500, debit: 0 },
      { accountId: '1.01.02.05.02.19', credit: 0, debit: 2500 },
    ],
    updatedAt: new Date('2024-09-30T20:22:04.503Z'),
  },
};

export const flattedValues = [
  {
    account: '1.01.01.03.01',
    value: -100,
  },
  {
    account: '1.01.01.03.01',
    value: -600.7,
  },
  {
    account: '1.01.01.03.01',
    value: 250,
  },
  {
    account: '1.01.01.03.01',
    value: -60.15,
  },
  {
    account: '1.01.01.03.01',
    value: 4127.47,
  },
  {
    account: '1.01.01.03.01',
    value: -36.8,
  },
  {
    account: '1.01.01.03.01',
    value: 3000,
  },
  {
    account: '1.01.01.03.01',
    value: -1862.77,
  },
  {
    account: '1.01.01.03.01',
    value: -600,
  },
  {
    account: '1.01.01.03.01',
    value: -15,
  },
  {
    account: '1.01.01.03.01',
    value: -2777.19,
  },
  {
    account: '1.01.01.03.01',
    value: -460,
  },
  {
    account: '1.01.01.03.01',
    value: -20,
  },
  {
    account: '1.01.01.03.01',
    value: -230,
  },
  {
    account: '1.01.01.03.01',
    value: 3000,
  },
  {
    account: '1.01.01.03.01',
    value: -10,
  },
  {
    account: '1.01.01.03.01',
    value: -500.48,
  },
  {
    account: '1.01.01.03.01',
    value: 4000,
  },
  {
    account: '1.01.01.03.01',
    value: -150,
  },
  {
    account: '1.01.01.03.01',
    value: -20,
  },
  {
    account: '1.01.01.03.01',
    value: -96.11,
  },
  {
    account: '1.01.01.03.01',
    value: -10,
  },
  {
    account: '1.01.01.03.01',
    value: -2500,
  },
  {
    account: '1.01.02.05.02.01',
    value: 14127.47,
  },
  {
    account: '1.01.02.05.02.01',
    value: -14127.47,
  },
  {
    account: '1.01.02.05.02.19',
    value: 100,
  },
  {
    account: '1.01.02.05.02.19',
    value: -250,
  },
  {
    account: '1.01.02.05.02.19',
    value: 600,
  },
  {
    account: '1.01.02.05.02.19',
    value: -3330,
  },
  {
    account: '1.01.02.05.02.19',
    value: 230,
  },
  {
    account: '1.01.02.05.02.19',
    value: 150,
  },
  {
    account: '1.01.02.05.02.19',
    value: 2500,
  },
  {
    account: '1.01.05.01',
    value: 78.35,
  },
  {
    account: '1.01.05.01',
    value: 7.85,
  },
  {
    account: '1.01.05.01',
    value: 4.8,
  },
  {
    account: '1.01.05.01',
    value: 242.97,
  },
  {
    account: '1.01.05.01',
    value: 11.92,
  },
  {
    account: '1.01.05.01',
    value: 1.56,
  },
  {
    account: '1.01.05.01',
    value: 65.28,
  },
  {
    account: '1.01.05.01',
    value: 12.54,
  },
  {
    account: '2.01.04.01.01',
    value: 2.3,
  },
  {
    account: '2.01.04.01.01',
    value: 6,
  },
  {
    account: '2.01.04.01.01',
    value: 91.37,
  },
  {
    account: '2.01.04.01.01',
    value: 5,
  },
  {
    account: '2.01.04.01.01',
    value: 3,
  },
  {
    account: '2.01.04.01.01',
    value: 11.96,
  },
  {
    account: '2.01.04.01.01',
    value: 9.9,
  },
  {
    account: '2.01.04.01.01',
    value: 5.85,
  },
  {
    account: '2.01.04.01.01',
    value: 10,
  },
  {
    account: '2.01.04.01.01',
    value: 3,
  },
  {
    account: '2.01.04.01.01',
    value: 3.5,
  },
  {
    account: '2.01.07.01',
    value: 1842.71,
  },
  {
    account: '2.02.06',
    value: -10000,
  },
  {
    account: '2.02.06',
    value: 3000,
  },
  {
    account: '2.02.06',
    value: 3000,
  },
  {
    account: '2.02.06',
    value: 4000,
  },
  {
    account: '4.01.02',
    value: 12284.75,
  },
  {
    account: '5.01.01.02',
    value: 52.3,
  },
  {
    account: '5.01.01.02',
    value: 2.3,
  },
  {
    account: '5.01.01.02',
    value: 32,
  },
  {
    account: '5.01.01.02',
    value: 1619.8,
  },
  {
    account: '5.01.01.02',
    value: 79.45,
  },
  {
    account: '5.01.01.02',
    value: 10.4,
  },
  {
    account: '5.01.01.02',
    value: 9.9,
  },
  {
    account: '5.01.01.02',
    value: 435.2,
  },
  {
    account: '5.01.01.02',
    value: 5.85,
  },
  {
    account: '5.01.01.02',
    value: 3.5,
  },
  {
    account: '5.01.01.02',
    value: 83.57,
  },
  {
    account: '5.01.01.02',
    value: 10,
  },
  {
    account: '5.01.01.13',
    value: 522.35,
  },
  {
    account: '5.01.01.13',
    value: 6107.19,
  },
  {
    account: '5.02.01.17',
    value: 6,
  },
  {
    account: '5.02.01.17',
    value: 5,
  },
  {
    account: '5.02.01.17',
    value: 3,
  },
  {
    account: '5.02.01.17',
    value: 20,
  },
  {
    account: '5.02.01.17',
    value: 10,
  },
  {
    account: '5.02.01.17',
    value: 10,
  },
  {
    account: '5.02.01.17',
    value: 3,
  },
  {
    account: '5.02.02.01',
    value: 460,
  },
  {
    account: '5.02.02.04',
    value: 15,
  },
  {
    account: '5.02.02.04',
    value: 20,
  },
];

export const flattedTotals = [
  {
    account: '1.01.01.03.01',
    value: 4328.27,
  },
  {
    account: '1.01.02.05.02.01',
    value: 0,
  },
  {
    account: '1.01.02.05.02.19',
    value: 0,
  },
  {
    account: '1.01.05.01',
    value: 425.27,
  },
  {
    account: '2.01.04.01.01',
    value: 151.88,
  },
  {
    account: '2.01.07.01',
    value: 1842.71,
  },
  {
    account: '2.02.06',
    value: 0,
  },
  {
    account: '4.01.02',
    value: 12284.75,
  },
  {
    account: '5.01.01.02',
    value: 2344.27,
  },
  {
    account: '5.01.01.13',
    value: 6629.54,
  },
  {
    account: '5.02.01.17',
    value: 57,
  },
  {
    account: '5.02.02.01',
    value: 460,
  },
  {
    account: '5.02.02.04',
    value: 35,
  },
];

export const balanceDictResult = {
  '1': 4753.54,
  '1.01': 4753.54,
  '1.01.01': 4328.27,
  '1.01.01.03': 4328.27,
  '1.01.01.03.01': 4328.27,
  '1.01.05': 425.27,
  '1.01.05.01': 425.27,
  '2': 1994.59,
  '2.01': 1994.59,
  '2.01.04': 151.88,
  '2.01.04.01': 151.88,
  '2.01.04.01.01': 151.88,
  '2.01.07': 1842.71,
  '2.01.07.01': 1842.71,
  '4': 12284.75,
  '4.01': 12284.75,
  '4.01.02': 12284.75,
  '5': 9525.81,
  '5.01': 8973.81,
  '5.01.01': 8973.81,
  '5.01.01.02': 2344.27,
  '5.01.01.13': 6629.54,
  '5.02': 552,
  '5.02.01': 57,
  '5.02.01.17': 57,
  '5.02.02': 495,
  '5.02.02.01': 460,
  '5.02.02.04': 35,
};
