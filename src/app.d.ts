// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PoolClient } from "pg";
import type { User } from "./routes/baseRoutesTypes"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: () => Promise<PoolClient>,
			user: User
		}
		interface PageData {
			error?: boolean,
			message?: string,
			user?: User | string | any
		}
		interface PageLoad {
			user: User | string
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

