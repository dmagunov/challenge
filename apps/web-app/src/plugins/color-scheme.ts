// Anti-fart script
// https://github.com/jorenbroekema/dark-theme-utils?tab=readme-ov-file#anti-fart-script
import type { Plugin } from 'vite';

const colorSchemeScript = `
  try {
    const stored = localStorage.getItem('color-scheme');
    const isSystem = !stored || stored === 'system';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const resolvedScheme = isSystem 
      ? (systemPrefersDark ? 'dark' : 'light')
      : stored;

    document.documentElement.setAttribute('data-color-scheme', resolvedScheme);
  } catch {
    document.documentElement.setAttribute('data-color-scheme', 'light');
  }
`;

function colorSchemePlugin(): Plugin {
  return {
    name: 'vite-plugin-color-scheme',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'text/javascript' },
            children: colorSchemeScript,
            injectTo: 'head-prepend',
          },
        ],
      };
    },
  };
} 

export { colorSchemePlugin };