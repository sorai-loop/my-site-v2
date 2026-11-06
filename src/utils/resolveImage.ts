// Viteのimport.meta.globを使用してassets/img配下の画像を静的解決
const imageModules = import.meta.glob<string>('../assets/img/**/*', {
  eager: true,
  import: 'default',
});

export const resolveImage = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  const fileName = path.split('/').pop();
  for (const [key, url] of Object.entries(imageModules)) {
    if (fileName && key.endsWith(`/${fileName}`)) {
      return url;
    }
  }
  return path;
};
