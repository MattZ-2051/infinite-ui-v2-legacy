export function styles(object: { [key: string]: string | number }): string {
  return Object.entries(object)
    .filter(([nameAndUnit, value]) => {
      return nameAndUnit && value !== null && value !== undefined;
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
