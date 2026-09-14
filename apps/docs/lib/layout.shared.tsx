import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/chenyibo111/yb-ui",
    nav: {
      title: "YB UI",
      url: "/",
    },
    links: [
      {
        type: "main",
        text: "Storybook",
        url: "http://localhost:6006",
        external: true,
      },
    ],
    themeSwitch: {
      enabled: false,
    },
  }
}
