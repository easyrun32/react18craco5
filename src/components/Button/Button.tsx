import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type Props = {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  type = 'button',
  primary = false,
  size = Size.medium,
  children,
  className,
  ...props
}: Props) => {
  return (
    <button type={type} className={styles.container} {...props}>
      {children}
    </button>
  );
};

Button.size = Size;
