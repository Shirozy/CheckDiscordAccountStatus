# Discord Account Checker

A Node.js script to check the validity of Discord accounts using tokens. The script can handle either **token-only accounts** or **full account credentials** (`email:password:token`) and generates a detailed report of valid accounts.

---

## ⚠️ Disclaimer

This script uses a selfbot library (`discord.js-selfbot-v13`). **Selfbots violate Discord's Terms of Service**. Use this tool **at your own risk**. The author is not responsible for any account bans or other consequences.

---

## Features
* Generates a **detailed JSON report** including:

  * Username, discriminator, and display name
  * Account ID, tag, and avatar/banner URLs
  * Account creation date
  * Bot status and public flags
  * Guild information (IDs, names, member counts)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Shirozy/CheckDiscordAccountStatus
cd CheckDiscordAccountStatus
```

2. Install dependencies:

```bash
npm install discord.js-selfbot-v13
```

3. Create a file named `discordaccounts.txt` in the project root.

   * **Token-only format:**

     ```
     token1
     token2
     ```
   * **Full credentials format:**

     ```
     email1:password1:token1
     email2:password2:token2
     ```

---

## Usage

Run the script:

```bash
node index.js
```

* **Outputs:**

  * `valid_accounts.txt` – all valid accounts
  * `invalid_accounts.txt` – all invalid accounts
  * `accounts_report.json` – detailed JSON report of valid accounts

---

## Example Output

```
Account valid: example@email.com
Display Name: ExampleUser
Username: ExampleUser#1234
Guilds: 5
...
```
---
## Overview

```
discordaccounts.txt
        │
        ▼
  Read & Parse Lines
        │
        ▼
  Check Each Account
   ┌───────────────┐
   │   Valid?      │
   ├───────┬───────┤
   │ Yes   │  No   │
   ▼       ▼       ▼
Save to   Save to  Skip
valid_    invalid_
accounts  accounts
.txt      .txt
        │
        ▼
 Generate JSON Report
(accounts_report.json)
```
---

## Notes

* Make sure your `discordaccounts.txt` file does not contain empty lines.
* The script logs each account validation result to the console.
* The JSON report includes all relevant user and guild details for valid accounts.
