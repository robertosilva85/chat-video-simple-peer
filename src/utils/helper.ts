export const randomColor = (): string => {
  const color = Math.floor(Math.random() * 16777215)
    .toString(16)
    .toUpperCase();
  return `#${color}`;
};
