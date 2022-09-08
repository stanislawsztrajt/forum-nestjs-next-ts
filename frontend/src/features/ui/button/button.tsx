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
    <button onClick={action} className={`${bg ? 'button-bg' : 'button'} ${className}`}>
      {href ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};

export default Button;
