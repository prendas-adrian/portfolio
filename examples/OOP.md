# Programación Orientada a Objetos (OOP)

La Programación Orientada a Objetos (OOP, por sus siglas en inglés Object-Oriented Programming) es un paradigma de programación que organiza el software en piezas llamadas *objetos*. Cada objeto agrupa datos (atributos) y comportamientos (métodos) relacionados, modelando entidades del dominio real o conceptual. OOP facilita la modularidad, la reutilización y la mantenibilidad del código.

## Conceptos básicos

- **Objeto**: instancia concreta que tiene estado y comportamiento. Ejemplo: un objeto `coche` con atributos `color`, `marca` y métodos `arrancar()` o `frenar()`.
- **Clase**: plantilla o tipo que define la estructura (atributos) y comportamiento (métodos) de objetos similares. Una clase `Coche` describe qué propiedades y acciones tendrán todos los coches.
- **Instancia**: un objeto creado a partir de una clase.
- **Método**: función definida dentro de una clase que describe un comportamiento del objeto.
- **Atributo**: dato almacenado en la instancia (por ejemplo, `velocidad`).

## Principios fundamentales (los 4 pilares)

1. **Encapsulamiento**
   - Consiste en agrupar datos y métodos que operan sobre esos datos dentro de una unidad (la clase) y controlar el acceso a ellos.
   - Permite ocultar la representación interna y exponer sólo una interfaz pública, reduciendo dependencias entre componentes.
   - Ejemplo práctico: usar métodos `get()`/`set()` o propiedades en lugar de acceder directamente a atributos internos.

2. **Abstracción**
   - Extraer lo esencial de una entidad, ignorando detalles irrelevantes para la tarea actual.
   - Una clase representa una abstracción del mundo real: modela sólo lo necesario para resolver el problema.

3. **Herencia**
   - Mecanismo para definir nuevas clases basadas en clases existentes, heredando atributos y métodos.
   - Facilita la reutilización y la especialización (una clase `Vehículo` puede ser la base para `Coche` y `Motocicleta`).
   - Hay que usarla con cuidado: abuso de la herencia puede generar jerarquías rígidas; muchas veces la composición es preferible.

4. **Polimorfismo**
   - Permite usar una interfaz común para entidades diferentes. Por ejemplo, diferentes clases pueden implementar un método `dibujar()` y llamar a `dibujar()` sin conocer la clase concreta.
   - Se manifiesta como sobrecarga, sobreescritura o a través de interfaces/contratos.

## Otros conceptos importantes

- **Composición vs Herencia**: la composición consiste en construir clases usando instancias de otras clases ("tiene un"), mientras que la herencia es un "es un". Composición suele ser más flexible.
- **Visibilidad / Modificadores de acceso**: `public`, `protected`, `private` (o convenciones en lenguajes como Python) controlan qué se puede usar desde fuera de la clase.
- **Constructores y destructores**: métodos especiales para inicializar y limpiar una instancia.
- **Interfaces / Clases abstractas**: contratos que definen métodos que las clases concretas deben implementar.

## Ejemplos (pseudocódigo / Python)

Ejemplo sencillo con clases, herencia y polimorfismo:

```python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hablar(self):
        raise NotImplementedError()

class Perro(Animal):
    def hablar(self):
        return f"{self.nombre} dice: guau"

class Gato(Animal):
    def hablar(self):
        return f"{self.nombre} dice: miau"

def haz_hablar(animal: Animal):
    print(animal.hablar())

perro = Perro('Rex')
gato = Gato('Misu')
haz_hablar(perro)  # Rex dice: guau
haz_hablar(gato)   # Misu dice: miau
```

Este ejemplo muestra polimorfismo: `haz_hablar` funciona con cualquier `Animal` concretando su comportamiento según la clase real.

Composición vs Herencia (ejemplo rápido):

```python
class Motor:
    def arrancar(self):
        return 'Motor arrancado'

class Coche:
    def __init__(self):
        self.motor = Motor()  # composición: el coche tiene un motor

    def arrancar(self):
        return self.motor.arrancar()

# Alternativa: Heredar de Motor (no recomendable semánticamente)
```

## Buenas prácticas y recomendaciones

- Modela clases que representen conceptos con sentido en el dominio del problema — evita clases que acumulen responsabilidades (principio de responsabilidad única).
- Prefiere composición sobre herencia cuando la relación es de "tiene un" en lugar de "es un".
- Mantén la interfaz pública mínima necesaria (encapsulamiento).
- Escribe pruebas unitarias para los comportamientos importantes de las clases.
- Sigue principios SOLID para sistemas orientados a objetos grandes y mantenibles.

## ¿Cuándo usar OOP?

- OOP es útil cuando el dominio del problema contiene entidades naturales que encajan bien en modelos con estado y comportamiento.
- Para sistemas grandes y extensibles, OOP facilita organizar y dividir responsabilidades.
- En programas muy matemáticos o de transformación de datos, otros paradigmas (funcional o procedimental) pueden ser más simples y adecuados.

## Resumen

OOP es un paradigma centrado en objetos que agrupan datos y comportamiento, facilitando la modularidad, la reutilización y la mantenibilidad. Sus pilares —encapsulamiento, abstracción, herencia y polimorfismo— ofrecen herramientas para modelar sistemas complejos, pero deben usarse con criterio y buenas prácticas (por ejemplo, preferir composición cuando convenga).

---

Archivo creado por el equipo de documentación.
