import ReactSnowfall from 'react-snowfall';
import {useSettingsStore} from '../store/settings';

export default function Snowfall() {
  const snowfall = useSettingsStore((state) => state.useSnowfall);

  if (!snowfall) {
    return null;
  }

  return (
    <ReactSnowfall
      color="#f1f5f9"
      snowflakeCount={125}
      speed={[0.5, 1]}
      radius={[2, 5]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.7,
        filter: 'blur(1.2px)',
      }}
    />
  );
}
