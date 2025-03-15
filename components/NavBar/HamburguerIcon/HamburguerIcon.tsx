import { cn } from "@/utils/cn";

interface HamburguerIconProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const HamburguerIcon = ({ isMenuOpen, setIsMenuOpen }: HamburguerIconProps) => {
  return (
    <svg
      className={cn(
        'cursor-pointer select-none transition-transform duration-400 [tap-highlight-color:transparent]',
        'rotate-0 active:rotate-45 transition-transform duration-400 scale-90 -mr-5',
        isMenuOpen && 'rotate-45'
      )}
      viewBox='0 0 100 100'
      width='80'
      onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <path
        className={cn(
          'fill-none stroke-white stroke-[4.0] stroke-round',
          'transition-[stroke-dasharray,stroke-dashoffset] duration-400',
          '[stroke-dasharray:40_139]',
          isMenuOpen && '[stroke-dashoffset:-98px]'
        )}
        d='m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40'
      />
      <path
        className='fill-none stroke-white stroke-[4.0] stroke-round transition-[stroke-dasharray,stroke-dashoffset] duration-400'
        d='m 30,50 h 40'
      />
      <path
        className={cn(
          'fill-none stroke-white stroke-[4.0] stroke-round',
          'transition-[stroke-dasharray,stroke-dashoffset] duration-400',
          '[stroke-dasharray:40_180]',
          isMenuOpen && '[stroke-dashoffset:-138px]'
        )}
        d='m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40'
      />
    </svg>
  );
};

export default HamburguerIcon;