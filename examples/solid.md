# SOLID

SOLID es un conjunto de cinco principios de diseño de software orientado a objetos. Su objetivo es ayudar a crear sistemas más claros, flexibles, fáciles de mantener y menos propensos a errores cuando el proyecto crece.

Fue popularizado por Robert C. Martin, conocido como Uncle Bob, y cada letra de la palabra SOLID representa un principio distinto:

- S: Single Responsibility Principle (Principio de Responsabilidad Única)
- O: Open/Closed Principle (Principio de Abierto/Cerrado)
- L: Liskov Substitution Principle (Principio de Sustitución de Liskov)
- I: Interface Segregation Principle (Principio de Segregación de Interfaces)
- D: Dependency Inversion Principle (Principio de Inversión de Dependencias)

La idea central es simple: si organizamos bien las responsabilidades y reducimos el acoplamiento entre componentes, el software será mucho más fácil de entender, probar y modificar.

---

## 1. Principio de Responsabilidad Única (SRP)

### Enunciado
Una clase debe tener una sola razón para cambiar.

### Explicación
Esto significa que una clase no debe encargarse de demasiadas cosas distintas. Si una clase hace varias tareas a la vez, cualquier cambio en una de ellas puede afectar a las demás.

Por ejemplo, una clase que:

- valida usuarios,
- guarda en base de datos,
- envía correos,
- genera archivos,
- calcula estadísticas,

está haciendo demasiadas cosas. En lugar de eso, conviene dividir esas responsabilidades en varias clases.

### Ejemplo
```python
class Usuario:
    def __init__(self, nombre, email):
        self.nombre = nombre
        self.email = email

class ServicioRegistro:
    def registrar(self, usuario):
        print(f"Registrando a {usuario.nombre}")

class EnviadorEmail:
    def enviar_bienvenida(self, usuario):
        print(f"Correo enviado a {usuario.email}")
```

Cada clase tiene una responsabilidad clara.

### Beneficios
- código más legible,
- menor acoplamiento,
- cambios menos riesgosos,
- pruebas más sencillas.

---

## 2. Principio de Abierto/Cerrado (OCP)

### Enunciado
Las entidades de software deben estar abiertas a la extensión, pero cerradas a la modificación.

### Explicación
Esto quiere decir que deberíamos poder agregar nuevas funcionalidades sin tener que cambiar el código ya existente y funcionando. En lugar de reescribir una clase cada vez que aparece un nuevo caso, se busca ampliar el comportamiento mediante nuevas implementaciones.

### Ejemplo
```python
class ProcesadorPago:
    def pagar(self, metodo, monto):
        if metodo == "tarjeta":
            print("Pago con tarjeta")
        elif metodo == "efectivo":
            print("Pago en efectivo")
        else:
            raise ValueError("Método no soportado")
```

Este enfoque falla cuando queremos agregar PayPal o transferencia bancaria, porque habría que modificar esta misma clase.

Una mejor solución es usar abstracciones:

```python
class MetodoPago:
    def pagar(self, monto):
        raise NotImplementedError

class Tarjeta(MetodoPago):
    def pagar(self, monto):
        print(f"Pago con tarjeta: {monto}")

class PayPal(MetodoPago):
    def pagar(self, monto):
        print(f"Pago con PayPal: {monto}")
```

Ahora puedes añadir nuevos métodos de pago sin tocar la lógica existente.

### Beneficios
- reduce riesgos al modificar código viejo,
- facilita la evolución del sistema,
- mejora la reutilización.

---

## 3. Principio de Sustitución de Liskov (LSP)

### Enunciado
Los objetos de una clase base deben poder ser sustituidos por objetos de una clase derivada sin alterar la corrección del programa.

### Explicación
Si una clase hija hereda de otra, no debe romper el comportamiento esperado de la clase padre. En otras palabras, la subclase debe cumplir el contrato de la superclase.

### Ejemplo problemático
```python
class Ave:
    def volar(self):
        pass

class Aguila(Ave):
    def volar(self):
        print("El águila vuela")

class Pinguino(Ave):
    def volar(self):
        raise Exception("Los pingüinos no pueden volar")
```

Aquí `Pinguino` es una subclase de `Ave`, pero no puede cumplir la misma expectativa: la superclase dice que todas las aves vuelan, y eso no es cierto para los pingüinos.

### Solución
Diseñar correctamente la jerarquía de clases, separando conceptos que no son equivalentes.

```python
class Ave:
    pass

class AveVoladora(Ave):
    def volar(self):
        pass

class Aguila(AveVoladora):
    def volar(self):
        print("El águila vuela")

class Pinguino(Ave):
    pass
```

### Beneficios
- mejora la coherencia del diseño,
- reduce errores ocultos,
- hace más seguro el uso de herencia.

---

## 4. Principio de Segregación de Interfaces (ISP)

### Enunciado
Un cliente no debe depender de interfaces que no usa.

### Explicación
Cuando una interfaz contiene demasiados métodos, las clases que la implementan se ven obligadas a definir cosas que no necesitan. Esto genera código innecesario, repetitivo y difícil de mantener.

### Ejemplo problemático
```python
class DispositivoMultifuncional:
    def imprimir(self):
        pass

    def escanear(self):
        pass

    def faxear(self):
        pass
```

Si una impresora solo puede imprimir, pero no escanear ni faxear, se ve obligada a implementar métodos que no necesita.

### Solución
Dividir interfaces en varias más pequeñas y específicas:

```python
class Impresora:
    def imprimir(self):
        pass

class Escaner:
    def escanear(self):
        pass
```

### Beneficios
- menos código innecesario,
- clases más cohesivas,
- menor acoplamiento.

---

## 5. Principio de Inversión de Dependencias (DIP)

### Enunciado
Los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones. Además, las abstracciones no deben depender de detalles; los detalles deben depender de las abstracciones.

### Explicación
En vez de depender directamente de clases concretas, el código debe depender de interfaces o contratos abstractos. Así, puedes cambiar la implementación sin romper la lógica de negocio.

### Ejemplo problemático
```python
class BaseDatosMySQL:
    def guardar(self, datos):
        print("Guardando en MySQL")

class ServicioUsuario:
    def __init__(self):
        self.base_datos = BaseDatosMySQL()

    def registrar(self, usuario):
        self.base_datos.guardar(usuario)
```

Esta clase depende directamente de MySQL. Si después quieres usar PostgreSQL o una base en memoria, tendrás que modificar el servicio.

### Solución
```python
class Repositorio:
    def guardar(self, datos):
        raise NotImplementedError

class BaseDatosMySQL(Repositorio):
    def guardar(self, datos):
        print("Guardando en MySQL")

class BaseDatosPostgres(Repositorio):
    def guardar(self, datos):
        print("Guardando en PostgreSQL")

class ServicioUsuario:
    def __init__(self, repositorio: Repositorio):
        self.repositorio = repositorio

    def registrar(self, usuario):
        self.repositorio.guardar(usuario)
```

Ahora `ServicioUsuario` depende de una abstracción y no de una implementación concreta.

### Beneficios
- menos acoplamiento,
- más flexibilidad,
- mejor testabilidad,
- cambios de infraestructura más seguros.

---

## ¿Por qué es importante SOLID?

SOLID ayuda a crear software que sea:

- más mantenible,
- más fácil de entender,
- más fácil de extender,
- menos frágil ante cambios,
- más seguro para refactorizar.

Cuando un proyecto crece, sin principios claros, el código se vuelve difícil de modificar, se mezclan responsabilidades y aparecen errores difíciles de localizar.

---

## Resumen rápido

- SRP: una clase debe tener una sola responsabilidad.
- OCP: abierto para extensión, cerrado para modificación.
- LSP: la subclase debe respetar el contrato de la superclase.
- ISP: no obligar a implementar métodos innecesarios.
- DIP: depender de abstracciones, no de implementaciones concretas.

---

## En una frase

SOLID no es solo un conjunto de reglas teóricas; es una guía para escribir software más limpio, más robusto y preparado para el cambio.

Cuando se aplica bien, produce sistemas más profesionales, escalables y fáciles de mantener a largo plazo.
