<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="pictureCode"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.pictureCode"
          :placeholder="$t('login.form.pictureCode.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-safe />
          </template>
          <template #append>
            <a-image
              class="login-picture"
              src="data:image/png;base64,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"
              width="100px"
              height="32px"
            >
              <template #error>
                <div class="login-picture-error">
                  <span>404</span>
                </div>
              </template>
            </a-image>
          </template>
        </a-input>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'admin', // 演示默认值
    password: 'admin', // demo default value
    pictureCode: '',
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
    pictureCode: '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      margin-left: 40%;
      background-color: #fff;
      box-shadow: 1px 1px 10px 2px #ccc;
      padding: 25px 25px 10px 25px;
      width: 400px;
      border-radius: 6px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }

  body[arco-theme='dark'] .login-form-wrapper {
    background-color: #222121 !important;
    box-shadow: 1px 1px 10px 2px #171616 !important;
  }
  :deep(.arco-input-append) {
    background-color: transparent !important;
    padding: 0px !important;
  }
  .login-picture-error {
    text-align: center;
    & > span {
      font-weight: 800;
      padding-left: 20px;
      font-size: 1.8em;
      letter-spacing: 7px;
      background-image: linear-gradient(60deg, #119de2, #ff3a3a);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  :deep(.arco-image-overlay) {
    top: -6px;
  }
</style>
