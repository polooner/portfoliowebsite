import { SVGProps } from 'react';

interface PaperLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const PaperLogo = ({ size = 39, className, ...props }: PaperLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M39 24H24V6H6V24H24V39H0V6H6V0H39V24Z"
        fill="currentColor"
      />
    </svg>
  );
};
