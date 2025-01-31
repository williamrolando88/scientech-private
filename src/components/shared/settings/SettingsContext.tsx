import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// utils
import localStorageAvailable from '../../../lib/utils/localStorageAvailable';
//
import { defaultUISettings } from '../../../settings/uiSettings';
import { defaultPreset, getPresets, presetsOption } from './presets';
import {
  SettingsContextProps,
  ThemeColorPresetsValue,
  ThemeContrastValue,
  ThemeDirectionValue,
  ThemeLayoutValue,
  ThemeModeValue,
  ThemeStretchValue,
} from './types';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultUISettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},
  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
  // Stretch
  onToggleStretch: () => {},
  // Reset
  onResetSetting: () => {},
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [themeMode, setThemeMode] = useState(defaultUISettings.themeMode);
  const [themeLayout, setThemeLayout] = useState(defaultUISettings.themeLayout);
  const [themeStretch, setThemeStretch] = useState(
    defaultUISettings.themeStretch
  );
  const [themeContrast, setThemeContrast] = useState(
    defaultUISettings.themeContrast
  );
  const [themeDirection, setThemeDirection] = useState(
    defaultUISettings.themeDirection
  );
  const [themeColorPresets, setThemeColorPresets] = useState(
    defaultUISettings.themeColorPresets
  );

  const storageAvailable = localStorageAvailable();

  useEffect(() => {
    if (storageAvailable) {
      const mode = getCookie('themeMode') || defaultUISettings.themeMode;
      const layout = getCookie('themeLayout') || defaultUISettings.themeLayout;
      const stretch =
        getCookie('themeStretch') || defaultUISettings.themeStretch;
      const contrast =
        getCookie('themeContrast') || defaultUISettings.themeContrast;
      const direction =
        getCookie('themeDirection') || defaultUISettings.themeDirection;
      const colorPresets =
        getCookie('themeColorPresets') || defaultUISettings.themeColorPresets;

      setThemeMode(mode as ThemeModeValue);
      setThemeLayout(layout as ThemeLayoutValue);
      setThemeStretch(stretch as ThemeStretchValue);
      setThemeContrast(contrast as ThemeContrastValue);
      setThemeDirection(direction as ThemeDirectionValue);
      setThemeColorPresets(colorPresets as ThemeColorPresetsValue);
    }
  }, [storageAvailable]);

  // Mode
  const onToggleMode = useCallback(() => {
    const value = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(value);
    setCookie('themeMode', value);
  }, [themeMode]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeModeValue;
      setThemeMode(value);
      setCookie('themeMode', value);
    },
    []
  );

  // Direction
  const onToggleDirection = useCallback(() => {
    const value = themeDirection === 'rtl' ? 'ltr' : 'rtl';
    setThemeDirection(value);
    setCookie('themeDirection', value);
  }, [themeDirection]);

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeDirectionValue;
      setThemeDirection(value);
      setCookie('themeDirection', value);
    },
    []
  );

  const onChangeDirectionByLang = useCallback((lang: string) => {
    const value = lang === 'ar' ? 'rtl' : 'ltr';
    setThemeDirection(value);
    setCookie('themeDirection', value);
  }, []);

  // Layout
  const onToggleLayout = useCallback(() => {
    const value = themeLayout === 'vertical' ? 'mini' : 'vertical';
    setThemeLayout(value);
    setCookie('themeLayout', value);
  }, [themeLayout]);

  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeLayoutValue;
      setThemeLayout(value);
      setCookie('themeLayout', value);
    },
    []
  );

  // Contrast
  const onToggleContrast = useCallback(() => {
    const value = themeContrast === 'default' ? 'bold' : 'default';
    setThemeContrast(value);
    setCookie('themeContrast', value);
  }, [themeContrast]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeContrastValue;
      setThemeContrast(value);
      setCookie('themeContrast', value);
    },
    []
  );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeColorPresetsValue;
      setThemeColorPresets(value);
      setCookie('themeColorPresets', value);
    },
    []
  );

  // Stretch
  const onToggleStretch = useCallback(() => {
    const value = !themeStretch;
    setThemeStretch(value);
    setCookie('themeStretch', JSON.stringify(value));
  }, [themeStretch]);

  // Reset
  const onResetSetting = useCallback(() => {
    setThemeMode(defaultUISettings.themeMode);
    setThemeLayout(defaultUISettings.themeLayout);
    setThemeStretch(defaultUISettings.themeStretch);
    setThemeContrast(defaultUISettings.themeContrast);
    setThemeDirection(defaultUISettings.themeDirection);
    setThemeColorPresets(defaultUISettings.themeColorPresets);
    removeCookie('themeMode');
    removeCookie('themeLayout');
    removeCookie('themeStretch');
    removeCookie('themeContrast');
    removeCookie('themeDirection');
    removeCookie('themeColorPresets');
  }, []);

  const memoizedValue = useMemo(
    () => ({
      // Mode
      themeMode,
      onToggleMode,
      onChangeMode,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      themeLayout,
      onToggleLayout,
      onChangeLayout,
      // Contrast
      themeContrast,
      onChangeContrast,
      onToggleContrast,
      // Stretch
      themeStretch,
      onToggleStretch,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(themeColorPresets),
      // Reset
      onResetSetting,
    }),
    [
      // Mode
      themeMode,
      onChangeMode,
      onToggleMode,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      onChangeContrast,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      themeLayout,
      onToggleLayout,
      onChangeLayout,
      // Contrast
      themeContrast,
      onToggleContrast,
      // Stretch
      themeStretch,
      onToggleStretch,
      // Reset
      onResetSetting,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

// ----------------------------------------------------------------------

function getCookie(name: string) {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.'
    );
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}
