import type { Meta, StoryObj } from "@storybook/react";
import { nanoid } from "nanoid";

import { GameCard } from "./GameCard";

const meta: Meta<typeof GameCard> = {
  title: "Game/Card",
  component: GameCard,
  args: {
    card: {
      id: nanoid(),
      fill: "striped",
      color: "red",
      shape: "circle",
      symbolCount: 3,
    },
    isSelected: false,
    isWinFlash: false,
    isLoseFlash: false,
    selectHandler: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof GameCard>;

export const Rounded: Story = {
  args: {},
};
