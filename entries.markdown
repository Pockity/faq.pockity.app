---
layout: home
style: landing
---

## Entries

An **Entry** denotes a financial transaction in the ledger. 

It can be a:
- Payment 
- Transfer 
- Reimbursement (Income)

#### Payments 
Payment entries are always associated with an `Account` and a `Category`. 

The transfer transaction happens like so:
```
          Entry: USD 22.50
Savings Account: Debit USD 22.50
  Food Category: Credit USD 22.50
```

Or effectively:
```
          Entry: $22.50
Savings Account: -$22.50
  Food Category: +$22.50
--------------------------
          Total: 0
--------------------------
```

In a double entry system, the total transaction amount should always result to zero, which is achieved by transfering funds from the Account to the Category. 

In effect, Categories function like an expense account which always get credited. As they are not *owned* by you, the funds transfered to them are no longer available. 


#### Transfers
An account transfer is simply moving funds from one account to another. Their transaction is simple:
```
Savings Account: -$300.00
    Credit Card: +$300.00
--------------------------
          Total: 0
--------------------------
```

Some tips about transfering across accounts are [listed here](/entries/transfers/).

#### Reimbursement 
A reimbursement is an income transaction. It works using a specialised category, `Reimbursements` to account for the double entry system and keep the transaction amount as zero. A transaction would look as follows:
```
         Salary:  $5000.00
 Reimbursements: -$5000.00
Savings Account: +$5000.00
--------------------------
          Total: 0
--------------------------
```

As the user, you never own funds in a category, so transfering from a fixed known category to the desired account effectively gives us a net zero transaction. 

