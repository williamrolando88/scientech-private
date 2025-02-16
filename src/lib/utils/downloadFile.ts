enum FileType {
  TEXT = 'text/plain',
  JSON = 'application/json',
  CSV = 'text/csv',
  HTML = 'text/html',
  XML = 'application/xml',
}

const getFileTypeFromExtension = (fileName: string): FileType => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'json':
      return FileType.JSON;
    case 'csv':
      return FileType.CSV;
    case 'html':
      return FileType.HTML;
    case 'xml':
      return FileType.XML;
    default:
      return FileType.TEXT;
  }
};

export const downloadFile = async (fileContent: string, fileName: string) => {
  const fileType = getFileTypeFromExtension(fileName);

  // Create a new Blob with the file content and type
  const blob = new Blob([fileContent], { type: fileType });

  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;

  // Append the anchor to the document, trigger the download, and remove it
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke the object URL to free up memory
  window.URL.revokeObjectURL(url);
};

// Example usage:
// downloadFile('Hello, world!', 'example.txt');
