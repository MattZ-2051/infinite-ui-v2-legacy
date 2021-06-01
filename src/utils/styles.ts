export function styles(obj: { [key: string]: string | number }): string {
  const style = '';
  return Object.entries(obj)
    .map(([nameAndUnit, value]) => {
      if (value === null) {
        return '';
      }

      const [name, unit] = nameAndUnit.split('.');

      if (unit) {
        value = `${value}${unit}`;
      }

      return `${name}: ${value};`;
    })
    .concat([style])
    .join(' ');
}
