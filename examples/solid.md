# SOLID

SOLID is a set of five principles of object-oriented software design. Its goal is to help create clearer, more flexible, easier-to-maintain systems that are less prone to errors as the project grows.

It was popularized by Robert C. Martin, also known as Uncle Bob, and each letter of the word SOLID represents a different principle:

- S: Single Responsibility Principle
- O: Open/Closed Principle
- L: Liskov Substitution Principle
- I: Interface Segregation Principle
- D: Dependency Inversion Principle

The central idea is simple: if we organize responsibilities well and reduce coupling between components, the software will be much easier to understand, test, and modify.

---

## 1. Single Responsibility Principle (SRP)

### Statement
A class should have only one reason to change.

### Explanation
This means that a class should not handle too many different things. If a class does several tasks at once, any change to one of them can affect the others.

For example, a class that:

- validates users,
- saves to the database,
- sends emails,
- generates files,
- computes statistics,

is doing too many things. Instead, it is better to split those responsibilities across several classes.

### Example
```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class RegistrationService:
    def register(self, user):
        print(f"Registering {user.name}")

class EmailSender:
    def send_welcome(self, user):
        print(f"Email sent to {user.email}")
```

Each class has a clear responsibility.

### Benefits
- more readable code,
- less coupling,
- less risky changes,
- simpler tests.

---

## 2. Open/Closed Principle (OCP)

### Statement
Software entities should be open for extension, but closed for modification.

### Explanation
This means we should be able to add new functionality without changing already existing and working code. Instead of rewriting a class every time a new case appears, we aim to extend behavior through new implementations.

### Example
```python
class PaymentProcessor:
    def pay(self, method, amount):
        if method == "card":
            print("Pay by card")
        elif method == "cash":
            print("Pay by cash")
        else:
            raise ValueError("Unsupported method")
```

This approach fails when we want to add PayPal or bank transfer, because we would have to modify this very class.

A better solution is to use abstractions:

```python
class PaymentMethod:
    def pay(self, amount):
        raise NotImplementedError

class Card(PaymentMethod):
    def pay(self, amount):
        print(f"Pay by card: {amount}")

class PayPal(PaymentMethod):
    def pay(self, amount):
        print(f"Pay by PayPal: {amount}")
```

Now you can add new payment methods without touching the existing logic.

### Benefits
- reduces risks when modifying old code,
- eases system evolution,
- improves reuse.

---

## 3. Liskov Substitution Principle (LSP)

### Statement
Objects of a base class should be substitutable by objects of a derived class without altering the correctness of the program.

### Explanation
If a child class inherits from another, it must not break the expected behavior of the parent class. In other words, the subclass must fulfill the superclass contract.

### Problematic example
```python
class Bird:
    def fly(self):
        pass

class Eagle(Bird):
    def fly(self):
        print("The eagle flies")

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins cannot fly")
```

Here `Penguin` is a subclass of `Bird`, but it cannot fulfill the same expectation: the superclass says all birds fly, and that is not true for penguins.

### Solution
Design the class hierarchy correctly, separating concepts that are not equivalent.

```python
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        pass

class Eagle(FlyingBird):
    def fly(self):
        print("The eagle flies")

class Penguin(Bird):
    pass
```

### Benefits
- improves design coherence,
- reduces hidden errors,
- makes the use of inheritance safer.

---

## 4. Interface Segregation Principle (ISP)

### Statement
A client should not depend on interfaces it does not use.

### Explanation
When an interface contains too many methods, the classes that implement it are forced to define things they do not need. This generates unnecessary, repetitive, and hard-to-maintain code.

### Problematic example
```python
class MultifunctionDevice:
    def print(self):
        pass

    def scan(self):
        pass

    def fax(self):
        pass
```

If a printer can only print, but cannot scan or fax, it is forced to implement methods it does not need.

### Solution
Split interfaces into smaller, more specific ones:

```python
class Printer:
    def print(self):
        pass

class Scanner:
    def scan(self):
        pass
```

### Benefits
- less unnecessary code,
- more cohesive classes,
- less coupling.

---

## 5. Dependency Inversion Principle (DIP)

### Statement
High-level modules should not depend on low-level modules; both should depend on abstractions. In addition, abstractions should not depend on details; details should depend on abstractions.

### Explanation
Instead of depending directly on concrete classes, the code should depend on interfaces or abstract contracts. This way, you can change the implementation without breaking business logic.

### Problematic example
```python
class MySQLDatabase:
    def save(self, data):
        print("Saving to MySQL")

class UserService:
    def __init__(self):
        self.database = MySQLDatabase()

    def register(self, user):
        self.database.save(user)
```

This class depends directly on MySQL. If later you want to use PostgreSQL or an in-memory database, you will have to modify the service.

### Solution
```python
class Repository:
    def save(self, data):
        raise NotImplementedError

class MySQLDatabase(Repository):
    def save(self, data):
        print("Saving to MySQL")

class PostgresDatabase(Repository):
    def save(self, data):
        print("Saving to PostgreSQL")

class UserService:
    def __init__(self, repository: Repository):
        self.repository = repository

    def register(self, user):
        self.repository.save(user)
```

Now `UserService` depends on an abstraction rather than on a concrete implementation.

### Benefits
- less coupling,
- more flexibility,
- better testability,
- safer infrastructure changes.

---

## Why is SOLID important?

SOLID helps create software that is:

- more maintainable,
- easier to understand,
- easier to extend,
- less fragile to changes,
- safer to refactor.

When a project grows, without clear principles, the code becomes hard to modify, responsibilities get mixed up, and errors that are difficult to locate appear.

---

## Quick summary

- SRP: a class should have a single responsibility.
- OCP: open for extension, closed for modification.
- LSP: the subclass must respect the superclass contract.
- ISP: do not force implementing unnecessary methods.
- DIP: depend on abstractions, not on concrete implementations.

---

## In one sentence

SOLID is not just a set of theoretical rules; it is a guide for writing cleaner, more robust software that is ready for change.

When applied well, it produces more professional, scalable, and easier-to-maintain systems in the long run.
