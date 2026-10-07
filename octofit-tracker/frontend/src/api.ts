const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000')

export function apiUrl(path: string): string {
  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
}
