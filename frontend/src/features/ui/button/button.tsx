import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  href?: string;
  className?: string;
  bg?: boolean;
  action?: () => void;
  text: string;
}

const Button: FC<Props> = ({ href, className, bg, action, text }) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <button onClick={action} className={`${bg ? 'button-bg' : 'button'} ${className}`}>
            {text}
          </button>
        </Link>
      ) : (
        <button type='submit' onClick={action} className={`${bg ? 'button-bg' : 'button'} ${className}`}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
