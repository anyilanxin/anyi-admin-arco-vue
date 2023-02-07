<template>
  <div class="container">
    <div class="logo">
      <img alt="logo" src="/img/logo.png" />
      <div class="logo-text">AnYi Admin</div>
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <AnYiI18nTheme class="login-i18n-theme" />
        <LoginForm />
      </div>
      <div class="footer">
        <AnYiFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .logo-text {
      color: #fff;
    }
    .logo > img {
      width: 50px;
      height: 50px;
    }

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;

      .login-i18n-theme {
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: #fff;
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
