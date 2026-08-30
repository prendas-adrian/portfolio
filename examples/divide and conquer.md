# Divide and Conquer

Divide and conquer (divide y vencerás) es un paradigma algorítmico que resuelve un problema dividiéndolo en subproblemas más pequeños, resolviendo cada subproblema de forma recursiva y combinando las soluciones parciales para obtener la solución final. Es uno de los patrones más utilizados en algoritmos eficientes y aparece en muchas técnicas fundamentales como ordenación, búsqueda y multiplicación de matrices.

## Pasos generales

1. Dividir: partir el problema en dos o más subproblemas de tamaño más pequeño.
2. Conquistar: resolver cada subproblema de forma recursiva (si el subproblema es lo suficientemente pequeño, resolverlo directamente —caso base—).
3. Combinar: unir las soluciones de los subproblemas para formar la solución del problema original.

Este patrón puede representarse por la fórmula de recurrencia que describe el coste T(n) del algoritmo:

$$
T(n) = a\,T\left(\frac{n}{b}\right) + f(n)
$$

donde:

- $a$ es el número de subproblemas en que se divide el problema original,
- $n/b$ es el tamaño de cada subproblema (en promedio),
- $f(n)$ es el coste de dividir y combinar.

La familia de recurrencias anterior se puede analizar con el Teorema Maestro (Master Theorem) para obtener la complejidad asintótica.

## Ejemplos clásicos

- Merge Sort: divide el arreglo por la mitad ($a=2$, $b=2$), ordena recursivamente las mitades y combina con una fusión lineal; $T(n)=2T(n/2)+O(n) \Rightarrow O(n\log n)$.
- Quick Sort: divide por una pivoteación (esperanza lineal) y combina por concatenación; su rendimiento depende del pivote elegido (promedio $O(n\log n)$, peor $O(n^2)$).
- Binary Search: divide el problema de tamaño $n$ en un subproblema de tamaño $n/2$ ($a=1$, $b=2$) y no requiere combinación costosa; $T(n)=T(n/2)+O(1) \Rightarrow O(\log n)$.
- Strassen (multiplicación de matrices): divide matrices en 4 bloques, realiza 7 multiplicaciones recursivas en lugar de 8, y combina los bloques; mejora el exponente de la multiplicación clásica.

## Teorema Maestro (resumen)

Para recurrencias de la forma $T(n)=aT(n/b)+f(n)$, compare $f(n)$ con $n^{\log_b a}$:

- Si $f(n)=O(n^{\log_b a - \epsilon})$ para algún $\epsilon>0$, entonces $T(n)=\Theta(n^{\log_b a})$.
- Si $f(n)=\Theta(n^{\log_b a}\log^k n)$ para algún $k\ge 0$, entonces $T(n)=\Theta(n^{\log_b a}\log^{k+1} n)$.
- Si $f(n)=\Omega(n^{\log_b a + \epsilon})$ y además $a\,f(n/b)\le c\,f(n)$ para alguna constante $c<1$ y $n$ suficientemente grande (condición regular), entonces $T(n)=\Theta(f(n))$.

## Pseudocódigo genérico

```
function divide_and_conquer(problem):
    if problem small enough:
        return solve_directly(problem)
    subproblems = divide(problem)
    results = []
    for sp in subproblems:
        results.append(divide_and_conquer(sp))
    return combine(results)
```

## Ejemplo: Merge Sort (Python)

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    # merge
    i = j = 0
    merged = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:]); merged.extend(right[j:])
    return merged
```

Complejidad: $T(n)=2T(n/2)+O(n) \Rightarrow O(n\log n)$.

## Ventajas y desventajas

Ventajas:

- Divide and conquer facilita el razonamiento recursivo y la programación modular.
- Muchos algoritmos basados en este patrón son eficientes y aprovechan la paralelización natural (cada subproblema puede resolverse en paralelo).
- Permite obtener algoritmos asintóticamente óptimos para problemas de ordenación, búsqueda y transformaciones.

Desventajas:

- Overhead recursivo y coste de combinación pueden afectar el rendimiento constante en tamaños pequeños.
- No todos los problemas se dividen en subproblemas independientes; en algunos casos la división genera dependencias complejas.
- Para algunos algoritmos (p. ej. Quicksort en peor pivote), el balanceo entre subproblemas importa mucho y puede degradar el rendimiento.

## Uso de la paralelización

Divide and conquer es especialmente apto para paralelismo porque subproblemas suelen ser independientes. Muchos frameworks y bibliotecas (OpenMP, multiprocessing, fork-join en Java, etc.) explotan este patrón para acelerar cómputos en máquinas con múltiples núcleos.

## Consejos prácticos

- Identificar correctamente el caso base (problemas lo bastante pequeños para resolver directamente).
- Asegurarse de que la división produce subproblemas significativamente más pequeños para evitar recursiones costosas sin beneficio.
- Medir y comparar con soluciones iterativas cuando el overhead recursivo y la memoria extra (p. ej. arrays temporales) sean problemáticos.

## Conclusión

Divide and conquer es un paradigma esencial que subyace a muchos algoritmos eficientes. Comprender cómo dividir correctamente un problema, cómo combinar subsoluciones y cómo analizar la recurrencia (por ejemplo con el Teorema Maestro) es clave para diseñar soluciones eficaces y escalables.

---

Si quieres, puedo: añadir ejemplos adicionales (Quicksort, Strassen), incluir un análisis con el Teorema Maestro paso a paso, o traducir el archivo al inglés.
