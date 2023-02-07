<template>
  <div v-if="bannerNoticeList && bannerNoticeList.length > 0">
    <div
      class="anyi-banner-notice"
      :class="{ 'anyi-banner-notice-rounded': tabType == 'rounded' }"
    >
      <a-alert banner closable @close="handleClose">
        <template #title>
          <div
            ref="contentParentDomRef"
            class="content-banner-notice-parent"
            @mouseenter="handleAnimate(0)"
            @mouseleave="handleAnimate(1)"
          >
            <div ref="contentDomRef" class="content-banner-notice">
              {{ noticeInfo }}
            </div>
          </div>
        </template>
      </a-alert>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, nextTick, computed } from 'vue';
  import { useAppStore } from '@/store';

  const appStore = useAppStore();

  const contentParentDomRef = ref();
  const contentDomRef = ref();
  const noticeInfo = ref('');
  const animate = ref();
  const isAnimating = ref(false);
  const bannerNoticeList = ref<string[]>([]);

  const tabType = computed(() => {
    return appStore.tabType;
  });

  // function handleSubscribe() {
  //   // subscribe(loginFirstSubscribe, handleBannerNotice);
  // }

  async function startAnimate() {
    while (bannerNoticeList.value && bannerNoticeList.value.length > 0) {
      noticeInfo.value = bannerNoticeList.value[0] as string;
      const ballEl = contentParentDomRef.value;
      if (ballEl) {
        const { offsetWidth } = ballEl;
        animate.value = contentDomRef.value.animate(
          {
            transform: [`translateX(${offsetWidth}px)`, `translateX(0px)`],
          },
          {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-out',
          }
        );
        // eslint-disable-next-line no-await-in-loop
        await animate.value.finished;
        // 暂停部分
        const contentEl = contentDomRef.value;
        const itemWidth = contentEl.getBoundingClientRect().width;
        const gapWidth = Math.max(0, itemWidth - offsetWidth + 50);
        const duration = Math.max(0, Math.floor(gapWidth / 200) * 1000);
        animate.value = contentEl.animate(
          {
            transform: [`translateX(0px)`, `translateX(-${gapWidth}px)`],
          },
          {
            duration,
            delay: 3000,
            fill: 'forwards',
            easing: 'linear',
          }
        );
        // eslint-disable-next-line no-await-in-loop
        await animate.value.finished;
        // 滑出部分
        animate.value = contentEl.animate(
          {
            transform: [
              `translateX(-${gapWidth}px)`,
              `translateX(-${itemWidth}px)`,
            ],
          },
          {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-in',
          }
        );
        // eslint-disable-next-line no-await-in-loop
        await animate.value.finished;
      }
      bannerNoticeList.value.splice(0, 1);
    }
    isAnimating.value = false;
  }

  function handleBannerNotice(data: any) {
    const message = JSON.parse(data.body);

    if (message && message.length > 0) {
      bannerNoticeList.value.push(...message);
      if (!isAnimating.value) {
        isAnimating.value = true;
        setTimeout(startAnimate, 2000);
      }
    }
  }

  function handleAnimate(type: number) {
    if (animate.value?.playState !== 'finished') {
      if (type === 0) {
        animate.value?.pause();
      } else {
        animate.value?.play();
      }
    }
  }
  function handleClose() {
    bannerNoticeList.value = [];
  }

  onMounted(() => {
    nextTick(() => {
      const data = {
        body: '["sdfsdf","sdfsdf","sdfsdfsdfsdfsdf"]',
      };
      handleBannerNotice(data);
    });
  });
</script>

<style lang="less" scoped>
  .anyi-banner-notice-rounded {
    // padding-left: 12px;
    // padding-right: 12px;
    background-color: var(--color-fill-3);
    padding-top: 5px;
  }
  .anyi-banner-notice {
    .arco-alert-with-title {
      padding: 0px 5px !important;
      align-items: center !important;
    }

    .content-banner-notice-parent {
      margin: 0px 5px;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      text-align: center;
      position: relative;
      align-items: center;
      overflow: hidden;

      .content-banner-notice {
        position: absolute;
        height: 100%;
        white-space: nowrap;
        transition-timing-function: linear;
      }
    }
  }
</style>
