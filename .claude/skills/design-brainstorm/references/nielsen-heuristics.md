# Nielsen Heuristics — Adapted for Ankorstore DS

10 usability principles scored against available DS components. Use as a checklist during the "Audit usability" phase.

---

## Scoring

For each heuristic, rate the design:
- **Pass** — No issues found
- **Minor** — Usable but could be better
- **Major** — Users will struggle or fail

Focus fixes on Major issues first. Minor issues are polish for later.

---

## 1. Visibility of System Status

> The system should always keep users informed about what is going on.

**Check:**
- Current page/section is highlighted in sidebar navigation?
- Loading states shown while data appears? (AkButton `loading` prop)
- Status of items is visible? (AkBadge with color-coded status)
- After user action, is there confirmation? (AkAlert type="success")
- Active filters/selections are visible?

**DS Components:** AkBadge, AkAlert, AkButton (loading), AkBreadcrumb

---

## 2. Match Between System and Real World

> Use words, phrases, and concepts familiar to the user.

**Check:**
- Labels use business terms the user knows? (not database field names)
- Dates in user's format? (not ISO timestamps)
- Currency formatted correctly?
- Status labels match what users say in conversation? ("Shipped" not "status_3")
- Icons match common expectations?

**DS Components:** AkBadge (content text), column labels in AkTable

---

## 3. User Control and Freedom

> Users often choose functions by mistake. Support undo and exit.

**Check:**
- Cancel button on every form/modal? (AkModal `cancelButtonText`)
- Back navigation available? (AkBreadcrumb, browser back works)
- Destructive actions require confirmation? (AkModal as confirmation dialog)
- Filters can be cleared? (reset button or clear icon)
- Multi-step processes allow going back?

**DS Components:** AkModal, AkButton, AkBreadcrumb

---

## 4. Consistency and Standards

> Users shouldn't wonder whether different words, situations, or actions mean the same thing.

**Check:**
- Same status uses same AkBadge color across all pages?
- Primary action always uses AkButton `color="primary"`?
- Table patterns consistent? (same column alignment, row styles)
- Page layout follows same structure as existing pages?
- Terminology consistent? (don't mix "order" and "purchase")

**DS Components:** All — check consistency in usage across pages

---

## 5. Error Prevention

> Prevent problems from occurring in the first place.

**Check:**
- Required fields marked with `required` prop on AkInput?
- AkSelect used instead of free text where options are limited?
- Destructive actions (delete, cancel order) have confirmation modal?
- Form validates before submission? (AkInput validation states)
- Dangerous buttons use `color="error"` to signal risk?

**DS Components:** AkInput (required, validation), AkSelect, AkModal, AkButton (color="error")

---

## 6. Recognition Rather Than Recall

> Minimize memory load. Make options and actions visible.

**Check:**
- Navigation shows all available sections? (sidebar items visible)
- Filter options shown as AkSelect dropdowns (not typed from memory)?
- Status meanings explained via color + text (not color alone)?
- Recently viewed/used items accessible?
- Search has placeholder text hinting what to search?

**DS Components:** AkSelect, AkInput (placeholder), AkBadge (content + color), sidebar nav

---

## 7. Flexibility and Efficiency of Use

> Accelerators for expert users without confusing beginners.

**Check:**
- Tables sortable by clicking column headers?
- Keyboard shortcuts for common actions? (often N/A for prototypes)
- Bulk actions available for power users? (select multiple rows)
- Filters remember previous selection?
- Quick search/filter available for long lists?

**DS Components:** AkTable (sortable columns), AkInput (search), AkPagination

---

## 8. Aesthetic and Minimalist Design

> Every extra unit of information competes with relevant information.

**Check:**
- Every element on the page serves the user's goal?
- Secondary info is de-emphasized? (smaller text, muted color `var(--neutral-700)`)
- White space used effectively? (spacing tokens between sections)
- No redundant labels? (don't label a table "Table of Orders" if page title says "Orders")
- Cards/sections don't repeat information?

**DS Components:** Design tokens (spacing, typography), AkCard for grouping

---

## 9. Help Users Recognize, Diagnose, and Recover from Errors

> Error messages should be in plain language, indicate the problem, and suggest a solution.

**Check:**
- Error messages are specific? ("Email format is invalid" not "Error")
- AkAlert `type="error"` used for error states?
- Empty states are helpful? (AkAlert `type="info"` with guidance)
- Form validation shows which field has the problem?
- Failed actions suggest what to do next?

**DS Components:** AkAlert (type="error", type="info"), AkInput (error state)

---

## 10. Help and Documentation

> Best if system is usable without docs, but provide help when needed.

**Check:**
- Complex features have inline explanation?
- Tooltips on non-obvious icons or actions?
- First-time experience guides the user?
- Help text on form fields where input format matters?
- Contact/support link available if user is stuck?

**DS Components:** AkInput (helper text), AkTooltip, AkAlert (type="info")

---

## Scorecard Template

```
Page: [name]
Date: [date]
Mode: [full|improve]

| # | Heuristic | Score | Notes |
|---|-----------|-------|-------|
| 1 | Status visibility | | |
| 2 | Match real world | | |
| 3 | User control | | |
| 4 | Consistency | | |
| 5 | Error prevention | | |
| 6 | Recognition > recall | | |
| 7 | Flexibility | | |
| 8 | Minimal design | | |
| 9 | Error recovery | | |
| 10 | Help | | |

Major issues: [count]
Minor issues: [count]
Top priority fix: [description]
```
