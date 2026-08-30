# Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming paradigm that organizes software into pieces called *objects*. Each object groups related data (attributes) and behaviors (methods), modeling entities of a real or conceptual domain. OOP facilitates modularity, reuse, and maintainability of code.

## Basic concepts

- **Object**: a concrete instance that has state and behavior. Example: a `car` object with attributes `color`, `brand`, and methods `start()` or `brake()`.
- **Class**: a template or type that defines the structure (attributes) and behavior (methods) of similar objects. A `Car` class describes what properties and actions all cars will have.
- **Instance**: an object created from a class.
- **Method**: a function defined inside a class that describes a behavior of the object.
- **Attribute**: data stored in the instance (for example, `speed`).

## Fundamental principles (the 4 pillars)

1. **Encapsulation**
   - It consists of grouping data and the methods that operate on that data within a unit (the class) and controlling access to them.
   - It allows hiding the internal representation and exposing only a public interface, reducing dependencies between components.
   - Practical example: use `get()`/`set()` methods or properties instead of accessing internal attributes directly.

2. **Abstraction**
   - It extracts the essential part of an entity, ignoring details irrelevant to the current task.
   - A class represents an abstraction of the real world: it models only what is needed to solve the problem.

3. **Inheritance**
   - A mechanism to define new classes based on existing classes, inheriting attributes and methods.
   - It facilitates reuse and specialization (a `Vehicle` class can be the base for `Car` and `Motorcycle`).
   - It must be used carefully: overusing inheritance can produce rigid hierarchies; often composition is preferable.

4. **Polymorphism**
   - It allows using a common interface for different entities. For example, different classes can implement a `draw()` method and call `draw()` without knowing the concrete class.
   - It manifests as overloading, overriding, or through interfaces/contracts.

## Other important concepts

- **Composition vs Inheritance**: composition consists of building classes using instances of other classes ("has a"), while inheritance is an "is a". Composition is usually more flexible.
- **Visibility / Access modifiers**: `public`, `protected`, `private` (or conventions in languages like Python) control what can be used from outside the class.
- **Constructors and destructors**: special methods to initialize and clean up an instance.
- **Interfaces / Abstract classes**: contracts that define the methods concrete classes must implement.

## Examples (pseudocode / Python)

Simple example with classes, inheritance, and polymorphism:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError()

class Dog(Animal):
    def speak(self):
        return f"{self.name} says: woof"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says: meow"

def make_speak(animal: Animal):
    print(animal.speak())

dog = Dog('Rex')
cat = Cat('Misu')
make_speak(dog)  # Rex says: woof
make_speak(cat)  # Misu says: meow
```

This example shows polymorphism: `make_speak` works with any `Animal`, realizing its behavior according to the actual class.

Composition vs Inheritance (quick example):

```python
class Engine:
    def start(self):
        return 'Engine started'

class Car:
    def __init__(self):
        self.engine = Engine()  # composition: the car has an engine

    def start(self):
        return self.engine.start()

# Alternative: Inherit from Engine (not recommended semantically)
```

## Best practices and recommendations

- Model classes that represent meaningful concepts in the problem domain — avoid classes that accumulate responsibilities (single responsibility principle).
- Prefer composition over inheritance when the relationship is "has a" instead of "is a".
- Keep the public interface minimal (encapsulation).
- Write unit tests for the important behaviors of the classes.
- Follow SOLID principles for large, maintainable object-oriented systems.

## When to use OOP?

- OOP is useful when the problem domain contains natural entities that fit well into models with state and behavior.
- For large, extensible systems, OOP makes it easier to organize and divide responsibilities.
- In very mathematical programs or data transformation, other paradigms (functional or procedural) may be simpler and more suitable.

## Summary

OOP is a paradigm centered on objects that group data and behavior, facilitating modularity, reuse, and maintainability. Its pillars —encapsulation, abstraction, inheritance, and polymorphism— offer tools for modeling complex systems, but they must be used with judgment and good practices (for example, preferring composition when it is convenient).

---

Document created by the documentation team.
