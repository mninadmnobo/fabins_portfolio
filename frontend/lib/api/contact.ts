/**
 * CONTACT API — the single boundary between the UI and the backend.
 *
 * `ContactSection` calls `submitDeploymentRequest()` and renders pending,
 * success, and error states from what it returns. Nothing else in
 * `components/` knows that an HTTP call happens at all, so changing transport,
 * adding retries, or moving to a server action means editing only this file.
 *
 * ─── BACKEND ────────────────────────────────────────────────────────────────
 * Talks to `POST /api/v1/deployment-requests` in the Spring Boot service under
 * `backend/`. That endpoint is public; the admin endpoints on the same resource
 * require credentials and are deliberately never called from the browser.
 *
 * ─── CONFIGURATION ──────────────────────────────────────────────────────────
 * Set the API origin in `frontend/.env.local`:
 *
 *   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
 *
 * The `NEXT_PUBLIC_` prefix is required for the value to be readable in the
 * browser. It is therefore visible to anyone who views the page — never put a
 * secret in a `NEXT_PUBLIC_` variable.
 */

/** The payload collected by the deployment-request form. */
export interface DeploymentRequest {
  /** Mill or factory name. Required. */
  millName: string
  /** Name / role of the person enquiring. Required. */
  contactName: string
  /** Work email address. Required. */
  email: string
  /** Phone or WhatsApp number. Optional. */
  phone: string
  /** Free-text fabric specs and inspection requirements. Optional. */
  message: string
}

/**
 * Result of a submission.
 *
 * A discriminated union rather than a thrown error: the form has to render an
 * inline message either way, and this makes the failure case impossible to
 * forget — TypeScript will not let you read `.error` without checking `ok`.
 */
export type SubmitResult = { ok: true } | { ok: false; error: string }

/**
 * Shape of an error body from the API.
 *
 * The backend answers every error with RFC 9457 `application/problem+json`.
 * Validation failures add an `errors` object keyed by field name.
 */
interface ProblemDetail {
  title?: string
  detail?: string
  errors?: Record<string, string>
}

/** Origin of the API. Falls back to the backend's default local port. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080'

/** Give up on a request that has not responded in this long. */
const REQUEST_TIMEOUT_MS = 10_000

/** Shown when the server fails in a way we have no specific message for. */
const GENERIC_ERROR = 'Could not send your request. Please try again.'

/**
 * Submits a deployment request to the backend.
 *
 * Never throws: every failure path — validation, server error, network loss,
 * timeout — is converted into `{ ok: false, error }` carrying a message that is
 * safe to show the visitor directly.
 *
 * @param request Form values. Whitespace is trimmed server-side and blank
 *                optional fields are normalised to null there, so the caller
 *                does not need to clean them up first.
 */
export async function submitDeploymentRequest(
  request: DeploymentRequest
): Promise<SubmitResult> {
  // AbortSignal.timeout() would be neater but is unsupported in older Safari,
  // which a mill's office machine is quite likely to be running.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/deployment-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    if (response.ok) {
      return { ok: true }
    }

    return { ok: false, error: await readErrorMessage(response) }
  } catch (error) {
    // An aborted request is our timeout firing; anything else reaching here is
    // a network failure (offline, DNS, backend not running). Neither case has
    // a response body to read.
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { ok: false, error: 'The request timed out. Please try again.' }
    }

    return {
      ok: false,
      error: 'Could not reach the server. Please check your connection.',
    }
  } finally {
    // Runs on every path, so the timer is never left pending.
    clearTimeout(timeout)
  }
}

/**
 * Turns an error response into one sentence for the visitor.
 *
 * Prefers the most specific information available: a named field error first,
 * then the problem's `detail`, then a generic fallback. The body is parsed
 * defensively because an error from a proxy or load balancer will not be
 * problem+json at all.
 */
async function readErrorMessage(response: Response): Promise<string> {
  let problem: ProblemDetail | null = null

  try {
    problem = (await response.json()) as ProblemDetail
  } catch {
    // Not JSON — fall through to the status-based message below.
  }

  // Validation failure: show the first field message, which is far more useful
  // than the generic "One or more fields are invalid".
  const fieldErrors = problem?.errors
  if (fieldErrors) {
    const firstMessage = Object.values(fieldErrors)[0]
    if (firstMessage) return firstMessage
  }

  if (problem?.detail) return problem.detail

  // 5xx is our fault, so do not imply the visitor did something wrong.
  if (response.status >= 500) {
    return 'The server is temporarily unavailable. Please try again shortly.'
  }

  return GENERIC_ERROR
}