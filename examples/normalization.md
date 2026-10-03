# Database Normalization

Normalization is a relational database design process that organizes data into tables and columns to reduce **redundancy** and prevent **inconsistencies** when inserting, updating, or deleting records. The goal is to store each piece of data only once and in the right place.

## Why Is It Important?

- Eliminates duplicate data, saving space and preventing errors.
- Ensures **data integrity** (so that contradictions do not occur).
- Simplifies maintenance: changing a piece of data requires updating only one place.
- Prevents insertion, update, and deletion **anomalies**.

## Anomalies in Unnormalized Databases

<table>
	<thead>
		<tr><th>Anomaly</th><th>Description</th><th>Example</th></tr>
	</thead>
	<tbody>
		<tr><td><strong>Insertion</strong></td><td>You cannot save one piece of data without also saving unrelated data.</td><td>You cannot register a customer until they place an order.</td></tr>
		<tr><td><strong>Update</strong></td><td>When duplicate data changes, it must be updated in several places; missing one leaves inconsistent values.</td><td>Changing a customer's phone number requires updating every order where it appears.</td></tr>
		<tr><td><strong>Deletion</strong></td><td>Deleting a record also removes data that should have been kept.</td><td>Deleting a customer's last order also deletes their customer information.</td></tr>
	</tbody>
</table>

## Normal Forms (NF)

There are several normal forms, each with stricter requirements than the previous one. The first three are the most commonly used in practice.

### First Normal Form (1NF)

- Each cell must contain a single atomic value (not a list or set).
- Each record must be uniquely identifiable (with a primary key, `PK`).

**Violation:** a `PhoneNumbers` column storing `"555-1000, 555-2000"`.

### Second Normal Form (2NF)

- It is in 1NF.
- There must be no **partial dependency**: no non-key column may depend on only part of a composite key.

**Violation:** in the `Order(OrderId, CustomerId, CustomerName)` table, `CustomerName` depends on `CustomerId`, not on the complete `OrderId` key.

### Third Normal Form (3NF)

- It is in 2NF.
- There must be no **transitive dependency**: a non-key column cannot depend on another non-key column.

**Violation:** the `Employee(EmployeeId, Department, Location)` table, where `Location` depends on `Department` rather than on the `EmployeeId` key.

### Other Normal Forms

- **BCNF (Boyce-Codd Normal Form)**: a stricter version of 3NF.
- **4NF and 5NF**: address multivalued and join dependencies; they are less commonly used.

## Step-by-Step Process

1. **Identify entities and their attributes** from the requirements.
2. **Define primary keys** for each entity.
3. **Apply 1NF**: split multivalued data into separate rows or tables.
4. **Apply 2NF**: separate attributes that depend on only part of a key.
5. **Apply 3NF**: move attributes that depend on other non-key attributes.
6. **Create related tables** using foreign keys (`FK`).

## Denormalization

Denormalization is the reverse process: **deliberately** introducing redundancy to improve query performance (by avoiding expensive `JOIN`s). It is applied after normalization and only when performance justifies it, accepting the risk of the inconsistencies that normalization had eliminated.

## Short Example

**Before (poorly structured):**

<table>
	<thead>
		<tr><th>Order</th><th>Customer</th><th>Phone Numbers</th></tr>
	</thead>
	<tbody>
		<tr><td>1</td><td>Ana</td><td>"555-1000, 555-2000"</td></tr>
	</tbody>
</table>

**After (normalized):** separate `Customers`, `PhoneNumbers`, and `Orders` tables related by keys, with one phone number per row in `PhoneNumbers`.

## Key Takeaways

- Normalization eliminates redundancy and anomalies at the cost of more tables and `JOIN`s.
- 1NF, 2NF, and 3NF cover most real-world cases.
- Denormalization is a performance decision, not the starting point.