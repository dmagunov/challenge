import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { type ButtonProps } from "../ui/button";
import { Button } from "../ui/button";

const meta: Meta<ButtonProps> = {
  title: "Button",
  parameters: {
    controls: { include: ["variant", "size"] },
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => <Button {...props}>Defualt</Button>,
};

export const Destructive = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
  },
};

export const Outline = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Secondary = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Ghost = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Link = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const Sizes = () => (
  <div className="flex flex-col items-start gap-4">
    <Button size="sm">Small Button</Button>
    <Button size="default">Default Button</Button>
    <Button size="lg">Large Button</Button>
    <Button size="icon">🔔</Button>
  </div>
);

export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
