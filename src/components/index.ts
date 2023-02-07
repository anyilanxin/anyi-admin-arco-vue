import { App } from 'vue';

import AnYiChart from './AnYiChart';
import AnYiFooter from './AnYiFooter';
import AnYiI18nTheme from './AnYiI18nTheme';
import { AnYiBlankPageWrapper, AnYiPageWrapper } from './AnYiPage';
import AnYiSvgIcon from './AnYiSvgIcon';

export default {
  install(Vue: App) {
    Vue.component('AnYiChart', AnYiChart);
    Vue.component('AnYiFooter', AnYiFooter);
    Vue.component('AnYiBlankPageWrapper', AnYiBlankPageWrapper);
    Vue.component('AnYiPageWrapper', AnYiPageWrapper);
    Vue.component('AnYiSvgIcon', AnYiSvgIcon);
    Vue.component('AnYiI18nTheme', AnYiI18nTheme);
  },
};
