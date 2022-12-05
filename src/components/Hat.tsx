import styles from '../style/colors.module.scss';

/* eslint-disable max-len */
export default function Hat({className, fill}: {className?: string, fill?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 687.71344" fill={fill} className={className}>
      <path fill="#eb191a" stroke="maroon" strokeWidth="11.5926104" d="M249.091366 214.436573c-8.004503-42.664803-.869816-79.987536 45.773651-103.362602 108.92733 2.449285 314.967503 9.194444 395.60724 75.027146C829.292608 313.15498 893.843294 420.1463 938.635193 541.649154l-739.931207-66.199771c26.64114-56.207053 66.179382-102.910323 111.683886-145.221492-7.811608-8.637603-9.732706-20.39835-8.690434-33.731626-11.946963-39.798245-36.95632-54.344623-52.602702-82.087073z" />
      <path fill="#fffdff" stroke="maroon" strokeWidth="11.5926104" d="M140.3747 482.154335c285.005595-75.82581 563.231817-94.275056 819.897165 69.833188 27.36329 37.087952 45.995466 80.260524 54.731958 121.303345-194.881024-152.852071-771.013513-101.378175-911.708775.794616-17.84843-54.674489-9.154771-119.665588 37.063493-191.927718z" />
      <path d="m301.70184 107.50992-.310706 3.769417c-2.09542-.04819-4.494218-.14378-6.521238-.189366-46.642213 23.375392-53.74916 60.650165-45.744622 103.317923 11.479704 20.353032 18.789153 11.647205 31.492283 32.97891 37.634244-6.510453 73.888976-33.12345 80.784831-73.66695 99.546047 16.90012 203.531624 26.075881 241.76054 57.642236 45.946 37.939149 59.454326 94.34693 60.755073 209.39905l269.994825 92.942406C885.059326 386.27973 787.952988 280.20109 687.534984 176.97655c-106.521591-57.149502-246.086597-63.449182-385.832906-69.458532z" opacity=".16872" />
      <path fill="#fffdff" stroke="maroon" strokeWidth="11.5926104" d="M295.645482 114.010268c16.11887 75.9173-29.806272 145.495154-112.051195 162.957514C101.3522 294.429541 23.779731 236.10799 7.660861 160.19069-5.11373 100.024407 50.529012 26.887107 132.773935 9.424746 215.016023-8.037012 279.523777 38.09357 295.642647 114.01087z" />
      <path d="M201.98832 10.17094c16.963674 16.531963 29.063984 38.771161 34.6432 65.048373 14.400382 67.8235-26.620473 129.996065-100.096876 145.59668-47.020588 9.98348-92.351003-7.753263-122.657777-39.599978 24.655514 65.257993 95.284935 111.519826 169.756407 95.707936 82.242088-17.461758 128.17754-87.032912 112.05867-162.950212-11.219826-52.84359-45.92864-91.222102-93.702172-103.800144zM601.400637 429.924737c125.431222 21.96341 251.03468 43.398434 357.732983 123.818429l56.520042 118.189071c-154.4887-78.29029-318.144021-93.2282-483.847598-94.049207 65.858657-28.07793 110.245022-116.192057 69.594573-147.958293z" opacity=".16872" />
    </svg>

  );
}

Hat.defaultProps = {
  className: 'w-6 h-6',
  fill: 'currentColor',
};