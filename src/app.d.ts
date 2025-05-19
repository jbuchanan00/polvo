// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PoolClient } from "pg";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: PoolClient
		}
		interface PageData {
			error: boolean,
			message: string
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

