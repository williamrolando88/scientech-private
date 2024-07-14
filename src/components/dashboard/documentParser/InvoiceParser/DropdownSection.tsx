import { Card, CardContent } from '@mui/material';
import { FC, useCallback } from 'react';
import { Upload } from 'src/components/shared/upload';

interface DropdownSectionProps {
  files: (File | string)[];
  setFiles: (files: (File | string)[]) => void;
  handleUpload: VoidFunction;
  uploadButtonText?: string;
}

export const DropdownSection: FC<DropdownSectionProps> = ({
  files,
  setFiles,
  handleUpload,
  uploadButtonText,
}) => {
  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files, setFiles]
  );

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Card>
      <CardContent>
        <Upload
          multiple
          files={files}
          accept={{ 'text/xml': [] }}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
          onUpload={handleUpload}
          uploadButtonText={uploadButtonText}
        />
      </CardContent>
    </Card>
  );
};
