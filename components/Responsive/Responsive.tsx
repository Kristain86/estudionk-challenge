import { cn } from '@/utils/cn';

interface ResponsiveProps {
  children: React.ReactNode;
  className?: string;
}

export const DesktopOnly = ({ children, className }: ResponsiveProps) => {
  return <div className={cn('hidden lg:block', className)}>{children}</div>;
};

export const MobileOnly = ({ children, className }: ResponsiveProps) => {
  return <div className={cn('block lg:hidden', className)}>{children}</div>;
};
