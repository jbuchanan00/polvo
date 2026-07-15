# Polvo API Service Documentation

## Flow Overview

This document covers all server-side API services used in the application's authentication and data management flows.

---

## 1. Authentication Flow

### User Login / Provider Setup

When a user initiates OAuth login, their provider (Google or Instagram) is recorded to the database:

**`src/lib/server/api/auth/setAuthProvider.ts`**
```typescript
export async function setAuthProvider(db: PoolClient, userId: string, authCo: string): Promise<boolean>
```
- Stores `auth_provider` record mapping `userId → provider` (google or meta/instagram)
- Returns boolean success status

**`src/lib/server/api/auth/getAuthProvider.ts`**
```typescript
export async function getAuthProvider(db: PoolClient, userId: string): Promise<{provider: string}>
```
- Retrieves the user's auth provider from `auth_provider` table
- Used to determine which OAuth endpoint to call next

---

## 2. Token Exchange Flow

### OAuth Code → Access Token

After the user is redirected back with an authorization code, it's exchanged for an access token:

**`src/lib/server/api/tokens/exchangeTokens.ts`**
```typescript
export async function exchangeTokens(code: string, authCo: string): Promise<Response>
```
- Exchanges OAuth authorization code for access token via Google or Instagram endpoints
- **Parameters:**
  - `code` — authorization code from OAuth callback
  - `authCo` — provider identifier (`google` or `instagram`)
- **Dynamic configuration based on provider:**

| Provider | Client ID Env Var | Client Secret Env Var | Token Endpoint | Redirect URI |
|----------|-------------------|-----------------------|----------------|--------------|
| Google | `GOOGLE_CLIENT_ID` | `GOOGLE_CLIENT_SECRET` | `https://oauth2.googleapis.com/token` | `${OAUTH_REDIRECT_BASE}/auth/{provider}/callback` |
| Instagram | `INSTAGRAM_CLIENT_ID` | `META_SECRET` | `https://api.instagram.com/oauth/access_token` | `https://app.inked-out.com/profile/auth/meta/callback` |

- **Response:** Returns the token exchange HTTP response object (caller must parse JSON)
- **Error handling:** Throws `Error` with provider-specific error details if exchange fails

---

## 4. Session Management Flow

### JWT Token Operations

**`src/lib/server/api/tokens/jwt.ts`**
```typescript
// Creates a signed JWT token
export async function createJWT(userId: string): Promise<string>

// Verifies and decodes a JWT token
export async function verifyJWT(token: string): Promise<{userId: string}>
```
- Uses `jose` library with HS256 algorithm
- Token payload contains `userId`
- Default expiry: 1 hour
- Returns signed token string (create) or decoded user ID object (verify)

---

## 5. User Management Flow

### User Existence Check

**`src/lib/server/api/users/exists.ts`**
```typescript
export async function exists(db: PoolClient, userId: string): Promise<boolean>
```
- Queries database to check if a user record exists
- Returns boolean status

### User Deletion

**`src/lib/server/api/users/deleteUser.ts`**
```typescript
export async function deleteUser(db: PoolClient, userId: string): Promise<void>
```
- Deletes the user record from the database by ID
- Throws error if deletion fails — no return value on success

---

## 6. Post Data Flow

### Post Retrieval with Pagination

**`src/lib/server/api/posts/getPosts.ts`**
```typescript
export async function getPosts(db: PoolClient, page: number, limit: number): Promise<Posts[]>
```
- Fetches posts with pagination logic using offset and limit parameters
- Returns post objects (full or truncated based on request params)
- Handles error cases internally

---

## 7. Helper Services

### Geo Location

**`src/lib/server/api/geo.ts`**
- Fetches user location data via external IP geolocation API
- Returns: `{ lat, lon, country }` or null/error on failure

---

## Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `INSTAGRAM_CLIENT_ID` | Instagram (Meta) OAuth client ID |
| `META_SECRET` | Instagram (Meta) OAuth secret |
| `OAUTH_REDIRECT_BASE` | Base URL for OAuth redirect URIs |
