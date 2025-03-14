import Link from 'next/link';

interface TextButtonProps {
  text: string;
  callback?: () => void;
  href?: string;
  type?: 'button' | 'submit';
}

const Content = ({ text }: TextButtonProps) => {
  return (
    <div className='group'>
      <span className='text-primary-white text-[0.9375rem] font-bold uppercase group-hover:text-primary-green transition-all duration-300'>
        {text}
      </span>
      <span
        className='w-full h-[0.125rem] bg-primary-green block mt-[0.1875rem] 
        relative left-1/2 -translate-x-1/2 
        group-hover:w-[calc(100%+0.2rem)] 
        transition-all duration-300'
      />
    </div>
  );
};

const TextButton = ({ text, href, callback, type = 'button' }: TextButtonProps) => {
  if (href) {
    return (
      <Link href={href} className='w-fit inline-block'>
        <Content text={text} />
      </Link>
    );
  }

  return (
    <button onClick={callback} type={type} className='w-fit cursor-pointer'>
      <Content text={text} />
    </button>
  );
};

export default TextButton;
