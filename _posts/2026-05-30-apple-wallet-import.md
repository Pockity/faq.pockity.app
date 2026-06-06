---
title: Apple Wallet Automation
layout: base
style: landing
permalink: /entries/apple-wallet/
tags: [entries]
eleventyNavigation:
  key: Apple Wallet Automation
  parent: Entries
  order: 7
toc: true
---

## Apple Wallet Automation

Pockity can automatically capture your Apple Pay transactions as draft entries. Every time you pay with Apple Pay, a Shortcut automation runs silently in the background and saves the transaction to Pockity's **Drafts** tab — ready for you to review, categorise, and confirm at your convenience.

No amount re-typing, no forgotten transactions.

### How it works

When you tap to pay with Apple Pay, iOS fires a "When I tap" automation in the Shortcuts app. That automation passes the transaction details to Pockity, which saves them as a **draft entry** in the Drafts tab. Open Pockity later, review the draft, assign a category if needed, and confirm.

### What Pockity receives from Apple Wallet

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Source</th>
      <th>Used for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Field">Merchant name</td>
      <td data-label="Source">Wallet transaction</td>
      <td data-label="Used for">Entry title &amp; location name</td>
    </tr>
    <tr>
      <td data-label="Field">Amount</td>
      <td data-label="Source">Wallet transaction</td>
      <td data-label="Used for">Entry amount</td>
    </tr>
    <tr>
      <td data-label="Field">Card name</td>
      <td data-label="Source">Wallet transaction</td>
      <td data-label="Used for">Matched to an Account in Pockity</td>
    </tr>
    <tr>
      <td data-label="Field">Your location (optional)</td>
      <td data-label="Source">"Get Current Location" action</td>
      <td data-label="Used for">Attached to the entry as a map pin</td>
    </tr>
  </tbody>
</table>

> **Note:** Apple Wallet does not provide the transaction date — Pockity uses the time the automation runs, which is typically within seconds of the payment.

---

### Setup

This is a one-time setup in the Shortcuts app on your iPhone.

#### Step 1 — Create a Personal Automation

1. Open the **Shortcuts** app on your iPhone.
2. Tap the **Automation** tab at the bottom.
3. Tap the **+** button in the top-right corner.
4. Scroll down and select **Transaction**.
5. Under **When I tap**, select the card(s) you want to track.
6. Tap **Next**.

#### Step 2 — Add the Pockity action

1. Tap **New Blank Automation** (or **Add Action** if prompted).
2. Search for **Pockity** in the action search bar.
3. Select **Save Wallet Transaction as Draft**.
4. The action will appear with the following fields to configure:

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>What to set</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Field"><strong>Merchant Name</strong></td>
      <td data-label="What to set">Tap the field → select **Shortcut Input** → choose **Merchant**</td>
    </tr>
    <tr>
      <td data-label="Field"><strong>Amount</strong></td>
      <td data-label="What to set">Tap the field → select **Shortcut Input** → choose **Amount**</td>
    </tr>
    <tr>
      <td data-label="Field"><strong>Card Name</strong></td>
      <td data-label="What to set">Tap the field → select **Shortcut Input** → choose **Card**</td>
    </tr>
    <tr>
      <td data-label="Field"><strong>Ledger</strong></td>
      <td data-label="What to set">Choose the ledger to save drafts into</td>
    </tr>
    <tr>
      <td data-label="Field"><strong>Category</strong> <em>(optional)</em></td>
      <td data-label="What to set">Pre-select a category, or leave blank to assign later</td>
    </tr>
  </tbody>
</table>

5. Tap **Done**.
6. Turn off **Ask Before Running** so the automation runs silently in the background.

#### Step 3 (Optional) — Attach your location

If you'd like the entry to include a map pin of where you paid:

1. Before the Pockity action, add **Get Current Location**.
2. After that, add **Get Details of Current Location** and set it to return **Latitude**, then repeat for **Longitude**.
3. In the Pockity action, set **Latitude** and **Longitude** to the values from the previous step.

---

### Account matching

Pockity tries to match the card name reported by Apple Wallet (e.g. `"HDFC Credit"` or `"Visa ••4242"`) against your account names in the chosen ledger. If a match is found, the draft is linked to that account automatically.

For the best results, ensure your account name in Pockity contains a word that also appears in the Apple Wallet card label. You can rename accounts in **Settings → Accounts**.

If no match is found, the draft is saved without an account — you can assign one when you review the draft.

---

### Reviewing drafts in Pockity

After a payment, open Pockity and tap **Drafts** in the sidebar or tab bar. Each captured transaction appears as a draft entry with:

- The merchant name as the title
- The payment amount
- The matched account (if found)
- Your location (if configured)

Tap a draft to open it, assign a category, make any edits, and tap **Save** to confirm it as a real entry.

---

### Tips

- **One automation per card** — If you use multiple cards across different ledgers, create a separate automation for each card and point each to the correct ledger.
- **Pre-select a category for recurring merchants** — If you always pay at the same coffee shop, pre-set the Category in the automation to save a step at review time.
- **Drafts don't affect your balances** — Draft entries are invisible to charts, budgets, and totals. They only appear in the Drafts view until you confirm them.
