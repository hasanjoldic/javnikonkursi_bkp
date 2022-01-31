export function createOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T) {
  return data.map((o) => ({
    value: o[valueKey],
    label: o[labelKey],
  }));
}
