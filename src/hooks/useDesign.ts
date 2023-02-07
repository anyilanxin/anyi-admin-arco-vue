// eslint-disable-next-line import/prefer-default-export
export function useDesign(scope: string) {
  const prefixCls = 'anyi';
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  };
}
