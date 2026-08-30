# O(n): Complejidad lineal

La notación O grande, o Big O, describe el crecimiento del tiempo de ejecución de un algoritmo en función del tamaño de la entrada.

## ¿Qué significa O(n)?

O(n) significa que el tiempo de ejecución crece de forma lineal respecto a la cantidad de elementos que se procesan.

Si la entrada tiene tamaño n, el algoritmo tarda aproximadamente n pasos en ejecutarse, en el peor caso.

## Ejemplo sencillo

```javascript
function recorrerLista(lista) {
  for (const elemento of lista) {
    console.log(elemento);
  }
}
```

Este algoritmo recorre cada elemento de la lista una vez. Si la lista tiene 10 elementos, hace 10 impresiones; si tiene 100 elementos, hace 100 impresiones.

Por eso se dice que su complejidad es O(n).

## Visualización

```text
Entrada: 1, 2, 3, 4, 5, ..., n
Tiempo:  1, 2, 3, 4, 5, ..., n
```

La relación entre la entrada y el tiempo es proporcional.

## Ejemplo con búsqueda

```javascript
function buscarElemento(lista, valor) {
  for (const elemento of lista) {
    if (elemento === valor) {
      return true;
    }
  }
  return false;
}
```

En el peor caso, puede que tengas que revisar todos los elementos de la lista. Por eso esta búsqueda lineal tiene complejidad O(n).

## ¿Cuándo es O(n)?

Un algoritmo es O(n) cuando:

- recorre todos los elementos de una estructura
- hace una sola pasada por la entrada
- el número de operaciones crece proporcionalmente al tamaño de la entrada

## Comparación con otros tiempos

- O(1): tiempo constante
- O(log n): crecimiento más lento
- O(n): crecimiento lineal
- O(n^2): crecimiento cuadrático

## Importancia

Entender O(n) ayuda a elegir algoritmos más eficientes, sobre todo cuando trabajas con grandes cantidades de datos.

## En resumen

O(n) significa que el tiempo de ejecución aumenta de manera proporcional al tamaño de la entrada. Es una de las complejidades más comunes y se presenta cuando se recorren o revisan elementos uno por uno.
