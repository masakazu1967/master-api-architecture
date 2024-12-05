import { Err, Ok, Result } from './result';

export function combine3<T1, T2, T3, E>(
  t1: Result<T1, E>,
  t2: Result<T2, E>,
  t3: Result<T3, E>,
): Result<[T1, T2, T3], E> {
  if (t1.isErr()) return new Err(t1.unwrapErr());
  if (t2.isErr()) return new Err(t2.unwrapErr());
  if (t3.isErr()) return new Err(t3.unwrapErr());
  return new Ok([t1.unwrap(), t2.unwrap(), t3.unwrap()]);
}

export function combine4<T1, T2, T3, T4, E>(
  t1: Result<T1, E>,
  t2: Result<T2, E>,
  t3: Result<T3, E>,
  t4: Result<T4, E>,
): Result<[T1, T2, T3, T4], E> {
  if (t1.isErr()) return new Err(t1.unwrapErr());
  if (t2.isErr()) return new Err(t2.unwrapErr());
  if (t3.isErr()) return new Err(t3.unwrapErr());
  if (t4.isErr()) return new Err(t4.unwrapErr());
  return new Ok([t1.unwrap(), t2.unwrap(), t3.unwrap(), t4.unwrap()]);
}
