import { useTheme } from 'next-themes';
import type React from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const DEFAULT_TOAST_CLASSNAMES: NonNullable<
  ToasterProps['toastOptions']
>['classNames'] = {
  toast:
    'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
  description: 'group-[.toast]:text-muted-foreground',
  actionButton:
    'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
  cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
};

const Toast = ({ toastOptions, style, ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          ...style,
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...DEFAULT_TOAST_CLASSNAMES,
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export default Toast;
