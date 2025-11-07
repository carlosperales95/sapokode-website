/// <reference types="vite/client" />

declare module 'vue-json-viewer' {
	
}

// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
	show: "sidebar" | "navbar" | "",
	description?: string,
	order?: number,
	width?: string,
	permission?: string,
	role?: string,
	breadcrumb?: {name: string, link?: string}[],
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}