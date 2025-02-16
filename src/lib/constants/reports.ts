import { ReportForm } from '@src/types/reports';

export const REPORT_FORM_INITIAL_VALUE: ReportForm = {
  collection: 'sale',
  searchKey: '',
  startAt: new Date(),
  endAt: new Date(),
};
