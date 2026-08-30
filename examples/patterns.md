# Design Patterns

## Introduction

Design patterns are proven, reusable solutions to common problems that arise during software design. They are not concrete implementations, but descriptions and templates that guide how to structure code to solve a class of problems: improving maintainability, extensibility, and communication among developers.

## Why use design patterns?

- They speed up design by providing known solutions.
- They improve communication: "use a Singleton pattern" says a lot to other developers.
- They increase quality: they favor separation of responsibilities and reuse.
- They ease evolution: many patterns favor extensibility without changing existing code.

## Components of a pattern

- Name: facilitates reference and communication.
- Intent: what the pattern does.
- Problem: when to apply it (context and conflicting forces).
- Solution: structure and relationships between elements.
- Consequences: advantages, disadvantages, and costs.
- Implementation: practical notes and possible variants.

## Main classification

Patterns are commonly grouped into three families:

1. Creational patterns: related to object creation.
2. Structural patterns: how to compose objects and classes into larger structures.
3. Behavioral patterns: how objects communicate and collaborate.

Below the best-known patterns of each category are summarized, with a brief typical usage example for each.

---

## Creational Patterns

- **Singleton**
  - Intent: ensure that a class has a single instance accessible globally.
  - Problem: shared resources that must exist only once (configuration, pool, logger).
  - Solution: hide the constructor and expose a global access point that creates the instance the first time.
  - Consequences: easy global access but it can introduce coupling and hinder testing (mocking). Avoid overusing it.
  - Example:

    ```python
    class Config:
        _instance = None

        def __new__(cls):
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance.timezone = "UTC"
            return cls._instance

    c1 = Config()
    c2 = Config()
    assert c1 is c2
    ```

- **Factory Method**
  - Intent: delegate object creation to subclasses.
  - Problem: when a class does not know exactly which subclass it needs to create.
  - Solution: define a factory method that returns a product, and let subclasses override it.
  - Consequences: improves extensibility and decouples the client from concrete classes.
  - Example:

    ```python
    class Document:
        def save(self):
            pass

    class PDF(Document):
        def save(self):
            print("Saving PDF")

    class Word(Document):
        def save(self):
            print("Saving Word")

    class DocumentFactory:
        def create(self, kind):
            return PDF() if kind == "pdf" else Word()

    document = DocumentFactory().create("pdf")
    document.save()
    ```

- **Abstract Factory**
  - Intent: provide an interface for creating families of related objects without specifying their concrete classes.
  - Problem: when products must be used together and parallel variants must be kept.
  - Solution: a factory object that creates each product type of the family.
  - Example:

    ```python
    class Button:
        def paint(self): pass

    class Window:
        def render(self): pass

    class WindowsButton(Button):
        def paint(self): print("Windows Button")

    class WindowsWindow(Window):
        def render(self): print("Windows Window")

    class WindowsFactory:
        def create_button(self): return WindowsButton()
        def create_window(self): return WindowsWindow()
    ```

- **Builder**
  - Intent: separate the construction of a complex object from its representation, so that the same construction process can create different representations.
  - Problem: construction of objects with many parameters or optional steps.
  - Solution: use a `Builder` that provides a fluent API to configure and finally build the object.
  - Example:

    ```python
    class Order:
        def __init__(self):
            self.items = []
            self.shipping = None

    class OrderBuilder:
        def __init__(self):
            self.order = Order()

        def add_item(self, item):
            self.order.items.append(item)
            return self

        def with_shipping(self, shipping):
            self.order.shipping = shipping
            return self

        def build(self):
            return self.order

    order = OrderBuilder().add_item("Book").with_shipping("Urgent").build()
    ```

- **Prototype**
  - Intent: create new objects by copying an existing prototype.
  - Problem: costly or complex creation of new objects; you prefer to clone.
  - Solution: keep prototypes and clone them when a new object is needed.
  - Example:

    ```python
    import copy

    class User:
        def __init__(self, name, role):
            self.name = name
            self.role = role

        def clone(self):
            return copy.deepcopy(self)

    admin = User("Ana", "admin")
    editor = admin.clone()
    editor.role = "editor"
    ```

---

## Structural Patterns

- **Adapter**
  - Intent: convert the interface of a class to another that the client expects.
  - Problem: integrating code with incompatible interfaces.
  - Solution: create an adapter layer that delegates calls to the existing object transforming interfaces.
  - Example:

    ```python
    class EuropeanOutlet:
        def connect(self):
            print("Connected to 220V")

    class AmericanOutlet:
        def plug(self):
            print("Connected to 110V")

    class Adapter(AmericanOutlet):
        def __init__(self, outlet):
            self.outlet = outlet

        def plug(self):
            self.outlet.connect()
    ```

- **Decorator**
  - Intent: add responsibilities to an object dynamically.
  - Problem: avoid an explosion of subclasses to combine functionalities.
  - Solution: wrap the object with decorators that implement the same interface and add behavior.
  - Example:

    ```python
    class Coffee:
        def cost(self):
            return 10

    class MilkDecorator:
        def __init__(self, coffee):
            self.coffee = coffee

        def cost(self):
            return self.coffee.cost() + 2
    ```

- **Facade**
  - Intent: provide a simplified interface to a complex subsystem.
  - Problem: clients that need to use an extensive subsystem with many classes.
  - Solution: create a facade that orchestrates internal calls, reducing the visible complexity.
  - Example:

    ```python
    class VideoLoader:
        def load(self, url): print(f"Loading {url}")

    class Decoder:
        def decode(self): print("Decoding video")

    class PlayerFacade:
        def __init__(self):
            self.loader = VideoLoader()
            self.decoder = Decoder()

        def play(self, url):
            self.loader.load(url)
            self.decoder.decode()
    ```

- **Proxy**
  - Intent: provide a substitute or representative for another object to control access.
  - Problem: controlling access, adding caching, lazy loading, or protection.
  - Solution: a proxy that implements the same interface and delegates with added control.
  - Example:

    ```python
    class Image:
        def __init__(self, name):
            self.name = name

    class ImageProxy:
        def __init__(self, name):
            self.name = name
            self._image = None

        def show(self):
            if self._image is None:
                self._image = Image(self.name)
            print(f"Showing image: {self.name}")
    ```

- **Composite**
  - Intent: compose objects into hierarchical structures to represent part-whole hierarchies.
  - Problem: treating individual and composite objects uniformly.
  - Solution: define a common interface for components and containers that hold components.
  - Example:

    ```python
    class File:
        def __init__(self, name):
            self.name = name

    class Folder:
        def __init__(self, name):
            self.name = name
            self.children = []

        def add(self, item):
            self.children.append(item)
    ```

---

## Behavioral Patterns

- **Strategy**
  - Intent: define a family of algorithms, encapsulate each one, and make them interchangeable.
  - Problem: selecting an algorithm at runtime without extensive conditionals.
  - Solution: encapsulate algorithms in classes and delegate the choice to a context.
  - Example:

    ```python
    class Discount:
        def apply(self, total):
            return total

    class VIPDiscount(Discount):
        def apply(self, total):
            return total * 0.9

    class Cart:
        def __init__(self, strategy):
            self.strategy = strategy

        def total(self, amount):
            return self.strategy.apply(amount)
    ```

- **Observer**
  - Intent: define a one-to-many dependency between objects to notify changes.
  - Problem: updating multiple dependents when an object changes state.
  - Solution: a subject that keeps a list of observers and notifies all of them when it changes.
  - Example:

    ```python
    class Blog:
        def __init__(self):
            self.subscribers = []

        def subscribe(self, obs):
            self.subscribers.append(obs)

        def publish(self, message):
            for obs in self.subscribers:
                obs.update(message)
    ```

- **Command**
  - Intent: encapsulate a request as an object, allowing clients to be parameterized with different requests.
  - Problem: need for queues, operation logs, undo/redo.
  - Solution: create command objects with `execute()` and, optionally, `undo()`.
  - Example:

    ```python
    class TurnOnLight:
        def execute(self):
            print("Light on")

    class Button:
        def __init__(self, command):
            self.command = command

        def press(self):
            self.command.execute()
    ```

- **Iterator**
  - Intent: provide a standard way to traverse the elements of a collection without exposing its representation.
  - Problem: multiple collections with different access implementations.
  - Solution: define an iterator with `hasNext()` / `next()` operations.
  - Example:

    ```python
    class Iterator:
        def __init__(self, elements):
            self.elements = elements
            self.index = 0

        def __iter__(self):
            return self

        def __next__(self):
            if self.index >= len(self.elements):
                raise StopIteration
            value = self.elements[self.index]
            self.index += 1
            return value
    ```

- **State**
  - Intent: allow an object to change its behavior when its internal state changes.
  - Problem: large conditional structures based on state.
  - Solution: extract behaviors into state objects and delegate the logic.
  - Example:

    ```python
    class OrderState:
        def next(self, order):
            pass

    class PendingOrder(OrderState):
        def next(self, order):
            print("Pending order")

    class ShippedOrder(OrderState):
        def next(self, order):
            print("Shipped order")
    ```

- **Template Method**
  - Intent: define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
  - Problem: sharing the algorithm structure but allowing variations in concrete steps.
  - Solution: a template method in the base class that calls abstract/defined steps.
  - Example:

    ```python
    class Exporter:
        def export(self):
            data = self.get_data()
            return self.format(data)

        def get_data(self):
            raise NotImplementedError

        def format(self, data):
            return data
    ```

- **Mediator**
  - Intent: encapsulate how a set of objects interact, moving communication to a mediator.
  - Problem: objects strongly coupled by direct calls among themselves.
  - Solution: centralize communication in a mediator that coordinates.
  - Example:

    ```python
    class ChatMediator:
        def __init__(self):
            self.users = []

        def register(self, user):
            self.users.append(user)

        def send(self, sender, message):
            for user in self.users:
                if user != sender:
                    user.receive(message)
    ```

---

## How to apply patterns correctly

1. Understand the problem: patterns are not universal solutions.
2. Avoid over-engineering: do not introduce patterns if a simple solution suffices.
3. Prioritize clarity: use names and structure that make the intent easy to understand.
4. Document the choice: explain why a specific pattern is used.
5. Write tests: many patterns improve testability but it must be confirmed.

## Brief example (Factory Method)

```pseudo
interface Creator {
  createProduct(): Product
}

class ConcreteCreatorA implements Creator {
  createProduct() => new ConcreteProductA()
}

class Client {
  constructor(creator: Creator)
  use() {
    p = creator.createProduct()
    p.operate()
  }
}
```

## Conclusion

Design patterns are powerful conceptual tools that, used with judgment, improve the design and communication among teams. Learning them involves studying their intent, when to apply them, and practicing real implementations in the target language.

---
