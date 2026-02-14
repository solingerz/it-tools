export function extname(input: string): string {
  if (!input) {
    return '';
  }

  const withoutQuery = input.split('?')[0]?.split('#')[0] ?? input;
  const normalized = withoutQuery.replaceAll('\\', '/');
  const lastSegment = normalized.slice(normalized.lastIndexOf('/') + 1);
  const lastDot = lastSegment.lastIndexOf('.');

  // Match Node's behavior for names like ".gitignore"
  if (lastDot <= 0) {
    return '';
  }

  return lastSegment.slice(lastDot);
}

export default {
  extname,
};
