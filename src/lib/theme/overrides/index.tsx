import {
  AlertProps,
  ButtonGroupProps,
  ButtonProps,
  CheckboxProps,
  ChipProps,
  DrawerProps,
  FabProps,
  LinearProgressProps,
  PaginationProps,
  RadioProps,
  SwitchProps,
  TabProps,
  ToggleButtonProps,
} from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CheckboxIndeterminateIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  InputSelectIcon,
  RadioCheckedIcon,
  RadioIcon,
  StarIcon,
  SuccessIcon,
  TreeViewCollapseIcon,
  TreeViewEndIcon,
  TreeViewExpandIcon,
  WarningIcon,
} from './CustomIcons';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-expanded': {
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}

const ALERT_COLORS = ['info', 'success', 'warning', 'error'] as const;

function Alert(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: AlertProps) => {
    const standardVariant = ownerState.variant === 'standard';

    const filledVariant = ownerState.variant === 'filled';

    const outlinedVariant = ownerState.variant === 'outlined';

    const colorStyle = ALERT_COLORS.map((color) => ({
      ...(ownerState.severity === color && {
        ...(standardVariant && {
          color: theme.palette[color][isLight ? 'darker' : 'lighter'],
          backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
          '& .MuiAlert-icon': {
            color: theme.palette[color][isLight ? 'main' : 'light'],
          },
        }),
        ...(filledVariant && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
        }),
        ...(outlinedVariant && {
          color: theme.palette[color][isLight ? 'dark' : 'light'],
          border: `solid 1px ${theme.palette[color].main}`,
          '& .MuiAlert-icon': {
            color: theme.palette[color].main,
          },
        }),
      }),
    }));

    return [...colorStyle];
  };

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        },
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: AlertProps }) => rootStyle(ownerState),
        icon: {
          opacity: 1,
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(0.5),
        },
      },
    },
  };
}

function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& span.MuiAutocomplete-tag': {
            ...theme.typography.body2,
            width: 24,
            height: 24,
            lineHeight: '24px',
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
        },
        paper: {
          boxShadow: theme.customShadows.dropdown,
        },
        listbox: {
          padding: theme.spacing(0, 1),
        },
        option: {
          ...theme.typography.body2,
          padding: theme.spacing(1),
          margin: theme.spacing(0.75, 0),
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  };
}

function Avatar(theme: Theme) {
  return {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.grey[500], 0.24),
        },
      },
    },
    MuiAvatarGroup: {
      defaultProps: {
        max: 4,
      },
      styleOverrides: {
        root: {
          justifyContent: 'flex-end',
        },
        avatar: {
          fontSize: 16,
          fontWeight: theme.typography.fontWeightMedium,
          '&:first-of-type': {
            fontSize: 12,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.lighter,
          },
        },
      },
    },
  };
}

function Backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}

function Badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 10,
          height: 10,
          borderRadius: '50%',
        },
      },
    },
  };
}

function Breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
        li: {
          display: 'inline-flex',
          margin: theme.spacing(0.25, 0),
          '& > *': {
            ...theme.typography.body2,
          },
        },
      },
    },
  };
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

function Button(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: ButtonProps) => {
    const inheritColor = ownerState.color === 'inherit';

    const containedVariant = ownerState.variant === 'contained';

    const outlinedVariant = ownerState.variant === 'outlined';

    const textVariant = ownerState.variant === 'text';

    const softVariant = ownerState.variant === 'soft';

    const smallSize = ownerState.size === 'small';

    const largeSize = ownerState.size === 'large';

    const defaultStyle = {
      ...(inheritColor && {
        ...(containedVariant && {
          color: theme.palette.grey[800],
          '&:hover': {
            boxShadow: theme.customShadows.z8,
            backgroundColor: theme.palette.grey[400],
          },
        }),
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          '&:hover': {
            borderColor: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
          },
        }),
        ...(textVariant && {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.24),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        ...(containedVariant && {
          '&:hover': {
            boxShadow: theme.customShadows[color],
          },
        }),
        ...(softVariant && {
          color: theme.palette[color][isLight ? 'dark' : 'light'],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      '&.Mui-disabled': {
        ...(softVariant && {
          backgroundColor: theme.palette.action.disabledBackground,
        }),
      },
    };

    const size = {
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        ...(softVariant && {
          padding: '4px 10px',
        }),
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        ...(softVariant && {
          padding: '8px 22px',
        }),
      }),
    };

    return [...colorStyle, defaultStyle, disabledState, size];
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => rootStyle(ownerState),
      },
    },
  };
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    soft: true;
  }
}

function ButtonGroup(theme: Theme) {
  const rootStyle = (ownerState: ButtonGroupProps) => {
    const inheritColor = ownerState.color === 'inherit';

    const containedVariant = ownerState.variant === 'contained';

    const outlinedVariant = ownerState.variant === 'outlined';

    const textVariant = ownerState.variant === 'text';

    const softVariant = ownerState.variant === 'soft';

    const horizontalOrientation = ownerState.orientation === 'horizontal';

    const verticalOrientation = ownerState.orientation === 'vertical';

    const defaultStyle = {
      '& .MuiButtonGroup-grouped': {
        '&:not(:last-of-type)': {
          ...(!outlinedVariant && {
            borderStyle: 'solid',
            ...(inheritColor && {
              borderColor: alpha(theme.palette.grey[500], 0.32),
            }),
            ...(horizontalOrientation && {
              borderWidth: '0px 1px 0px 0px',
            }),
            ...(verticalOrientation && {
              borderWidth: '0px 0px 1px 0px',
            }),
          }),
        },
      },
    };

    const colorStyle = COLORS.map((color) => ({
      '& .MuiButtonGroup-grouped': {
        '&:not(:last-of-type)': {
          ...(!outlinedVariant && {
            ...(ownerState.color === color && {
              ...(containedVariant && {
                borderColor: alpha(theme.palette[color].dark, 0.48),
              }),
              ...(textVariant && {
                borderColor: alpha(theme.palette[color].main, 0.48),
              }),
              ...(softVariant && {
                borderColor: alpha(theme.palette[color].dark, 0.24),
              }),
            }),
          }),
        },
      },
    }));

    const disabledState = {
      '& .MuiButtonGroup-grouped.Mui-disabled': {
        '&:not(:last-of-type)': {
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    };

    return [...colorStyle, defaultStyle, disabledState];
  };

  return {
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonGroupProps }) => rootStyle(ownerState),
      },
    },
  };
}

function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2', marginTop: theme.spacing(0.5) },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}

function Checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        indeterminateIcon: <CheckboxIndeterminateIcon />,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: CheckboxProps }) => ({
          padding: theme.spacing(1),
          ...(ownerState.size === 'small' && {
            '& svg': { width: 20, height: 20 },
          }),
          ...(ownerState.size === 'medium' && {
            '& svg': { width: 24, height: 24 },
          }),
        }),
      },
    },
  };
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

function Chip(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: ChipProps) => {
    const defaultColor = ownerState.color === 'default';

    const filledVariant = ownerState.variant === 'filled';

    const outlinedVariant = ownerState.variant === 'outlined';

    const softVariant = ownerState.variant === 'soft';

    const defaultStyle = {
      ...(defaultColor && {
        '& .MuiChip-avatar': {
          color: theme.palette.text[isLight ? 'secondary' : 'primary'],
          backgroundColor: alpha(theme.palette.grey[500], 0.48),
        },
        ...(outlinedVariant && {
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }),
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.32),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        '& .MuiChip-avatar': {
          color: theme.palette[color].lighter,
          backgroundColor: theme.palette[color].dark,
        },
        ...(filledVariant && {
          '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette[color].contrastText, 0.56),
            '&:hover': {
              color: theme.palette[color].contrastText,
            },
          },
        }),
        ...(softVariant && {
          color: theme.palette[color][isLight ? 'dark' : 'light'],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
          '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette[color][isLight ? 'dark' : 'light'], 0.48),
            '&:hover': {
              color: theme.palette[color].dark,
            },
          },
        }),
      }),
    }));

    return [...colorStyle, defaultStyle];
  };

  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseIcon />,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: ChipProps }) => rootStyle(ownerState),
      },
    },
  };
}

function ControlLabel(theme: Theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        component: 'div',
      },
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled,
        },
      },
    },
  };
}

function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid transparent`,
          '& .MuiTablePagination-root': {
            borderTop: 0,
          },
        },
        cell: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        columnSeparator: {
          color: theme.palette.divider,
        },
        toolbarContainer: {
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.neutral,
          '& .MuiButton-root': {
            marginRight: theme.spacing(1.5),
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
        paper: {
          boxShadow: theme.customShadows.dropdown,
        },
        menu: {
          '& .MuiPaper-root': {
            boxShadow: theme.customShadows.dropdown,
          },
          '& .MuiMenuItem-root': {
            ...theme.typography.body2,
            '& .MuiListItemIcon-root': {
              minWidth: 'auto',
            },
          },
        },
        panelFooter: {
          padding: theme.spacing(2),
          justifyContent: 'flex-end',
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiButton-root': {
            '&:first-of-type': {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&:last-of-type': {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
        },
        filterForm: {
          padding: theme.spacing(1.5, 0),
          '& .MuiFormControl-root': {
            margin: theme.spacing(0, 0.5),
          },
          '& .MuiInput-root': {
            marginTop: theme.spacing(3),
            '&::before, &::after': {
              display: 'none',
            },
            '& .MuiNativeSelect-select, .MuiInput-input': {
              ...theme.typography.body2,
              padding: theme.spacing(0.75, 1),
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.neutral,
            },
            '& .MuiSvgIcon-root': {
              right: 4,
            },
          },
        },
      },
    },
  };
}

function Dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dialog,
          '&.MuiPaper-rounded': {
            borderRadius: Number(theme.shape.borderRadius) * 2,
          },
          '&.MuiDialog-paperFullScreen': {
            borderRadius: 0,
          },
          '&.MuiDialog-paper .MuiDialogActions-root': {
            padding: theme.spacing(3),
          },
          '@media (max-width: 600px)': {
            margin: theme.spacing(2),
          },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%',
            },
          },
        },
        paperFullWidth: {
          width: '100%',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 3),
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(3),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.5),
          },
        },
      },
    },
  };
}

function Drawer(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiDrawer: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: DrawerProps }) => ({
          ...(ownerState.variant === 'temporary' && {
            '& .MuiDrawer-paper': {
              boxShadow: `-40px 40px 80px -8px ${alpha(
                isLight ? theme.palette.grey[500] : theme.palette.common.black,
                0.24
              )}`,
            },
          }),
        }),
      },
    },
  };
}

declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    outlined: true;
    outlinedExtended: true;
    soft: true;
    softExtended: true;
  }
}

function Fab(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: FabProps) => {
    const defaultColor = ownerState.color === 'default';

    const inheritColor = ownerState.color === 'inherit';

    const circularVariant = ownerState.variant === 'circular';

    const extendedVariant = ownerState.variant === 'extended';

    const outlinedVariant = ownerState.variant === 'outlined';

    const outlinedExtendedVariant = ownerState.variant === 'outlinedExtended';

    const softVariant = ownerState.variant === 'soft';

    const softExtendedVariant = ownerState.variant === 'softExtended';

    const defaultStyle = {
      '&:hover, &:active': {
        boxShadow: 'none',
      },
      ...((circularVariant || extendedVariant) && {
        ...((defaultColor || inheritColor) && {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        }),
        ...(inheritColor && {
          ...(!isLight && {
            color: 'inherit',
            backgroundColor: theme.palette.grey[800],
            '&:hover': {
              backgroundColor: theme.palette.grey[700],
            },
          }),
        }),
      }),

      ...((outlinedVariant || outlinedExtendedVariant) && {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        ...((defaultColor || inheritColor) && {
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        ...(defaultColor && {
          ...(!isLight && {
            color: theme.palette.text.secondary,
          }),
        }),
      }),

      ...((softVariant || softExtendedVariant) && {
        boxShadow: 'none',
        ...(defaultColor && {
          color: theme.palette.grey[800],
          backgroundColor: theme.palette.grey[300],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        }),
        ...(inheritColor && {
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.24),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        ...((circularVariant || extendedVariant) && {
          boxShadow: theme.customShadows[color],
          '&:hover': {
            backgroundColor: theme.palette[color].dark,
          },
        }),
        ...((outlinedVariant || outlinedExtendedVariant) && {
          color: theme.palette[color].main,
          border: `solid 1px ${alpha(theme.palette[color].main, 0.48)}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.08),
            border: `solid 1px ${theme.palette[color].main}`,
          },
        }),
        ...((softVariant || softExtendedVariant) && {
          color: theme.palette[color][isLight ? 'dark' : 'light'],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      '&.Mui-disabled': {
        ...((outlinedVariant || outlinedExtendedVariant) && {
          backgroundColor: 'transparent',
          border: `solid 1px ${theme.palette.action.disabledBackground}`,
        }),
      },
    };

    const size = {
      ...((extendedVariant || outlinedExtendedVariant || softExtendedVariant) && {
        width: 'auto',
        '& svg': {
          marginRight: theme.spacing(1),
        },
        ...(ownerState.size === 'small' && {
          height: 34,
          minHeight: 34,
          borderRadius: 17,
          padding: theme.spacing(0, 1),
        }),
        ...(ownerState.size === 'medium' && {
          height: 40,
          minHeight: 40,
          borderRadius: 20,
          padding: theme.spacing(0, 2),
        }),
        ...(ownerState.size === 'large' && {
          height: 48,
          minHeight: 48,
          borderRadius: 24,
          padding: theme.spacing(0, 2),
        }),
      }),
    };

    return [...colorStyle, defaultStyle, disabledState, size];
  };

  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: FabProps }) => rootStyle(ownerState),
      },
    },
  };
}

function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled,
            },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
          '&:after': {
            borderBottomColor: theme.palette.text.primary,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before, :after': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.text.primary,
            },
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}

function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  };
}

function Lists(theme: Theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}

function Menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
  };
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    soft: true;
  }

  interface PaginationPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

function Pagination(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: PaginationProps) => {
    const outlinedVariant = ownerState.variant === 'outlined';

    const softVariant = ownerState.variant === 'soft';

    const defaultStyle = {
      '& .MuiPaginationItem-root': {
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.32),
        }),
        '&.Mui-selected': {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        ...(softVariant && {
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              color: theme.palette[color][isLight ? 'dark' : 'light'],
              backgroundColor: alpha(theme.palette[color].main, 0.16),
              '&:hover': {
                backgroundColor: alpha(theme.palette[color].main, 0.32),
              },
            },
          },
        }),
      }),
    }));

    return [...colorStyle, defaultStyle];
  };

  return {
    MuiPagination: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: PaginationProps }) => rootStyle(ownerState),
      },
    },
  };
}

function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}

function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}

function Progress(theme: Theme) {
  const rootStyle = (ownerState: LinearProgressProps) => {
    const bufferVariant = ownerState.variant === 'buffer';

    const defaultStyle = {
      borderRadius: 4,
      '& .MuiLinearProgress-bar': {
        borderRadius: 4,
      },
      ...(bufferVariant && {
        backgroundColor: 'transparent',
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        backgroundColor: alpha(theme.palette[color].main, 0.24),
      }),
    }));

    return [...colorStyle, defaultStyle];
  };

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LinearProgressProps }) => rootStyle(ownerState),
      },
    },
  };
}

function Radio(theme: Theme) {
  return {
    MuiRadio: {
      defaultProps: {
        icon: <RadioIcon />,
        checkedIcon: <RadioCheckedIcon />,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: RadioProps }) => ({
          padding: theme.spacing(1),
          ...(ownerState.size === 'small' && {
            '& svg': { width: 20, height: 20 },
          }),
          ...(ownerState.size === 'medium' && {
            '& svg': { width: 24, height: 24 },
          }),
        }),
      },
    },
  };
}

function Rating(theme: Theme) {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: <StarIcon />,
        icon: <StarIcon />,
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.48,
          },
        },
        iconEmpty: {
          color: alpha(theme.palette.grey[500], 0.48),
        },
        sizeSmall: {
          '& svg': {
            width: 20,
            height: 20,
          },
        },
        sizeLarge: {
          '& svg': {
            width: 28,
            height: 28,
          },
        },
      },
    },
  };
}

function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}

function Skeleton(theme: Theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}

function Slider(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiSlider: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.action.disabled,
          },
        },
        rail: {
          opacity: 0.32,
        },
        markLabel: {
          fontSize: 13,
          color: theme.palette.text.disabled,
        },
        valueLabel: {
          borderRadius: 8,
          backgroundColor: theme.palette.grey[isLight ? 800 : 700],
        },
      },
    },
  };
}

function Stepper(theme: Theme) {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}

function SvgIcon(theme: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          width: 32,
          height: 32,
          fontSize: 'inherit',
        },
      },
    },
  };
}

function Switch(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: SwitchProps) => ({
    padding: '9px 13px 9px 12px',
    width: 58,
    height: 38,
    ...(ownerState.size === 'small' && {
      padding: '4px 8px 4px 7px',
      width: 40,
      height: 24,
    }),
    '& .MuiSwitch-thumb': {
      width: 14,
      height: 14,
      boxShadow: 'none',
      color: `${theme.palette.common.white} !important`,
      ...(ownerState.size === 'small' && {
        width: 10,
        height: 10,
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      borderRadius: 14,
      backgroundColor: alpha(theme.palette.grey[500], 0.48),
    },
    '& .MuiSwitch-switchBase': {
      left: 3,
      padding: 12,
      ...(ownerState.size === 'small' && {
        padding: 7,
      }),
      '&.Mui-checked': {
        transform: 'translateX(13px)',
        '&+.MuiSwitch-track': { opacity: 1 },
        ...(ownerState.size === 'small' && {
          transform: 'translateX(9px)',
        }),
      },
      '&.Mui-disabled': {
        '& .MuiSwitch-thumb': { opacity: isLight ? 1 : 0.48 },
        '&+.MuiSwitch-track': { opacity: 0.48 },
      },
    },
  });

  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) => rootStyle(ownerState),
      },
    },
  };
}

function Table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small',
        },
        nextIconButtonProps: {
          size: 'small',
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}

function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      defaultProps: {
        textColor: 'inherit',
        allowScrollButtonsMobile: true,
        variant: 'scrollable',
      },
      styleOverrides: {
        scrollButtons: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: 'start',
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TabProps }) => ({
          padding: 0,
          opacity: 1,
          minWidth: 48,
          fontWeight: theme.typography.fontWeightMedium,
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(5),
            },
          },
          '&:not(.Mui-selected)': {
            color: theme.palette.text.secondary,
          },
          ...((ownerState.iconPosition === 'start' || ownerState.iconPosition === 'end') && {
            minHeight: 48,
          }),
        }),
      },
    },
  };
}

function Timeline(theme: Theme) {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider,
        },
      },
    },
  };
}

function ToggleButton(theme: Theme) {
  const rootStyle = (ownerState: ToggleButtonProps) => {
    const standardColor = ownerState.color === 'standard';

    const defaultStyle = {
      ...(standardColor && {
        '&.Mui-selected': {
          borderColor: 'inherit',
        },
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        '&:hover': {
          borderColor: alpha(theme.palette[color].main, 0.48),
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
        },
        '&.Mui-selected': {
          borderColor: theme.palette[color].main,
        },
      }),
    }));

    const disabledState = {
      '&.Mui-disabled': {
        '&.Mui-selected': {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected,
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    };

    return [...colorStyle, defaultStyle, disabledState];
  };

  return {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ToggleButtonProps }) => rootStyle(ownerState),
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        },
        grouped: {
          margin: 4,
          borderColor: 'transparent !important',
          borderRadius: `${theme.shape.borderRadius}px !important`,
        },
      },
    },
  };
}

function Tooltip(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700],
        },
      },
    },
  };
}

function TreeView(theme: Theme) {
  return {
    MuiTreeView: {
      defaultProps: {
        defaultCollapseIcon: <TreeViewCollapseIcon sx={{ width: 20, height: 20 }} />,
        defaultExpandIcon: <TreeViewExpandIcon sx={{ width: 20, height: 20 }} />,
        defaultEndIcon: <TreeViewEndIcon sx={{ color: 'text.secondary', width: 20, height: 20 }} />,
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
        iconContainer: {
          width: 'auto',
        },
      },
    },
  };
}

function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}

function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      variants: [
        {
          props: { loading: true, loadingPosition: 'start', size: 'small' },
          style: {
            '& .MuiLoadingButton-loadingIndicatorStart': {
              left: 10,
            },
          },
        },
        {
          props: { loading: true, loadingPosition: 'end', size: 'small' },
          style: {
            '& .MuiLoadingButton-loadingIndicatorEnd': {
              right: 10,
            },
          },
        },
      ],

      styleOverrides: {
        loadingIndicatorStart: {
          left: 14,
        },
        loadingIndicatorEnd: {
          right: 14,
        },
      },
    },
  };
}

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Fab(theme),
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Menu(theme),
    Link(theme),
    Input(theme),
    Radio(theme),
    Badge(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Select(theme),
    Button(theme),
    Rating(theme),
    Dialog(theme),
    Avatar(theme),
    Slider(theme),
    Drawer(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    DataGrid(theme),
    Skeleton(theme),
    Timeline(theme),
    TreeView(theme),
    Backdrop(theme),
    Progress(theme),
    Accordion(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    Breadcrumbs(theme),
    Autocomplete(theme),
    ControlLabel(theme),
    ToggleButton(theme),
    LoadingButton(theme)
  );
}
