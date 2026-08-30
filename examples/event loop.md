# Event Loop

Un **event loop** (bucle de eventos) es el mecanismo que permite a un programa ejecutar operaciones asincrónicas usando un solo hilo. Es un bucle infinito que hace dos cosas: revisa si hay trabajo pendiente (callbacks, tareas completadas) y lo ejecuta; si no hay nada listo, **espera** hasta que algo ocurra (un timeout, una respuesta de red, un archivo leído).

La clave está en que las operaciones lentas (red, disco, timers) no bloquean el hilo: se delegan al entorno y su callback queda en cola hasta que estén listas. Mientras tanto, el event loop sigue procesando otras tareas. A esto se le llama **multitarea cooperativa**: cada tarea cede el control voluntariamente cuando llega a una operación que requiere espera.

## Componentes principales (caso JavaScript)

JavaScript es **single-threaded**, pero puede manejar operaciones asincrónicas gracias al event loop del runtime (navegador o Node.js).

### Call Stack (Pila de ejecución)

Es donde se ejecutan las funciones. Funciona bajo el principio **LIFO** (Last In, First Out).

```javascript
function saludar() {
  console.log("Hola");
}

function despedir() {
  saludar();
  console.log("Adiós");
}

despedir();
// Call Stack:
// 1. despedir() entra
// 2. saludar() entra
// 3. console.log("Hola") entra y sale
// 4. saludar() sale
// 5. console.log("Adiós") entra y sale
// 6. despedir() sale
```

### Web APIs / APIs del entorno

El runtime provee APIs que operan fuera del call stack, como `setTimeout`, `fetch`, `DOM events`, etc.

### Callback Queue (Cola de callbacks)

Cuando una API asincrónica termina, su callback se coloca aquí esperando ser ejecutado.

### Microtask Queue (Cola de microtareas)

Tiene prioridad sobre el callback queue. Aquí se colocan las promesas (`Promise.then`) y `queueMicrotask`.

---

## ¿Cómo funciona en JavaScript?

1. Ejecuta todo lo que haya en el **Call Stack**.
2. Si el Call Stack está vacío, revisa la **Microtask Queue** y ejecuta todas las tareas.
3. Si la Microtask Queue está vacía, revisa la **Callback Queue** y ejecuta una tarea.
4. Repite.

```javascript
console.log("1");              // Sincrónico — se ejecuta primero

setTimeout(() => {
  console.log("2");            // Callback queue — se ejecuta al final
}, 0);

Promise.resolve().then(() => {
  console.log("3");            // Microtask queue — se ejecuta antes del callback
});

console.log("4");              // Sincrónico — se ejecuta después del 1

// Salida:
// 1
// 4
// 3
// 2
```

---

## ¿Cómo funciona en Python?

Python sí tiene hilos reales (`threading`), pero desde Python 3.4 incluye **`asyncio`**: una librería estándar que implementa un event loop de un solo hilo, similar en espíritu al de JavaScript.

Los ingredientes son:

- **Corrutinas**: funciones definidas con `async def`. No se ejecutan al llamarlas, devuelven un objeto coroutine.
- **`await`**: el punto donde una corrutina cede el control al event loop ("espero esto, sigue con otra cosa").
- **Tasks**: corrutinas envueltas para ser programadas en el loop (`asyncio.create_task`).
- **El loop mismo**: iniciado con `asyncio.run()`. Internamente usa un *selector* del sistema operativo (`epoll` en Linux) para esperar eventos de I/O sin consumir CPU.

A diferencia de JavaScript, en Python no existe la microtask queue: todas las tareas listas viven en una sola cola y se atienden por orden de llegada.

### Ejemplo básico: dos tareas concurrentes

```python
import asyncio

async def tarea(nombre, delay):
    print(f"{nombre} inicio")
    await asyncio.sleep(delay)   # cede el control al loop
    print(f"{nombre} fin")

async def main():
    await asyncio.gather(
        tarea("A", 2),
        tarea("B", 1),
    )

asyncio.run(main())
```

```python
# Salida:
# A inicio
# B inicio   ← B empieza mientras A espera
# B fin      ← B termina primero (1s < 2s)
# A fin
```

Las dos tareas avanzan **intercaladas en el mismo hilo**: mientras A duerme, corre B. En total tardan ~2s, no ~3s.

### El equivalente a setTimeout(0)

`asyncio.create_task` programa la corrutina pero no la ejecuta todavía; hay que darle el control al loop:

```python
import asyncio

async def tarde():
    print("2")

async def main():
    print("1")
    asyncio.create_task(tarde())  # queda en cola, como setTimeout
    print("3")
    await asyncio.sleep(0)        # cede el control una vez al loop

asyncio.run(main())

# Salida:
# 1
# 3
# 2
```

Mismo comportamiento que en JavaScript: lo programado nunca corre antes de que el código sincrónico termine.

### Bloquear el loop es igual de grave

Si usas código bloqueante (`time.sleep`, requests sincrónicos, cálculos pesados), **todo el loop se congela**, igual que el call stack en JavaScript:

```python
import asyncio
import time

async def tarde():
    print("tarde ejecutada")

async def main():
    asyncio.create_task(tarde())
    time.sleep(3)          # ¡bloquea TODO! "tarde" no corre hasta que termine

asyncio.run(main())

# Salida (tras 3 segundos de espera):
# tarde ejecutada
```

La solución es usar las versiones no bloqueantes (`await asyncio.sleep(3)`) o delegar lo pesado a un hilo:

```python
import asyncio
import time

async def main():
    await asyncio.to_thread(time.sleep, 3)  # el loop sigue vivo mientras espera
```

La regla de oro: dentro de código `async`, usa siempre las versiones no bloqueantes (`asyncio.sleep`, `httpx`, `aiofiles`) o delega los bloques pesados con `asyncio.to_thread`.

---

## Resumen

<table>
  <thead>
    <tr>
      <th>Concepto</th>
      <th>JavaScript</th>
      <th>Python (asyncio)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hilo</td>
      <td>Uno solo</td>
      <td>Uno solo para el loop (hilos aparte disponibles)</td>
    </tr>
    <tr>
      <td>Pausar una tarea</td>
      <td><code>await promesa</code></td>
      <td><code>await corrutina</code></td>
    </tr>
    <tr>
      <td>Programar tarea</td>
      <td><code>setTimeout</code>, <code>queueMicrotask</code></td>
      <td><code>asyncio.create_task</code></td>
    </tr>
    <tr>
      <td>Ejecutar varias en paralelo</td>
      <td><code>Promise.all</code></td>
      <td><code>asyncio.gather</code></td>
    </tr>
    <tr>
      <td>Colas de prioridad</td>
      <td>Microtask queue + callback queue</td>
      <td>Una sola cola FIFO</td>
    </tr>
    <tr>
      <td>Sleep no bloqueante</td>
      <td><code>setTimeout(fn, ms)</code></td>
      <td><code>await asyncio.sleep(ms)</code></td>
    </tr>
  </tbody>
</table>

En ambos lenguajes la idea es la misma: un hilo, un bucle, tareas que ceden el control cuando esperan. La concurrencia viene del intercalado, no del paralelismo.
