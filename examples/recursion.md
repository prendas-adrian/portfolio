# ¿Qué es la recursión?

La recursión es una técnica de programación en la que una función se llama a sí misma para resolver un problema.

## Idea principal

Cuando un problema puede dividirse en versiones más pequeñas del mismo problema, la recursión puede ser una solución clara y elegante.

## Ejemplo básico

```ruby
def cuenta_regresiva(n)
  if n == 0
    puts "Fin"
    return
  end

  puts n
  cuenta_regresiva(n - 1)
end

cuenta_regresiva(5)
```

### Salida

```ruby
5
4
3
2
1
Fin
```

## Caso base

El caso base es la condición que hace que la función termine. Sin este caso, la función se llamaría infinitamente y podría producir un error.

```ruby
def recursiva
  recursiva
end
```

## Ejemplo con factorial

```ruby
def factorial(n)
  if n == 0
    return 1
  end

  n * factorial(n - 1)
end

puts factorial(5)
```

### Resultado

```ruby
120
```

## ¿Cuándo usarla?

La recursión es útil para:

- árboles
- listas enlazadas
- algoritmos matemáticos
- problemas que se pueden dividir en subproblemas más pequeños

## Ventajas

- Simplifica soluciones complejas.
- Es útil en problemas jerárquicos.
- Hace el código más legible en ciertos casos.

## Desventajas

- Puede consumir más memoria.
- Si no se define bien el caso base, puede causar un bucle infinito.
- A veces es menos eficiente que una solución iterativa.

## En resumen

La recursión es cuando una función se resuelve llamándose a sí misma con un problema más pequeño hasta llegar a una condición de parada. Es una herramienta muy útil, pero debe usarse con cuidado.
