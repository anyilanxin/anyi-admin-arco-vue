import type { App, Plugin } from 'vue';

type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

export const withInstall = (component: any, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as any & Plugin;
};

export function hexToRgb(hexColor: string) {
  const color = hexColor.slice(1); // 去掉'#'号
  const rgba = [
    parseInt(`0x${color.slice(0, 2)}`, 16),
    parseInt(`0x${color.slice(2, 4)}`, 16),
    parseInt(`0x${color.slice(4, 6)}`, 16),
  ];
  return rgba.toString();
}

export function hexCheckShade(hexColor: string) {
  const color = hexColor.slice(1); // 去掉'#'号
  const colorChange = [
    parseInt(`0x${color.slice(0, 2)}`, 16),
    parseInt(`0x${color.slice(2, 4)}`, 16),
    parseInt(`0x${color.slice(4, 6)}`, 16),
  ];
  const grayLevel =
    colorChange[0] * 0.299 + colorChange[1] * 0.587 + colorChange[2] * 0.114;
  if (grayLevel >= 192) {
    // 浅色模式
    return '#000';
  }
  return '#fff';
}

export default null;
