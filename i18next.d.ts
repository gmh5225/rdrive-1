declare module 'react-i18next' {
  // Define the type of the t function
  type DefaultResources = Record<string, string>;
  type DefaultTFunction = (key: string, options?: object) => string;
  
  // Extend the i18next TFunction to use the DefaultTFunction
  export interface TFunction extends DefaultTFunction {}
  
  // Extend the useTranslation hook to specify the translation namespace
  export function useTranslation<T = DefaultResources>(
    ns?: string | string[],
    options?: UseTranslationOptions<T>,
  ): UseTranslationResponse<T, DefaultTFunction>;
}
