import { useEffect } from 'react';

interface UseClickOutsideProps {
  ref: React.RefObject<HTMLElement | null>;
  callback: (e?: MouseEvent) => void;
}

export const useClickOutside = ({ ref, callback }: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
