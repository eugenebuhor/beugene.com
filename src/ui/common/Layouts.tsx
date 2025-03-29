import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';
import styles from '@/ui/common/Layouts.module.css';
import type { PolymorphicComponentProps } from '@/types/react';

/* LayoutMain */
type LayoutMainProps<C extends ElementType = 'main'> = PolymorphicComponentProps<
  C,
  {
    children?: ReactNode | ReactNode[];
    className?: string;
  }
>;

export const LayoutMain = ({
  children,
  className,
  component: Component = 'main',
  ...rest
}: LayoutMainProps) => {
  return (
    <Component className={clsx(styles.layoutMain, className)} {...rest}>
      {children}
    </Component>
  );
};

/* LayoutSection */
type LayoutSectionProps<C extends ElementType = 'section'> = PolymorphicComponentProps<
  C,
  {
    children?: ReactNode | ReactNode[];
    className?: string;
  }
>;

export const LayoutSection = <C extends ElementType = 'section'>({
  children,
  className,
  component,
  ...rest
}: LayoutSectionProps<C>) => {
  const Component = component || 'section';

  return (
    <Component className={clsx(styles.layoutSection, className)} {...rest}>
      {children}
    </Component>
  );
};

/* LayoutContent */
// type LayoutContentProps = {
//   children: React.ReactNode | React.ReactNode[];
//   className?: string;
// };
//
// export const LayoutSectionContent = ({
//   children,
//   className,
//   ...rest
// }: LayoutContentProps & FlexProps) => {
//   return (
//     <Flex
//       component="div"
//       flexDirection="column"
//       justifyContent="flex-start"
//       className={clsx(styles.layoutContent, className)}
//       {...rest}
//     >
//       {children}
//     </Flex>
//   );
// };
