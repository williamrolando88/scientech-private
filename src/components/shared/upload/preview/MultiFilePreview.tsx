import { IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AnimatePresence, m } from 'framer-motion';
import { FC } from 'react';
import { fData } from '../../../../lib/utils/formatNumber';
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
import Iconify from '../../iconify';
import { UploadProps } from '../types';

type MultiFilePreviewProps = Pick<
  UploadProps,
  'thumbnail' | 'files' | 'onRemove' | 'sx'
>;

export default function MultiFilePreview({
  files,
  ...props
}: MultiFilePreviewProps) {
  if (!files?.length) {
    return null;
  }

  return (
    <AnimatePresence initial={false}>
      {files.map((file) => (
        <ElementRenderer key={fileData(file).key} file={file} {...props} />
      ))}
    </AnimatePresence>
  );
}

interface ElementRendererProps extends Omit<MultiFilePreviewProps, 'files'> {
  file: string | File;
}

const ElementRenderer: FC<ElementRendererProps> = ({
  file,
  onRemove,
  sx,
  thumbnail,
}) => {
  const { name = '', size = 0 } = fileData(file);

  if (thumbnail) {
    return <ThumbnailElement file={file} sx={sx} onRemove={onRemove} />;
  }

  return (
    <RowElement
      file={file}
      name={name}
      size={size}
      onRemove={onRemove}
      sx={sx}
    />
  );
};

const ThumbnailElement: FC<Omit<ElementRendererProps, 'thumbnail'>> = ({
  file,
  sx,
  onRemove,
}) => (
  <Stack
    component={m.div}
    {...varFade().inUp}
    alignItems="center"
    display="inline-flex"
    justifyContent="center"
    sx={{
      m: 0.5,
      width: 80,
      height: 80,
      borderRadius: 1.25,
      overflow: 'hidden',
      position: 'relative',
      border: (theme) => `solid 1px ${theme.palette.divider}`,
      ...sx,
    }}
  >
    <FileThumbnail
      tooltip
      imageView
      file={file}
      sx={{ position: 'absolute' }}
      imgSx={{ position: 'absolute' }}
    />

    {onRemove && (
      <IconButton
        size="small"
        onClick={() => onRemove(file)}
        sx={{
          top: 4,
          right: 4,
          p: '1px',
          position: 'absolute',
          color: (theme) => alpha(theme.palette.common.white, 0.72),
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          },
        }}
      >
        <Iconify icon="eva:close-fill" width={16} />
      </IconButton>
    )}
  </Stack>
);

interface RowElementProps extends Omit<ElementRendererProps, 'thumbnail'> {
  size: number;
  name: string;
}

const RowElement: FC<RowElementProps> = ({
  file,
  name,
  size,
  onRemove,
  sx,
}) => {
  const isNotFormatFile = typeof file === 'string';

  return (
    <Stack
      component={m.div}
      {...varFade().inUp}
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        my: 1,
        px: 1,
        py: 0.75,
        borderRadius: 0.75,
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <FileThumbnail file={file} />

      <Stack flexGrow={1} sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {isNotFormatFile ? file : name}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {isNotFormatFile ? '' : fData(size)}
        </Typography>
      </Stack>

      {onRemove && (
        <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      )}
    </Stack>
  );
};
