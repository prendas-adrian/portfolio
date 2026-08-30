# Patrones de diseño

## Introducción

Los patrones de diseño son soluciones probadas y reutilizables a problemas comunes que surgen durante el diseño de software. No son implementaciones concretas, sino descripciones y plantillas que guían cómo estructurar el código para resolver una clase de problemas: mejorar la mantenibilidad, la extensibilidad y la comunicación entre desarrolladores.

## ¿Por qué usar patrones de diseño?

- Aceleran el diseño al proporcionar soluciones conocidas.
- Mejoran la comunicación: "usa un patrón Singleton" dice mucho a otros desarrolladores.
- Aumentan la calidad: favorecen la separación de responsabilidades y la reutilización.
- Facilitan la evolución: muchos patrones favorecen la extensibilidad sin cambiar código existente.

## Componentes de un patrón

- Nombre: facilita la referencia y la comunicación.
- Intención: qué hace el patrón.
- Problema: cuándo aplicarlo (contexto y fuerzas en conflicto).
- Solución: estructura y relaciones entre elementos.
- Consecuencias: ventajas, desventajas y costes.
- Implementación: notas prácticas y posibles variantes.

## Clasificación principal

Los patrones se agrupan comúnmente en tres familias:

1. Patrones creacionales: relacionados con la creación de objetos.
2. Patrones estructurales: cómo componer objetos y clases para formar estructuras mayores.
3. Patrones comportamentales: cómo se comunican y colaboran los objetos.

A continuación se resumen los patrones más conocidos de cada categoría y, para cada uno, un ejemplo breve de uso típico.

---

## Patrones Creacionales

- **Singleton**
  - Intención: asegurar que una clase tenga una única instancia accesible globalmente.
  - Problema: recursos compartidos que deben existir una sola vez (configuración, pool, logger).
  - Solución: ocultar el constructor y exponer un punto de acceso global que crea la instancia la primera vez.
  - Consecuencias: fácil acceso global pero puede introducir acoplamiento y dificultar pruebas (mocking). Evitar su abuso.
  - Ejemplo:

    ```python
    class Configuracion:
        _instancia = None

        def __new__(cls):
            if cls._instancia is None:
                cls._instancia = super().__new__(cls)
                cls._instancia.tempo = "UTC"
            return cls._instancia

    c1 = Configuracion()
    c2 = Configuracion()
    assert c1 is c2
    ```

- **Factory Method**
  - Intención: delegar la creación de objetos a subclases.
  - Problema: cuando una clase no sabe exactamente qué subclase necesita crear.
  - Solución: definir un método fábrica que devuelva un producto, y permitir que subclases lo sobreescriban.
  - Consecuencias: mejora la extensibilidad y desacopla al cliente de clases concretas.
  - Ejemplo:

    ```python
    class Documento:
        def guardar(self):
            pass

    class PDF(Documento):
        def guardar(self):
            print("Guardando PDF")

    class Word(Documento):
        def guardar(self):
            print("Guardando Word")

    class FabricaDocumentos:
        def crear(self, tipo):
            return PDF() if tipo == "pdf" else Word()

    documento = FabricaDocumentos().crear("pdf")
    documento.guardar()
    ```

- **Abstract Factory**
  - Intención: proporcionar una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas.
  - Problema: cuando los productos deben ser usados en conjunto y variantes paralelas deben mantenerse.
  - Solución: un objeto fábrica que crea cada tipo de producto de la familia.
  - Ejemplo:

    ```python
    class Boton:
        def pintar(self): pass

    class Ventana:
        def render(self): pass

    class BotonWindows(Boton):
        def pintar(self): print("Botón Windows")

    class VentanaWindows(Ventana):
        def render(self): print("Ventana Windows")

    class FabricaWindows:
        def crear_boton(self): return BotonWindows()
        def crear_ventana(self): return VentanaWindows()
    ```

- **Builder**
  - Intención: separar la construcción de un objeto complejo de su representación, de modo que el mismo proceso de construcción pueda crear representaciones diferentes.
  - Problema: construcción de objetos con muchos parámetros o pasos opcionales.
  - Solución: usar un `Builder` que proporciona una API fluida para configurar y finalmente construir el objeto.
  - Ejemplo:

    ```python
    class Pedido:
        def __init__(self):
            self.items = []
            self.envio = None

    class PedidoBuilder:
        def __init__(self):
            self.pedido = Pedido()

        def agregar_item(self, item):
            self.pedido.items.append(item)
            return self

        def con_envio(self, envio):
            self.pedido.envio = envio
            return self

        def build(self):
            return self.pedido

    pedido = PedidoBuilder().agregar_item("Libro").con_envio("Urgente").build()
    ```

- **Prototype**
  - Intención: crear nuevos objetos copiando un prototipo existente.
  - Problema: creación costosa o compleja de nuevos objetos; prefieres clonar.
  - Solución: mantener prototipos y clonarlos cuando se necesite un nuevo objeto.
  - Ejemplo:

    ```python
    import copy

    class Usuario:
        def __init__(self, nombre, rol):
            self.nombre = nombre
            self.rol = rol

        def clone(self):
            return copy.deepcopy(self)

    admin = Usuario("Ana", "admin")
    editor = admin.clone()
    editor.rol = "editor"
    ```

---

## Patrones Estructurales

- **Adapter**
  - Intención: convertir la interfaz de una clase a otra que espera el cliente.
  - Problema: integrar código con interfaces incompatibles.
  - Solución: crear una capa adaptadora que delegue llamadas al objeto existente transformando interfaces.
  - Ejemplo:

    ```python
    class EnchufeEuropeo:
        def conectar(self):
            print("Conectado a 220V")

    class EnchufeAmericano:
        def plug(self):
            print("Conectado a 110V")

    class Adaptador(EnchufeAmericano):
        def __init__(self, enchufe):
            self.enchufe = enchufe

        def plug(self):
            self.enchufe.conectar()
    ```

- **Decorator**
  - Intención: añadir responsabilidades a un objeto de forma dinámica.
  - Problema: evitar explosión de subclases para combinar funcionalidades.
  - Solución: envolver el objeto con decoradores que implementan la misma interfaz y añaden comportamiento.
  - Ejemplo:

    ```python
    class Cafe:
        def costo(self):
            return 10

    class LecheDecorator:
        def __init__(self, cafe):
            self.cafe = cafe

        def costo(self):
            return self.cafe.costo() + 2
    ```

- **Facade**
  - Intención: proporcionar una interfaz simplificada a un subsistema complejo.
  - Problema: clientes que necesitan usar un subsistema extenso con muchas clases.
  - Solución: crear una fachada que orquesta llamadas internas reduciendo la complejidad visible.
  - Ejemplo:

    ```python
    class CargaVideo:
        def cargar(self, url): print(f"Cargando {url}")

    class Decoder:
        def decode(self): print("Decodificando video")

    class ReproductorFacade:
        def __init__(self):
            self.carga = CargaVideo()
            self.decoder = Decoder()

        def reproducir(self, url):
            self.carga.cargar(url)
            self.decoder.decode()
    ```

- **Proxy**
  - Intención: proporcionar un sustituto o representante de otro objeto para controlar el acceso.
  - Problema: controlar acceso, añadir caché, lazy-loading, o protección.
  - Solución: proxy que implementa la misma interfaz y delega con control adicional.
  - Ejemplo:

    ```python
    class Imagen:
        def __init__(self, nombre):
            self.nombre = nombre

    class ImagenProxy:
        def __init__(self, nombre):
            self.nombre = nombre
            self._imagen = None

        def mostrar(self):
            if self._imagen is None:
                self._imagen = Imagen(self.nombre)
            print(f"Mostrando imagen: {self.nombre}")
    ```

- **Composite**
  - Intención: componer objetos en estructuras jerárquicas para representar jerarquías parte-todo.
  - Problema: tratar objetos individuales y compuestos de forma uniforme.
  - Solución: definir una interfaz común para componentes y contenedores que contienen componentes.
  - Ejemplo:

    ```python
    class Archivo:
        def __init__(self, nombre):
            self.nombre = nombre

    class Carpeta:
        def __init__(self, nombre):
            self.nombre = nombre
            self.children = []

        def agregar(self, item):
            self.children.append(item)
    ```

---

## Patrones Comportamentales

- **Strategy**
  - Intención: definir una familia de algoritmos, encapsular cada uno y hacerlos intercambiables.
  - Problema: seleccionar algoritmo en tiempo de ejecución sin condicionales extensos.
  - Solución: encapsular algoritmos en clases y delegar la elección a un contexto.
  - Ejemplo:

    ```python
    class Descuento:
        def aplicar(self, total):
            return total

    class DescuentoVIP(Descuento):
        def aplicar(self, total):
            return total * 0.9

    class Carrito:
        def __init__(self, estrategia):
            self.estrategia = estrategia

        def total(self, monto):
            return self.estrategia.aplicar(monto)
    ```

- **Observer**
  - Intención: definir una dependencia uno-a-muchos entre objetos para notificar cambios.
  - Problema: actualizar múltiples dependientes cuando un objeto cambia de estado.
  - Solución: sujeto que mantiene una lista de observadores y notifica a todos cuando cambia.
  - Ejemplo:

    ```python
    class Blog:
        def __init__(self):
            self.subscriptores = []

        def suscribir(self, obs):
            self.subscriptores.append(obs)

        def publicar(self, mensaje):
            for obs in self.subscriptores:
                obs.actualizar(mensaje)
    ```

- **Command**
  - Intención: encapsular una petición como un objeto, permitiendo parametrizar clientes con distintas solicitudes.
  - Problema: necesidad de colas, registros de operaciones, deshacer/rehacer.
  - Solución: crear objetos comando con `execute()` y, opcionalmente, `undo()`.
  - Ejemplo:

    ```python
    class EncenderLuz:
        def execute(self):
            print("Luz encendida")

    class Boton:
        def __init__(self, comando):
            self.comando = comando

        def pulsar(self):
            self.comando.execute()
    ```

- **Iterator**
  - Intención: proporcionar una forma estándar de recorrer elementos de una colección sin exponer su representación.
  - Problema: múltiples colecciones con diferentes implementaciones de acceso.
  - Solución: definir un iterador con operaciones `hasNext()` / `next()`.
  - Ejemplo:

    ```python
    class Iterador:
        def __init__(self, elementos):
            self.elementos = elementos
            self.indice = 0

        def __iter__(self):
            return self

        def __next__(self):
            if self.indice >= len(self.elementos):
                raise StopIteration
            valor = self.elementos[self.indice]
            self.indice += 1
            return valor
    ```

- **State**
  - Intención: permitir que un objeto cambie su comportamiento cuando su estado interno cambia.
  - Problema: grandes estructuras condicionales basadas en el estado.
  - Solución: extraer comportamientos en objetos de estado y delegar la lógica.
  - Ejemplo:

    ```python
    class EstadoPedido:
        def siguiente(self, pedido):
            pass

    class PedidoPendiente(EstadoPedido):
        def siguiente(self, pedido):
            print("Pedido pendiente")

    class PedidoEnviado(EstadoPedido):
        def siguiente(self, pedido):
            print("Pedido enviado")
    ```

- **Template Method**
  - Intención: definir el esqueleto de un algoritmo en una operación, deferir algunos pasos a subclases.
  - Problema: compartir estructura de algoritmo pero permitir variaciones en pasos concretos.
  - Solución: método plantilla en clase base que llama a pasos abstractos/definidos.
  - Ejemplo:

    ```python
    class Exportador:
        def exportar(self):
            datos = self.obtener_datos()
            return self.formatear(datos)

        def obtener_datos(self):
            raise NotImplementedError

        def formatear(self, datos):
            return datos
    ```

- **Mediator**
  - Intención: encapsular cómo interactúan un conjunto de objetos, moviendo la comunicación a un mediador.
  - Problema: objetos fuertemente acoplados por llamadas directas entre sí.
  - Solución: centralizar la comunicación en un mediator que coordina.
  - Ejemplo:

    ```python
    class ChatMediator:
        def __init__(self):
            self.usuarios = []

        def registrar(self, usuario):
            self.usuarios.append(usuario)

        def enviar(self, remitente, mensaje):
            for usuario in self.usuarios:
                if usuario != remitente:
                    usuario.recibir(mensaje)
    ```

---

## Cómo aplicar patrones correctamente

1. Entender el problema: los patrones no son soluciones universales.
2. Evitar sobreingeniería: no introducir patrones si una solución simple basta.
3. Priorizar claridad: usa nombres y estructura que faciliten comprender la intención.
4. Documentar la elección: explica por qué se usa un patrón concreto.
5. Escribir tests: muchos patrones mejoran testabilidad pero hay que confirmarlo.

## Ejemplo breve (Factory Method)

```pseudo
interface Creador {
  crearProducto(): Producto
}

class CreadorConcretoA implements Creador {
  crearProducto() => new ProductoConcretoA()
}

class Cliente {
  constructor(creador: Creador)
  usar() {
    p = creador.crearProducto()
    p.operar()
  }
}
```

## Conclusión

Los patrones de diseño son herramientas conceptuales poderosas que, usadas con criterio, mejoran el diseño y la comunicación entre equipos. Aprenderlos implica estudiar su intención, cuándo aplicarlos y practicar implementaciones reales en el lenguaje objetivo.

---
