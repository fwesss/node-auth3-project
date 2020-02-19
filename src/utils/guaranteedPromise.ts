type GuaranteedPromise<T> = Promise<
  | { ok: boolean; data: T; error: null }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { ok: boolean; data: null; error: any }
>

const guaranteedPromise = <T>(promise: Promise<T>): GuaranteedPromise<T> =>
  promise
    .then(data => ({ ok: true, data, error: null }))
    .catch(error => Promise.resolve({ ok: false, data: null, error }))

export default guaranteedPromise
