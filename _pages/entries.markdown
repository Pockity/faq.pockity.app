---
title: Entries
layout: home
permalink: /entries/
categories: entries
---

## Entries

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/assets/images/entries/header-dark.jpg 1x, /assets/images/entries/header-dark@2x.jpg 2x, /assets/images/entries/header-dark@3x.jpg 3x">
  <img src="/assets/images/entries/header.jpg" srcset="/assets/images/entries/header@2x.jpg 2x, /assets/images/entries/header@3x.jpg 3x" width="712" height="150" alt="Graphical representation of Pockity's entries"/>
</picture>

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

In a double entry system, the total transaction amount should always result to zero, which is achieved by transferring funds from the Account to the Category. 

In effect, Categories function like an expense account which always get credited. As they are not *owned* by you, the funds transferred to them are no longer available. 


#### Transfers
An account transfer is simply moving funds from one account to another. Their transaction is simple:
```
Savings Account: -$300.00
    Credit Card: +$300.00
--------------------------
          Total: 0
--------------------------
```

Some tips about transferring across accounts are [listed here](/entries/transfers/).

#### Reimbursement 
A reimbursement is an income transaction. It works using a specialized category, `Reimbursements` to account for the double entry system and keep the transaction amount as zero. A transaction would look as follows:
```
         Salary:  $5000.00
 Reimbursements: -$5000.00
Savings Account: +$5000.00
--------------------------
          Total: 0
--------------------------
```

As the user, you never own funds in a category, so transferring from a fixed known category to the desired account effectively gives us a net zero transaction. 

