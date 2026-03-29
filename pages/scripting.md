---
title: Scripting & Automation
layout: home
permalink: /scripting/
tags: [tips]
---

## Scripting & Automation

Pockity for macOS supports powerful automation capabilities through AppleScript and the [Model Context Protocol (MCP)](https://modelcontextprotocol.io). This enables you to interact with your financial data using AI applications or custom scripts.

### AppleScript Guide

You can run these scripts using the **Script Editor** app on your Mac, or directly from your terminal using the `osascript` command.

#### 1. List All Your Ledgers
Find out which ledgers you have configured in Pockity.

**AppleScript:**
```applescript
tell application "Pockity"
    return name of every ledger
end tell
```

**Terminal:**
```bash
osascript -e 'tell application "Pockity" to return name of every ledger'
```

#### 2. Check Your Primary Ledger Balance
Get a quick summary of the accounts in your primary ledger.

**AppleScript:**
```applescript
tell application "Pockity"
    tell primary ledger
        repeat with anAccount in every account
            log (get name of anAccount) & ": " & (get balance of anAccount)
        end repeat
    end tell
end tell
```

**Terminal:**
```bash
osascript -e 'tell application "Pockity" to tell primary ledger to get name of every account'
```

#### 3. Log a New Expense (Fast Entry)
Add a new transaction instantly without manually opening the entry editor.

**AppleScript:**
```applescript
tell application "Pockity"
    tell primary ledger
        make new entry with properties {title:"Morning Coffee", amount:4.50, account name:"Pocket", category name:"Food"}
    end tell
end tell
```

**Terminal:**
```bash
osascript -e 'tell application "Pockity" to tell primary ledger to make new entry with properties {title:"Lunch", amount:12.00, account name:"Debit Card", category name:"Food"}'
```

#### 4. Create a Quick Draft
Not sure which category to use yet? Create a draft entry to categorize later in the app.

**AppleScript:**
```applescript
tell application "Pockity"
    tell primary ledger
        make new entry with properties {amount:25.00, is draft:true}
    end tell
end tell
```

**Terminal:**
```bash
osascript -e 'tell application "Pockity" to tell primary ledger to make new entry with properties {amount:25.00, is draft:true}'
```

### Model Context Protocol (MCP)

Pockity also provides an open-source **applescript-mcp** server, enabling you to use Pockity's tools with AI applications.

### Prerequisites

To use MCP scripting with Pockity, you will need:
- **macOS 10.15** or later.
- **Pockity** installed and running on your Mac.
- **Node.js 18** or later installed on your system.

### Setup Guide

#### 1. Install the MCP Server
The scripting server is hosted on GitHub. You can set it up by cloning the repository and building it locally:

```bash
# Clone the repository
git clone https://github.com/pockity/applescript-mcp.git
cd applescript-mcp

# Install dependencies
npm install

# Build the server
npm run build
```

#### 2. Configure your AI Client
To use Pockity's tools with an MCP-compatible AI client (like Claude Desktop), add the server to your `mcp.json` configuration file:

```json
{
  "mcpServers": {
    "pockity-scripting": {
      "command": "node",
      "args": ["/path/to/applescript-mcp/dist/index.js"]
    }
  }
}
```
*Note: Replace `/path/to/applescript-mcp/` with the actual path where you cloned the repository.*

### Available Pockity Tools

Once configured, the following tools become available for Pockity:

<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>pockity_list_ledgers</code></td>
      <td>List all available ledger names and IDs.</td>
    </tr>
    <tr>
      <td><code>pockity_get_accounts</code></td>
      <td>Get all accounts and their balances for a specific ledger.</td>
    </tr>
    <tr>
      <td><code>pockity_get_categories</code></td>
      <td>Get all categories for a ledger.</td>
    </tr>
    <tr>
      <td><code>pockity_get_entries</code></td>
      <td>Retrieve transactions from a ledger (sorted by date).</td>
    </tr>
    <tr>
      <td><code>pockity_create_entry</code></td>
      <td>Create a new, validated transaction in a ledger.</td>
    </tr>
    <tr>
      <td><code>pockity_create_draft_entry</code></td>
      <td>Quickly create a draft entry to be finalized later.</td>
    </tr>
    <tr>
      <td><code>pockity_sum_entries</code></td>
      <td>Compute the total spending or income for a set of entries.</td>
    </tr>
    <tr>
      <td><code>pockity_primary_ledger_summary</code></td>
      <td>Get a quick overview of your primary ledger.</td>
    </tr>
  </tbody>
</table>

### macOS System Automation

Beyond Pockity, the scripting server also enables automation for other macOS applications and system functions:
- **Calendar**: Create and list events.
- **Mail**: Compose and search emails.
- **Messages**: Send and search iMessages.
- **Notes**: Create and retrieve formatted notes.
- **System**: Control volume, dark mode, and launch applications.

### Automation via Apple Shortcuts

You can automate entry creation in Pockity using Apple Shortcuts. A powerful use case is automatically parsing SMS notifications from your bank to create draft entries.

<picture>
  <source srcset="/assets/images/scripting/sms-automation-400w.png 400w, /assets/images/scripting/sms-automation-800w.png 800w, /assets/images/scripting/sms-automation-1200w.png 1200w, /assets/images/scripting/sms-automation-1600w.png 1600w" sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px">
  <img src="/assets/images/scripting/sms-automation.png" alt="Shortcuts Automation for SMS parsing" class="inline"/>
</picture>

#### 1. Private Cloud Compute (Apple Intelligence)
If you are using a model like Private Cloud Compute to parse the SMS, you can use the following prompt:

> Parse the following SMS and extract the following information: currency, amount, date, transactionID (optional), title. 
> 
> 1. The date should be an ISO8601 date. 
> 2. The transactionID could be prefixed with items like: UPI, CC, DEBIT, CREDIT. If it has a prefix, remove the prefix.
> 3. The title or location could be anywhere in this message. The title or location could be in all caps. If it is capitalised, normalise the string. 
> 
> Message: Shortcut Input
>
> _Note: `Shortcut Input` should be replaced with the input token in the Shortcuts editor._

#### 2. AppleScript Integration
To send the parsed data to Pockity, use the **Run AppleScript** action with the following code:

```applescript
use framework "Foundation"
use scripting additions

-- MARK: Helper — safe nil/NSNull check
on isMissingOrNull(val)
	if val is missing value then return true
	-- isKindOfClass: handles NSNull without touching the reserved 'null' word
	return (val's isKindOfClass:(current application's NSNull)) as boolean
end isMissingOrNull

on run {input, parameters}
	set dict to item 1 of input
	set objCDict to current application's NSDictionary's dictionaryWithDictionary:dict
	
	-- MARK: Required — amount
	set amountNS to objCDict's valueForKey:"amount"
	set entryAmount to amountNS's doubleValue() as real
	
	-- MARK: Optional — title
	set titleVal to objCDict's objectForKey:"title"
	if my isMissingOrNull(titleVal) then
		set entryTitle to "Untitled"
	else
		set entryTitle to titleVal as string
	end if
	
	-- MARK: Optional — transactionID
	set txnVal to objCDict's objectForKey:"transactionID"
	if my isMissingOrNull(txnVal) then
		set entryNotes to ""
	else
		set entryNotes to "Transaction ID: " & (txnVal as string)
	end if
	
	-- MARK: Optional — date
	set entryDate to current date
	set dateVal to objCDict's objectForKey:"date"
	if not my isMissingOrNull(dateVal) then
		set formatter to current application's NSDateFormatter's new()
		repeat with fmt in {"yyyy-MM-dd'T'HH:mm:ssZ", "yyyy-MM-dd'T'HH:mm:ss", "yyyy-MM-dd"}
			(formatter's setDateFormat:fmt)
			set parsed to (formatter's dateFromString:(dateVal as string))
			if parsed is not missing value then
				set entryDate to parsed as date
				exit repeat
			end if
		end repeat
	end if
	
	-- MARK: Create entry in Pockity
	tell application "Pockity"
		tell primary ledger
			if entryNotes is "" then
				make new entry with properties {title:entryTitle, amount:entryAmount, date:entryDate, account name:"Savings", is draft:true}
			else
				make new entry with properties {title:entryTitle, amount:entryAmount, date:entryDate, notes:entryNotes, account name:"Savings", is draft:true}
			end if
		end tell
	end tell
	
end run
```

> **Note**: In the AppleScript code above, ensure you replace `"Savings"` with the actual name of the account you wish to use, and ensure you are targeting the correct ledger (e.g., `primary ledger` or a specific ledger by name).

#### 3. Message Automation

On macOS, you can set up automations that trigger when you receive a message (SMS or iMessage).

<picture>
  <source srcset="/assets/images/scripting/sms-automation-2-400w.png 400w, /assets/images/scripting/sms-automation-2-800w.png 800w, /assets/images/scripting/sms-automation-2-1200w.png 1200w, /assets/images/scripting/sms-automation-2-1600w.png 1600w" sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px">
  <img src="/assets/images/scripting/sms-automation-2.png" alt="Shortcuts Automation Tab" class="inline"/>
</picture>

1. Open the **Shortcuts** app on your Mac and navigate to the **Automation** tab.
2. Click the **+** (plus) button to create a new automation.
3. Select **Message** as the trigger.

<picture>
  <source srcset="/assets/images/scripting/sms-automation-3-400w.png 400w, /assets/images/scripting/sms-automation-3-800w.png 800w, /assets/images/scripting/sms-automation-3-1200w.png 1200w, /assets/images/scripting/sms-automation-3-1600w.png 1600w" sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px">
  <img src="/assets/images/scripting/sms-automation-3.png" alt="Message Trigger Configuration" class="inline"/>
</picture>

4. Configure the trigger:
   - **Sender**: You can specify a sender or leave it as "Any Sender".
   - **Message Contains**: Enter a unique identifier that appears in your bank's SMS (e.g., the last 4 digits of your account or card).
5. Select **Run Immediately** to ensure the automation runs in the background without requiring manual confirmation.
6. Click **Done** and then select the Shortcut you created to handle the parsing.

### Permissions & Security

For scripting to work, you must grant **Automation** permissions to the process running the MCP server (e.g., your Terminal or AI application).

1. Open **System Settings** on your Mac.
2. Navigate to **Privacy & Security** → **Automation**.
3. Ensure that the relevant application has permission to control **Pockity**.

### Resources
- **GitHub Repository**: [pockity/applescript-mcp](https://github.com/pockity/applescript-mcp)
- **Issue Tracker**: Report bugs or request features on the [GitHub issues page](https://github.com/pockity/applescript-mcp/issues).

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>

<!-- and it's easy to individually load additional languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/applescript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/json.min.js"></script>

<script>hljs.highlightAll();</script>
