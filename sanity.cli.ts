/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  reactCompiler: { target: '19' },
  vite: {
    resolve: {
      alias: [
        {
          find: /^react-compiler-runtime$/,
          replacement: 'react/compiler-runtime',
        },
      ],
    },
    // keep Vite's optimizer from pre-bundling (and baking in) the shim before the alias applies
    optimizeDeps: { exclude: ['react-compiler-runtime'] },
  },
});
