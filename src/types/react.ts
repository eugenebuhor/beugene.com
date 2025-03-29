import { ElementType, ComponentPropsWithoutRef } from 'react';

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = Props & {
  component?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'component'>;
