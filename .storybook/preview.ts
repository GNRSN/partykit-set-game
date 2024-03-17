import type { Preview } from "@storybook/react";

import "@/app/globals.css";

const preview: Preview = {
  parameters: {
    // REVIEW: I saw this in the shadcn storybook
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
