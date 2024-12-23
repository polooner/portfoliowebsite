export type Instruction = {
  file?: string;
  code: string;
  description?: string;
};

export type ComponentData<T = {}> = {
  component: (props: T) => JSX.Element;
  instructions: Instruction[];
  componentProps?: T;
  animatable?: boolean;
  variant?: string;
};

export type ComponentShowcase<T = {}> = {
  title: string;
  components: ComponentData<T>[];
};
