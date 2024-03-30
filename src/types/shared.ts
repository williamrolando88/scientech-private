export interface TabInterface<T> {
  value: Partial<T>;
  component: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
}
