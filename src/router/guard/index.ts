import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import { useI18n } from '@/hooks/useI18n';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    const { t } = useI18n();
    window.document.title = `${t(`${to.meta.locale}`)}-AnYi Admin`;
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupUserLoginInfoGuard(router);
  setupPermissionGuard(router);
}
