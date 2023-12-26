import { ListItemIcon } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import Iconify from './iconify';

type Action = {
  label: string;
  onClick: VoidFunction;
  disabled?: boolean;
  icon?: string;
};

interface SplitButtonProps {
  action: Action;
  options: Action[];
}

export default function SplitButton({ action, options }: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleItemClick = (fn: Function) => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={action.onClick} startIcon={action.icon && <Iconify icon={action.icon} />}>
          {action.label}
        </Button>

        <Button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <Iconify icon="eva:arrow-down-fill" />
        </Button>
      </ButtonGroup>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        placement="bottom-end"
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{}}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option.label}
                      disabled={option.disabled}
                      onClick={() => handleItemClick(option.onClick)}
                    >
                      {option.icon && (
                        <ListItemIcon>
                          <Iconify icon={option.icon} />
                        </ListItemIcon>
                      )}

                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
