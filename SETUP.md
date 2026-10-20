# RSS Survey Assistant: Setup Guide

This pack contains:

- **RSS_Level3_Template.docx**: the Level 3 Building Survey template, laid out in boxes. The boxes are blank, with labels down the left showing what goes where, so nothing prints unless you put it there. The condition label in each box is a drop-down. It works on its own, and works best with the add-in.
- **addin/**: the Word add-in. It adds an **RSS** tab to the Word ribbon, with buttons that open the sidebar.
- **source/**: the scripts that build the template, for your developer.

The RSS ribbon tab has five buttons, matching the sidebar's tabs:

| Button | What it does |
|---|---|
| Insert sections | Inserts a chapter or an element box at the cursor, including custom elements for a second roof or another elevation. **Add photos** lets you pick any number of photos and drops them into the element's photo boxes, adding rows as needed. |
| Condition labels | Sets the condition label for the box you're in, in colour. Update summary builds the table in section B2. |
| Standard wording | Searchable standard wording: limitations, property age, services, environmental, legal, health and safety. Click inside a box, then click the wording to drop it in. |
| AI Writer | Paste or dictate site notes for one element, or **all your notes for the whole job**, and get drafts in house style with suggested labels. Check them in the preview, then put them straight into the boxes, including the overall opinion and limitations. Also rewrites selected text. |
| Check report | Finds empty text boxes, elements without a label, and words to avoid (good, cheap, binoculars, floor area, valuation, dashes). **Tidy for PDF** removes empty photo rows. |

---

## Step 1: Host the add-in files (once, about 15 minutes)

Word loads the sidebar from a web address, so the files in **addin/** need to be online. GitHub Pages is free.

1. Create a free account at github.com.
2. Create a new public repository called **rss-addin**.
3. Click **Add file > Upload files** and upload everything inside the **addin/** folder (not the folder itself).
4. Go to **Settings > Pages**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
5. After a minute, your add-in lives at `https://YOUR-GITHUB-NAME.github.io/rss-addin/taskpane.html`. Open that link to check it loads.
6. Open **manifest.xml** in Notepad (or TextEdit), use Find and Replace to change every `YOUR-NAME` to your GitHub name, and save. Upload the edited manifest.xml to the repository too.

Your developer can host it anywhere else with HTTPS instead.

## Step 2: Install it in Word

**Word on the web** (easiest, works on any computer):
Open a document at office.com, click **Add-ins** on the Home tab, then **More Add-ins > My Add-ins > Upload My Add-in**, and choose manifest.xml.

**Word on Mac:**
1. In Finder, press Cmd+Shift+G and go to `~/Library/Containers/com.microsoft.Word/Data/Documents/`
2. Create a folder called **wef** if it isn't there, and copy manifest.xml into it.
3. Restart Word. Click **Add-ins** on the Home tab, and RSS Survey Assistant appears under My Add-ins.

**Word on Windows:**
1. Put manifest.xml in a folder, right-click the folder, **Properties > Sharing > Share**, and copy the network path (e.g. `\\YOUR-PC\addins`).
2. In Word: **File > Options > Trust Center > Trust Center Settings > Trusted Add-in Catalogs**. Paste the network path, click **Add catalog**, tick **Show in Menu**, OK.
3. Restart Word. **Home > Add-ins > Advanced > Shared Folder**, choose RSS Survey Assistant.

Once installed, an **RSS** tab appears on the Word ribbon.

## Step 3: Turn on the AI Writer

1. Go to console.anthropic.com, sign in, add a payment card and create an API key. This is billed separately from a Claude subscription, by usage. Drafting a section typically costs around a penny.
2. On the RSS tab, click **AI Writer**, open **AI settings**, paste the key and click **Save settings**.

The key is stored only in Word on that computer. Don't share a manifest or computer set up with your key.

## Writing a report

1. Open **RSS_Level3_Template.docx** and save a copy for the job.
2. Click in any blank box and type. For photos, click inside the element's box and use **Add photos** (any number, never cropped). Without the add-in, drag a photo into a photo box or use **Insert > Pictures**, and Word fits it to the box. Press Tab in the last photo box to add another row. Each photo box has a caption line underneath.
3. Either type into each element, insert standard wording, use **AI Writer > Draft from notes** one element at a time, or paste all your notes into **Whole report** (start each element with its code, e.g. "D2 ...") and press **Draft whole report**, then **Put all into report**.
4. Set each element's label from the drop-down in its box, or from **Condition labels**.
5. Click **Update summary**, then **Check report**, and fix anything listed or highlighted.
6. Click **Tidy for PDF** to remove empty photo rows, right-click the contents page and choose **Update Field**, then save as PDF.

## Changing the content

Everything the sidebar uses (chapters, elements, labels and colours, standard wording, AI house rules) is in **addin/data.js**. Edit the text, upload the file again, and every copy of the sidebar picks up the change next time Word opens.

If you change chapters, elements or labels, rebuild the template and the add-in's boxes with `node source/build.js && python3 source/post.py`, run from the source folder with the addin folder next to it. This rewrites the template and **addin/ooxml.js**; upload the new ooxml.js too.

## Giving it away and charging for AI

The plan: the add-in and template are free, and surveyors pay only for AI use.

- **Free add-in:** list it on Microsoft AppSource so any surveyor can install it from Word in one click. Microsoft needs a privacy policy, terms of use and a review, which takes a few weeks. Everything except the AI Writer works without payment.
- **AI credits:** sell credit packs through Lemon Squeezy, which handles UK and EU VAT and issues a licence key with each purchase.
- **Small server:** holds your Claude API key, checks the buyer's licence key and credit balance, deducts credits and passes requests to Claude. In the sidebar, "Claude API key" becomes "Licence key", and the AI Writer sends requests to your server instead of straight to Claude. When credits run out, the key stops working until they top up.
- **Template:** carries no RICS branding, so it can be given away under the RSS name, which promotes the standard every time it's used.

Have a developer check the server and payments before you take money.
