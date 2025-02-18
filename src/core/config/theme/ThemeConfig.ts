// src/core/config/theme/ThemeConfig.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
  };
  breakpoints: {
    small: number;
    medium: number;
    large: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#333333',
    error: '#FF3B30',
  },
  breakpoints: {
    small: 320,
    medium: 768,
    large: 1024,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#BF5AF2',
    background: '#000000',
    text: '#F5F5F5',
    error: '#FF453A',
  },
  breakpoints: {
    small: 320,
    medium: 768,
    large: 1024,
  },
};
