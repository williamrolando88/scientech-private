export const singleFileReader = async (file: string | File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content && typeof content === 'string') {
        resolve(content);
      }
    };

    reader.readAsText(file as File);
  });

export async function xmlFileReader<T>(
  files: (string | File)[],
  parser: Function
): Promise<Array<T>> {
  const documentParsedData: T[] = [];

  await Promise.all(
    files.map(async (file) => {
      const readedFile = await singleFileReader(file);
      const parsedFactura = parser(readedFile);

      if (parsedFactura) {
        documentParsedData.push(parsedFactura);
      }
    })
  );

  return documentParsedData;
}
