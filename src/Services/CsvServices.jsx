import { ExportToCsv } from 'export-to-csv';

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: false,
  title: '',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: '',
};

export const downloadCSV = (fileName, data) => {
  options.filename = fileName;
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(data);
};
