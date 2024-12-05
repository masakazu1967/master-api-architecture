export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  constructor(private value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }
  isErr(): this is Err<T, E> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return new Ok(fn(this.value));
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapErr<F>(_fn: (error: E) => F): Result<T, F> {
    return new Ok(this.value);
  }
}

export class Err<T, E> {
  constructor(private error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }
  isErr(): this is Err<T, E> {
    return true;
  }

  unwrapErr(): E {
    return this.error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<U>(_fn: (value: T) => U): Result<U, E> {
    return new Err(this.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  andThen<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
    return new Err(this.error);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return new Err(fn(this.error));
  }
}
