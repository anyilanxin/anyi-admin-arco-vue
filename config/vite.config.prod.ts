/* eslint-disable consistent-return */
import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configStyleImportPlugin from './plugin/styleImport';
import configImageminPlugin from './plugin/imagemin';

const timestamp = new Date().getTime();
export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin(),
      configImageminPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: `assets/[name].[hash].${timestamp}.js`, // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: `assets/[name].[hash].${timestamp}.js`, // 拆分js到模块文件夹
          assetFileNames: `assets/[name].[hash].${timestamp}.[ext]`, // 用于输出静态资源的命名
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);
