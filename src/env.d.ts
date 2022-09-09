/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_WEB3_FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
