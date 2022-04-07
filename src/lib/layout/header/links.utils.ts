export const isVisible = (excludeFor: string[], pagePathname) => {
  return excludeFor ? !excludeFor.includes(pagePathname) : true;
};
