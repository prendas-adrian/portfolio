# Event Loop

An **event loop** is the mechanism that allows a program to run asynchronous operations using a single thread. It is an infinite loop that does two things: it checks if there is pending work (callbacks, completed tasks) and executes it; if nothing is ready, it **waits** until something happens (a timeout, a network response, a file being read).

The key is that slow operations (network, disk, timers) do not block the thread: they are delegated to the environment and their callback is queued until they are ready. Meanwhile, the event loop keeps processing other tasks. This is called **cooperative multitasking**: each task voluntarily yields control when it reaches an operation that requires waiting.

## Main components (JavaScript case)

JavaScript is **single-threaded**, but it can handle asynchronous operations thanks to the runtime's event loop (browser or Node.js).

### Call Stack (Execution stack)

This is where functions are executed. It works under the **LIFO** principle (Last In, First Out).

```javascript
function greet() {
  console.log("Hello");
}

function sayGoodbye() {
  greet();
  console.log("Goodbye");
}

sayGoodbye();
// Call Stack:
// 1. sayGoodbye() enters
// 2. greet() enters
// 3. console.log("Hello") enters and leaves
// 4. greet() leaves
// 5. console.log("Goodbye") enters and leaves
// 6. sayGoodbye() leaves
```

### Web APIs / Environment APIs

The runtime provides APIs that operate outside the call stack, such as `setTimeout`, `fetch`, `DOM events`, etc.

### Callback Queue

When an asynchronous API finishes, its callback is placed here waiting to be executed.

### Microtask Queue

It has priority over the callback queue. Promises (`Promise.then`) and `queueMicrotask` are placed here.

---

## How it works in JavaScript

1. It executes everything in the **Call Stack**.
2. If the Call Stack is empty, it checks the **Microtask Queue** and runs all its tasks.
3. If the Microtask Queue is empty, it checks the **Callback Queue** and runs one task.
4. Repeat.

```javascript
console.log("1");              // Synchronous — runs first

setTimeout(() => {
  console.log("2");            // Callback queue — runs last
}, 0);

Promise.resolve().then(() => {
  console.log("3");            // Microtask queue — runs before the callback
});

console.log("4");              // Synchronous — runs after the 1

// Output:
// 1
// 4
// 3
// 2
```

---

## How it works in Python

Python does have real threads (`threading`), but since Python 3.4 it includes **`asyncio`**: a standard library that implements a single-threaded event loop, similar in spirit to JavaScript's.

The ingredients are:

- **Coroutines**: functions defined with `async def`. They do not run when called; they return a coroutine object.
- **`await`**: the point where a coroutine yields control to the event loop ("I'm waiting for this, continue with something else").
- **Tasks**: coroutines wrapped to be scheduled on the loop (`asyncio.create_task`).
- **The loop itself**: started with `asyncio.run()`. Internally it uses an operating system *selector* (`epoll` on Linux) to wait for I/O events without consuming CPU.

Unlike JavaScript, Python has no microtask queue: all ready tasks live in a single queue and are handled in arrival order.

### Basic example: two concurrent tasks

```python
import asyncio

async def task(name, delay):
    print(f"{name} start")
    await asyncio.sleep(delay)   # yields control to the loop
    print(f"{name} end")

async def main():
    await asyncio.gather(
        task("A", 2),
        task("B", 1),
    )

asyncio.run(main())
```

```python
# Output:
# A start
# B start   <- B starts while A waits
# B end     <- B finishes first (1s < 2s)
# A end
```

Both tasks advance **interleaved on the same thread**: while A sleeps, B runs. In total they take ~2s, not ~3s.

### The equivalent of setTimeout(0)

`asyncio.create_task` schedules the coroutine but does not run it yet; you have to give control back to the loop:

```python
import asyncio

async def later():
    print("2")

async def main():
    print("1")
    asyncio.create_task(later())  # stays queued, like setTimeout
    print("3")
    await asyncio.sleep(0)        # yields control to the loop once

asyncio.run(main())

# Output:
# 1
# 3
# 2
```

Same behavior as in JavaScript: what is scheduled never runs before the synchronous code finishes.

### Blocking the loop is just as serious

If you use blocking code (`time.sleep`, synchronous requests, heavy computations), **the whole loop freezes**, just like the call stack in JavaScript:

```python
import asyncio
import time

async def later():
    print("later executed")

async def main():
    asyncio.create_task(later())
    time.sleep(3)          # blocks EVERYTHING! "later" does not run until it finishes

asyncio.run(main())

# Output (after 3 seconds of waiting):
# later executed
```

The solution is to use the non-blocking versions (`await asyncio.sleep(3)`) or delegate heavy work to a thread:

```python
import asyncio
import time

async def main():
    await asyncio.to_thread(time.sleep, 3)  # the loop stays alive while it waits
```

The golden rule: inside `async` code, always use the non-blocking versions (`asyncio.sleep`, `httpx`, `aiofiles`) or delegate heavy blocks with `asyncio.to_thread`.

---

## Summary

<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>JavaScript</th>
      <th>Python (asyncio)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Thread</td>
      <td>Only one</td>
      <td>Only one for the loop (separate threads available)</td>
    </tr>
    <tr>
      <td>Pause a task</td>
      <td><code>await promise</code></td>
      <td><code>await coroutine</code></td>
    </tr>
    <tr>
      <td>Schedule a task</td>
      <td><code>setTimeout</code>, <code>queueMicrotask</code></td>
      <td><code>asyncio.create_task</code></td>
    </tr>
    <tr>
      <td>Run several in parallel</td>
      <td><code>Promise.all</code></td>
      <td><code>asyncio.gather</code></td>
    </tr>
    <tr>
      <td>Priority queues</td>
      <td>Microtask queue + callback queue</td>
      <td>A single FIFO queue</td>
    </tr>
    <tr>
      <td>Non-blocking sleep</td>
      <td><code>setTimeout(fn, ms)</code></td>
      <td><code>await asyncio.sleep(ms)</code></td>
    </tr>
  </tbody>
</table>

In both languages the idea is the same: one thread, one loop, tasks that yield control when they wait. Concurrency comes from interleaving, not from parallelism.
