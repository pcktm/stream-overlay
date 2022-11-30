import styles from '../style/colors.module.scss';

/* eslint-disable max-len */
export default function Scarf({className, fill}: {className?: string, fill?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 103" className={className} fill={fill}>
      <path fill="#ef9c81" stroke="maroon" strokeWidth="1.064796" d="m68 41 31-11c-4 6-7 12-10 21l-2 31 6 12-6-2 2 5-7-5v6l-6-3-1 6-3-5-3 5-2-7-2 5-1-2-1 1c2-8 2-18 2-30 0-11 1-19 3-27z" />
      <path fill="#ef9c81" stroke="maroon" strokeWidth="1.064796" d="M11 6c2 4 4 7 7 9 20 7 71 10 84-14 2 4 4 7 0 14l1 4c3 2 3 6 0 9C73 48 27 50 1 25c-1-3-1-6 1-6 1-1 3-1 5-4-2-6-1-9 4-9z" />
      <path fill="#ee1328" stroke="#b9020e" strokeWidth="1.064796" d="m88 13-13 5 3 10 1 11 15-5-3-5c-2-5-2-10-3-16zM20 16c-2 6 1 9 2 13v9l13 4c-1-3 1-5-1-11l-3-13-11-2zM60 20H46c5 6 5 17 3 23h14c0-8-1-16-3-23zM91 45c-7 2-17 2-24 0l-2 16c7 1 17 1 23-1l1-9 2-6zM87 72c-8 4-16 3-22 2v13c5 1 15-1 23-4l-1-1V72z" />
      <path d="m67 42 31-11-9 20-2 31 6 11-6-1 1 5-5-6-1 8-6-4-2 6-2-5-3 5 3-12c6 1 9-1 12-2 0-15 0-39 4-45-6 2-13 3-21 3z" opacity=".2" />
    </svg>
  );
}

Scarf.defaultProps = {
  className: 'w-6 h-6',
  fill: 'currentColor',
};
