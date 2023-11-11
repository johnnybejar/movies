/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_KEY: string;
  readonly VITE_API_READ_ACCESS_TOKEN: string;
}

interface ImportMeta extends import("vite/types/importMeta").ImportMeta {
  readonly env: ImportMetaEnv;
}
