import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';
import defaultSettings from '@/settings/projectSetting';
import { getMenuList } from '@/api/user';
import { hexCheckShade, hexToRgb } from '@/utils';
import { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => {
    const config = localStorage.getItem('__APP__CONFIG_INFO__');
    if (config) {
      return { ...JSON.parse(config) };
    }
    return { ...defaultSettings };
  },

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
      localStorage.setItem('__APP__CONFIG_INFO__', JSON.stringify(this.$state));
      this.toggleTheme();
    },

    // Change theme color
    toggleTheme(dark?: boolean) {
      const html = document.documentElement;
      if (dark === undefined) {
        dark = this.theme === 'dark';
      }
      const { body } = document;
      if (dark) {
        this.theme = 'dark';
        body.setAttribute('arco-theme', 'dark');
        html.setAttribute('arco-theme', 'dark');
        window.localStorage.setItem('__APP__DARK__MODE__', 'dark');
        body.style.removeProperty('--color-menu-light-bg');
        body.style.removeProperty('--color-menu-dark-bg');
      } else {
        this.theme = 'light';
        const shade = hexCheckShade(this.menuColor);
        if (shade === '#fff') {
          this.menuTheme = 'dark';
          document.body.style.setProperty(
            '--color-menu-dark-bg',
            this.menuColor
          );
        } else {
          this.menuTheme = 'light';
          document.body.style.setProperty(
            '--color-menu-light-bg',
            this.menuColor
          );
        }
        body.removeAttribute('arco-theme');
        html.removeAttribute('arco-theme');
        window.localStorage.removeItem('__APP__DARK__MODE__');
      }
      this.toggleColorGrey(this.colorGrey);
      if (this.systemColor) {
        document.body.style.setProperty(
          '--primary-6',
          hexToRgb(this.systemColor)
        );
      }
    },

    toggleColorGrey(colorGrey: boolean) {
      this.colorGrey = colorGrey;
      const html = document.documentElement;
      if (colorGrey) {
        window.localStorage.setItem('__APP__GREY__MODE__', 'grey');
        html.setAttribute('anyi-color-grey', 'grey');
      } else {
        window.localStorage.removeItem('__APP__GREY__MODE__');
        html.removeAttribute('anyi-color-grey');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        });
        const { data } = await getMenuList();
        this.serverMenu = data;
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
