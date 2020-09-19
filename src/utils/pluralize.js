export function pluralizeEnglishString(count, noun, suffix = 's') {
  return `${count} ${noun}${count % 10 !== 1 ? suffix : ''}`;
}
