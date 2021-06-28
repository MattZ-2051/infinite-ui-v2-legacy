import type { ToastSeverity } from './types';
import { styles } from '$util/styles';

const themes = {
  danger: 'linear-gradient(89.89deg, #FB5543 0%, #F24C66 100%), #FC5746;',
  success: 'linear-gradient(89.89deg, #00EB7C 0%, #11D6EC 100%);',
  warning: 'linear-gradient(45deg,#ffae12,#f0da16 98.96%)',
  info: '#5bc0de',
};

export function getThemeStyle(key: ToastSeverity) {
  return styles({ background: themes[key] });
}
