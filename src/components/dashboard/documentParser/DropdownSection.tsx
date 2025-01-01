import { Card, CardContent } from '@mui/material';
import { Upload, UploadProps } from '@src/components/shared/upload';
import { FC, useCallback } from 'react';

interface DropdownSectionProps
  extends Omit<UploadProps, 'onDrop' | 'onRemove' | 'onRemoveAll'> {
  files: (File | string)[];
  setFiles: (files: (File | string)[]) => void;
}

export const DropdownSection: FC<DropdownSectionProps> = ({
  files,
  setFiles,
  uploadButtonText,
  ...props
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
          {...props}
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
        />
      </CardContent>
    </Card>
  );
};
