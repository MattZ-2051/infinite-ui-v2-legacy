export function styles(obj: { [key: string]: string | number }): string {
  return Object.entries(obj)
    .filter(([nameAndUnit, value]) => {
      return nameAndUnit && value !== null;
    })
    .map(([nameAndUnit, value]) => {
      const [name, unit] = nameAndUnit.split('.');

      if (unit) {
        value = `${value}${unit}`;
      }

      return `${name}: ${value};`;
    })
    .join(' ');
}
