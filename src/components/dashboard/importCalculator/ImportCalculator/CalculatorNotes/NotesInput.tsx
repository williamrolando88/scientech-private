import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

function NotesInput() {
  const { addNote } = useImportCalculatorContext();
  const inputRef = useRef<HTMLInputElement>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputRef.current) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (inputRef.current.value) {
        addNote(inputRef.current.value);
        inputRef.current.value = '';
        inputRef.current.blur();
      }
    }

    if (e.key === 'Escape') {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      onKeyDown={handleKeyDown}
      helperText="Presiona ENTER para agregar, DOBLE CLICK para editar, presiona ESC para cancelar"
    />
  );
}

export default NotesInput;
