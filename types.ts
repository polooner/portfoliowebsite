export type Instruction = {
  file?: string;
  code: string;
  description?: string;
};

export type ComponentData = {
  title: string;
  components: {
    component: () => JSX.Element;
    instructions: Instruction[];
  }[];
};
