# Cognitive Walkthrough Template

Step-by-step task simulation to catch interaction gaps before implementation.

---

## Setup

Before starting, define:

1. **User:** Who is performing this task? (role, experience level)
2. **Task:** What are they trying to accomplish? (from JTBD statement)
3. **Starting point:** Where does the user begin? (which page, what state)
4. **Success:** How do they know they're done?

---

## Walkthrough Steps

For each step in the task, answer these 4 questions:

### Question 1: Will the user try to achieve the right effect?
> Does the user know what to do next?

- Is the next action obvious from the current view?
- Does the page layout guide them toward the goal?
- Are there distracting elements that might lead them astray?

### Question 2: Will the user notice the correct action is available?
> Can they see the button/link/control they need?

- Is the action visible without scrolling?
- Is it labeled clearly? (matches what user expects)
- Does it look interactive? (AkButton vs plain text)
- Is it in a logical position? (primary action prominent, secondary less so)

### Question 3: Will the user associate the correct action with the desired effect?
> Does the label/icon communicate what will happen?

- Button text describes the outcome? ("Confirm Order" not "Submit")
- Icon is universally understood? (trash = delete, pencil = edit)
- No ambiguous actions? (does "Close" cancel or save?)

### Question 4: After the action, will the user see progress?
> Does the system provide feedback?

- State change visible? (badge color changes, row updates)
- Success confirmation shown? (AkAlert, toast, redirect)
- If multi-step, progress indicator visible?
- If error, specific message with recovery path?

---

## Step Log Format

```
Step [N]: [What user does]
  See: [What's visible on screen]
  Do:  [What they click/type]
  Get: [System response]
  
  Q1 (know what to do?):  Yes / No — [why]
  Q2 (see the control?):  Yes / No — [why]
  Q3 (understand label?):  Yes / No — [why]
  Q4 (see progress?):     Yes / No — [why]
  
  Issue: [describe gap if any "No" answers]
  Fix:   [suggested DS component or layout change]
```

---

## Example Walkthrough

**User:** Seller managing orders
**Task:** Confirm a pending order
**Start:** Order list page
**Success:** Order status changes to "Confirmed"

```
Step 1: Find the pending order
  See: Table with columns: Order ID, Customer, Amount, Status, Date
  Do:  Scan table for "Pending" badge, or filter by status
  Get: Filtered table showing pending orders
  
  Q1: Yes — table is the main content, natural to scan
  Q2: Yes — if status filter exists (AkSelect above table)
  Q3: Yes — "Pending" badge clearly labeled
  Q4: Yes — filtered results appear immediately
  
  Issue: None if filter exists. If no filter → Minor issue for many orders.
  Fix:   Add AkSelect status filter above AkTable.

Step 2: Open the order
  See: Table row with order data
  Do:  Click the row
  Get: Navigate to order detail page
  
  Q1: Yes — rows look clickable (hover style)
  Q2: Maybe — depends on cursor change and hover state
  Q3: Yes — clicking a row to see detail is standard
  Q4: Yes — page navigates to detail
  
  Issue: Row clickability might not be obvious.
  Fix:   AkTable `rowStyles="['hover']"` + cursor pointer.

Step 3: Confirm the order
  See: Order detail with status "Pending" and action buttons
  Do:  Click "Confirm Order" button
  Get: Confirmation modal appears
  
  Q1: Yes — if button is prominently placed
  Q2: Depends — is button above fold? Primary color?
  Q3: Yes — "Confirm Order" is clear
  Q4: Partial — modal is feedback, but hasn't completed yet
  
  Issue: If confirm button buried below product list → Major.
  Fix:   Place AkButton color="primary" in page header area.

Step 4: Confirm in modal
  See: Modal with order summary and Confirm/Cancel
  Do:  Click "Confirm"
  Get: Modal closes, status badge changes to "Confirmed", success alert
  
  Q1: Yes — modal asks explicit question
  Q2: Yes — two clear buttons
  Q3: Yes — "Confirm" is unambiguous
  Q4: Yes — badge changes + AkAlert success message
  
  Issue: None.
```

**Summary:** 1 Minor issue (row clickability), 1 potential Major (button placement). Both fixable with DS component props.

---

## Common Gaps Found

| Gap Type | Frequency | Typical Fix |
|----------|-----------|-------------|
| Missing empty state | Very common | AkAlert type="info" with guidance |
| No loading feedback | Common | AkButton loading prop |
| Unclear clickability | Common | Hover styles, cursor pointer |
| No error recovery | Common | AkAlert type="error" with retry action |
| Action buried below fold | Occasional | Move primary action to page header |
| Ambiguous button labels | Occasional | Use verb + noun ("Confirm Order" not "OK") |
| No confirmation for destructive actions | Occasional | AkModal as confirmation dialog |
