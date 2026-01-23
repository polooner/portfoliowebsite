export interface FontConfig {
  name: string;
  className: string;
}

export const FONTS: FontConfig[] = [
  { name: "greed", className: "font-greed text-[70px] flex-nowrap leading-20" },
  {
    name: "tobias",
    className: "font-tobias font-thin text-[70px] flex-nowrap leading-20",
  },
  {
    name: "lazzer",
    className:
      "font-lazzer text-[70px] flex-nowrap leading-20 tracking-tighter font-bold",
  },
  {
    name: "concrette",
    className:
      "font-concrette text-[70px] flex-nowrap leading-20 tracking-tight",
  },
  {
    name: "azeret",
    className:
      "font-azeret text-[70px] flex-nowrap leading-20 tracking-tighter",
  },
  {
    name: "mono",
    className: "font-mono text-[70px] flex-nowrap leading-20 tracking-tighter",
  },
];

export const DISPLAY_TEXT = "sheer regards";
