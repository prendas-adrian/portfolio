# ACID (Databases)

ACID is an acronym that defines the **properties of database transactions**. A *transaction* is a sequence of operations executed as a single logical unit: either it completes in full, or none of it is applied. ACID ensures that transactions remain reliable even in the event of failures or concurrent access.

## What Does the Acronym Mean?

<table>
   <thead>
      <tr><th>Letter</th><th>Property</th><th>Meaning</th></tr>
   </thead>
   <tbody>
      <tr><td><strong>A</strong></td><td><strong>Atomicity</strong></td><td>A transaction is all or nothing: if any part fails, all operations already performed are <strong>rolled back</strong>.</td></tr>
      <tr><td><strong>C</strong></td><td><strong>Consistency</strong></td><td>A transaction takes the database from one valid state to another, respecting all rules and invariants.</td></tr>
      <tr><td><strong>I</strong></td><td><strong>Isolation</strong></td><td>Concurrent transactions do not interfere with one another; each behaves as if it were the only transaction running.</td></tr>
      <tr><td><strong>D</strong></td><td><strong>Durability</strong></td><td>Once committed, a transaction persists permanently, even if the system fails or restarts.</td></tr>
   </tbody>
</table>

## Atomicity

- All commands in a transaction are treated as one indivisible block.
- If any operation fails, the database returns to its previous state (rollback).
- Example: a bank transfer requires *two* operations (debiting and crediting), but the system treats them as one: either both happen or neither does.

```sql
BEGIN;
UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- If anything fails before this, ROLLBACK undoes everything
```

## Consistency

- Ensures that defined rules (unique keys, constraints, types, and values) are satisfied before and after every transaction.
- If a transaction violates a constraint, it is rejected and rolled back.
- Example: `CHECK (balance >= 0)` prevents a transaction from leaving a negative balance.

## Isolation

- Protects data integrity when **multiple transactions run concurrently**.
- Without isolation, problems can occur, such as:

<table>
   <thead>
      <tr><th>Problem</th><th>Description</th></tr>
   </thead>
   <tbody>
      <tr><td><strong>Dirty read</strong></td><td>Reading data modified by another transaction that has not yet been committed.</td></tr>
      <tr><td><strong>Non-repeatable read</strong></td><td>Reading the same data twice and getting different values because another transaction modified it in between.</td></tr>
      <tr><td><strong>Phantom read</strong></td><td>New rows inserted by another transaction appear in the result when a query is run again.</td></tr>
   </tbody>
</table>

- *Isolation levels* (Read Uncommitted, Read Committed, Repeatable Read, Serializable) range from permissive to strict, balancing integrity and performance.

## Durability

- After a successful `COMMIT`, changes are stored permanently.
- This is achieved with *transaction logs* (WAL: Write-Ahead Logging), which allow data to be recovered after a power outage or system failure.

## Complete Example

Sales transaction: it must decrease inventory, record the order, and update the customer's balance.

```
1. Check that enough inventory is available     (consistency)
2. Decrease inventory by 1                       (atomicity: part A)
3. Insert the order                              (atomicity: part B)
4. Debit the customer                            (atomicity: part C)
5. COMMIT                                        (durability)
    - If step 3 fails -> ROLLBACK: nothing is saved (atomicity)
    - Another concurrent sale cannot read "half-updated inventory" (isolation)
```

## Summary

- **A**tomicity: all or nothing.
- **C**onsistency: the database remains in a valid state.
- **I**solation: concurrent operations do not interfere.
- **D**urability: committed changes persist.

Together, these four properties make relational databases suitable for applications that require reliability, such as banking, commerce, and reservation systems.