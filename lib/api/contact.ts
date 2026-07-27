/**
 * CONTACT API SEAM — the single boundary between the UI and the backend.
 *
 * The backend does not exist yet. This module exists so that when it does, the
 * only file that changes is this one: `ContactSection` already calls
 * `submitDeploymentRequest()` and already renders loading, success, and error
 * states based on what it returns.
 *
 * ─── TO CONNECT THE REAL BACKEND ────────────────────────────────────────────
 *   1. Replace the body of `submitDeploymentRequest` with a real `fetch`
 *      (a sketch is in the comment inside the function).
 *   2. Delete the `SIMULATED_LATENCY_MS` constant and its sleep.
 *   3. Do not change the signature or the return type — the form is already
 *      written against them, so nothing in `components/` needs to be touched.
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
 * A discriminated union rather than a thrown error: the form needs to render an
 * inline message either way, and this makes it impossible to forget the failure
 * case — TypeScript will not let you read `.error` without checking `ok` first.
 */
export type SubmitResult = { ok: true } | { ok: false; error: string }

/** How long the stub pretends to talk to a server, so the UI's pending state is visible. */
const SIMULATED_LATENCY_MS = 700

/**
 * Sends a deployment request.
 *
 * STUB: currently resolves successfully after a short delay without sending
 * anything anywhere. The submitted data is logged to the browser console so the
 * form can be verified end to end during development.
 *
 * @param request - Form values, already trimmed by the caller.
 * @returns `{ ok: true }` on success, or `{ ok: false, error }` with a message
 *          suitable for displaying directly to the visitor.
 */
export async function submitDeploymentRequest(
  request: DeploymentRequest
): Promise<SubmitResult> {
  // ── Replace everything below with the real call ──────────────────────────
  //
  //   try {
  //     const response = await fetch('/api/contact', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(request),
  //     })
  //     if (!response.ok) {
  //       return { ok: false, error: 'Could not send your request. Please try again.' }
  //     }
  //     return { ok: true }
  //   } catch {
  //     return { ok: false, error: 'Network error. Please check your connection.' }
  //   }
  //
  // ─────────────────────────────────────────────────────────────────────────

  // eslint-disable-next-line no-console -- Development aid; remove with the stub.
  console.info('[FABINS] Deployment request (stub — not sent):', request)

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  return { ok: true }
}