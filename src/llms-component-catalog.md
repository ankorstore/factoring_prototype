# LLM Context - Ankorstore Design System

This file consolidates important documentation for LLM assistants working with the Ankorstore Design System.

---

# 1. Quick Reference

## Component Naming Convention
All components follow the "Ak" prefix (Ankorstore) followed by a descriptive name in PascalCase.

## Import & Usage Basics
Components are exported from the main index file and can be imported individually:

```javascript
import { AkButton, AkModal, AkProductCard } from '@ankorstore/design-system'
```

Or imported as needed in your Vue templates after registering the component library plugin.

## Key Principles
- **Atomic Design**: Components organized as Atoms → Molecules → Organisms → Templates → Layouts
- **CSS Custom Properties**: DS components use internal CSS classes compiled in `design-system.css`. **Do NOT use `ds-` prefixed utility classes in templates**. Instead, use CSS custom properties from `src/styles/design-tokens.css` (e.g., `var(--space-4)`, `var(--radius-md)`, `var(--primary)`). Tailwind is NOT installed.
- **TypeScript**: Full TypeScript support with exported interfaces and types

---

# 2. Component Catalog

## 2.1 Component Categories & Overview

### Atoms (Basic Building Blocks)
Basic UI elements that cannot be broken down further.

### Molecules (Simple Combinations)
Groups of atoms that function together as a unit.

### Organisms (Complex Components)
Groups of molecules and atoms that form relatively complex UI components.

### Templates (Page Layouts)
Page-level objects that place components in a layout.

### Layouts (Application Structure)
High-level application layout components.

## 2.2 Complete Component List

### 🔹 Atoms

#### Form Controls
- **AkCheckbox** - Checkbox input with customizable styling and validation states
- **AkRadio** - Radio button input component
- **AkSelect** - Dropdown select with keyboard navigation and advanced features
- **AkToggle** - Toggle switch component
- **AkToggleV2** - Updated version of toggle switch

#### Content Display
- **AkBox** - Generic container component for layout
- **AkBreadcrumb** - Navigation breadcrumb component
- **AkDot** - Small dot indicator
- **AkHeading** - Base heading component
- **AkHighlight** - Text highlighting component
- **AkIcon** - Icon component using icon font system
- **AkInfoNugget** - Small informational component
- **AkLink** - Styled link component
- **AkParagraph** - Text paragraph component
- **AkPill** - Small pill-shaped indicator
- **AkRoundedButton** - Circular button with tooltip functionality
- **AkRoundedPicture** - Circular image component
- **AkSkeleton** - Loading skeleton placeholder
- **AkStepper** - Step indicator component
- **AkTable** - Table component for data display

#### Logo Components
- **AkFulfillment** - Fulfillment service logo
- **AkLogistics** - Logistics service logo
- **AkLogoAKS** - Main Ankorstore logo
- **AkLogoAKSBadge** - Ankorstore logo with badge
- **AkLogoAKSPlus** - Ankorstore Plus logo
- **AkLogoAKSSymbol** - Ankorstore symbol only
- **AkLogoBETA** - Beta indicator logo
- **AkShipping** - Shipping service logo

### 🔹 Molecules

#### Interactive Components
- **AkButton** - Primary button component with extensive customization options
- **AkInput** - Text input field with validation states and icons
- **AkTextarea** - Multi-line text input
- **AkAutocomplete** - Auto-completing input field
- **AkDatePicker** - Date selection component
- **AkMultiSelect** - Multi-selection dropdown
- **AkInputDropdown** - Input with dropdown functionality

#### Feedback & Messaging
- **AkAlert** - Contextual feedback messages (success, error, warning, info)
- **AkBanner** - Promotional or informational banner
- **AkToaster** - Toast notification system
- **AkStickyBanner** - Sticky positioned banner

#### Layout & Navigation
- **AkModal** - Modal dialog with extensive customization
- **AkDrawer** - Sliding drawer component
- **AkTabBar** - Tab navigation bar
- **AkTabBarItem** - Individual tab item
- **AkSteps** - Step-by-step process indicator

#### Content Display
- **AkBadge** - Status badges with icons and color schemes
- **AkTag** - Tagging component
- **AkCounter** - Numeric counter component
- **AkTestimonial** - Customer testimonial display
- **AkTextMark** - Text marking/highlighting

#### Form Components
- **AkField** - Form field wrapper with label and validation
- **AkFieldError** - Field error message display
- **AkFieldLabel** - Field label component
- **AkFieldWarning** - Field warning message display
- **AkFormLineNumber** - Form line wrapper with input dropdown and validation

#### Tree Components
- **AkCheckboxTree** - Hierarchical checkbox tree
- **AkCheckboxTreeItem** - Individual checkbox tree item
- **AkRadioTree** - Hierarchical radio button tree
- **AkRadioTreeItem** - Individual radio tree item
- **AkRadioLinkTreeItem** - Radio tree item with link functionality

#### Navigation Components
- **AkNavItemAccordion** - Accordion-style navigation item
- **AkNavItemHeader** - Navigation header item
- **AkNavItemLink** - Navigation link item
- **AkNavMenuChildren** - Navigation menu children container
- **AkNavMenuItemLabel** - Navigation menu item label
- **AkNavMenuTemplate** - Navigation menu template
- **AkNavSubCategory** - Navigation sub-category

#### Filter Components
- **AkDropdownFilter** - Dropdown filtering component
- **AkExpandFilter** - Expandable filter section
- **AkSelectFilterCheckbox** - Checkbox-based filter selection

#### File Management
- **AkFileUploader** - File upload component
- **AkMediaUploader** - Media file upload component
- **AkUploadedFile** - Display component for uploaded files
- **AkUploadedMedia** - Display component for uploaded media

#### Tooltip Components
- **AkTooltipInformation** - Informational tooltip
- **AkTooltipMenu** - Tooltip with menu functionality
- **AkTooltipMenuList** - Tooltip menu list container
- **AkTooltipMenuListItem** - Individual tooltip menu item

#### Other
- **AkCarouselController** - Carousel navigation controls
- **AkFavorite** - Favorite/bookmark toggle
- **AkLeadIcon** - Lead indicator icon

#### Heading Components
- **AkHeading1** - Level 1 heading
- **AkHeading2** - Level 2 heading  
- **AkHeading3** - Level 3 heading
- **AkHeading4** - Level 4 heading
- **AkAccountHeading1** - Account-specific level 1 heading
- **AkAccountHeading2** - Account-specific level 2 heading
- **AkAccountHeading3** - Account-specific level 3 heading
- **AkAccountHeading4** - Account-specific level 4 heading

#### Footer Components
- **AkFooterInlineListIcons** - Inline list of footer icons
- **AkFooterInlineListLinks** - Inline list of footer links
- **AkFooterInlineListLogos** - Inline list of footer logos
- **AkFooterLanguageSwitcher** - Language switching component
- **AkFooterListLinks** - Vertical list of footer links
- **AkFooterLogos** - Footer logos display

### 🔹 Organisms

#### Product Display
- **AkProductCard** - Complex product display card with selection, favorites, and pricing
- **AkProductCardV2** - Updated version of product card
- **AkProductCardLight** - Lightweight version of product card
- **AkBrandCard** - Brand information card

#### Content Sections
- **AkArticle** - Article content display
- **AkHeroBanner** - Hero section banner
- **AkInfoCard** - Informational card component

#### Navigation
- **AkNavBar** - Main navigation bar
- **AkNavigation** - Primary navigation component
- **AkNavItem** - Individual navigation item
- **AkNavMenu** - Navigation menu
- **AkNavMenuColumn** - Navigation menu column layout

#### Form & Selection
- **AkCheckboxCard** - Card component with integrated checkbox and collapsible content sections
- **AkFormLines** - Container component for form sections with header, badge, tooltip, and collapsible content
- **AkFormLineNumber** - Number input component with dropdown options, validation, and formatting

#### Interactive
- **AkCarousel** - Image/content carousel
- **AkCarouselItem** - Individual carousel item
- **AkPagination** - Pagination controls
- **AkInputTags** - Tag input management

### 🔹 Templates

#### Page Layouts
- **AkAccountGrid** - Grid layout for account pages
- **AkFooter** - Site footer template
- **AkRecommendationLayout** - Product recommendation layout

### 🔹 Layouts

#### Application Structure
- **AkLayoutError** - Error page layout

### 🔹 Transitions

#### Animation Components
- **AkClosable** - Closable animation wrapper

### 🔹 SVG Components

#### Special Graphics
- **SVGButtonLoader** - SVG-based button loading indicator

---

# 3. Component Details & Usage

## AkButton - Button Component

### Description & Purpose
Primary button component with extensive customization options including multiple colors, sizes, icons, and states.

### Props & Types
```typescript
type AkButtonColor = "primary" | "error" | "white" | "success" | "success-alt" | "orderpay"
type AkButtonSize = "md" | "lg" | "xl"
type AkButtonType = "button" | "submit" | "reset"

interface Props {
  outlined: boolean (default: false)
  link: boolean (default: false)
  size: AkButtonSize (default: "md")
  symbol: string | null (default: null)
  onlyIcon: boolean (default: false)
  symbolPosition: "left" | "right" (default: "left")
  loading: boolean (default: false)
  color: AkButtonColor (default: "primary")
  disabled: boolean (default: false)
  type: AkButtonType (default: "button")
  multiline: boolean (default: false)
}
```

### Usage Examples
```vue
<!-- Primary button with all props -->
<AkButton
  color="primary"
  size="md"
  type="button"
  :outlined="false"
  :link="false"
  :onlyIcon="false"
  :loading="false"
  :disabled="false"
  :multiline="false"
  symbol="plus"
  symbolPosition="left"
  @click="handleClick"
>
  Button Text
</AkButton>

<!-- Icon-only button -->
<AkButton
  onlyIcon
  symbol="edit"
  size="lg"
  color="white"
  outlined
/>

<!-- Loading state button -->
<AkButton
  loading
  color="success"
  size="xl"
>
  Processing...
</AkButton>

<!-- OrderPay themed button -->
<AkButton
  color="orderpay"
  size="lg"
  symbol="credit-card"
  symbolPosition="right"
>
  Pay Now
</AkButton>
```

### When to use `outlined`

`outlined` is a **boolean flag**, not a variant name. The button has only two visual weights: filled (default) and outlined. There is **no** `variant` prop — do not write `variant="secondary"` or `variant="outline"`.

| Use case | Style | Example |
|---|---|---|
| Single main action of page/section/wizard step | Filled (no flag) | `<AkButton color="primary">Save</AkButton>` |
| Cancel, Back, Replace, Copy, "finish later", any secondary | Outlined | `<AkButton outlined>Cancel</AkButton>` |
| Destructive action where user is committing | Filled error | `<AkButton color="error">Delete</AkButton>` |
| Destructive action that dismisses | Outlined | `<AkButton outlined>Cancel</AkButton>` |

**Vocabulary map** — when a request uses any of these words, reach for `outlined`:
- "secondary button", "outline button", "outlined button"
- "ghost button", "tertiary button"
- "cancel-style button", "back button", "subdued button"

**Pairing rule:** when two actions sit side by side in an action bar, **one filled + one outlined**. Never two filled primaries in the same bar.

## AkAlert - Alert Component

### Description & Purpose
Contextual feedback messages for success, error, warning, info, discount, and neutral states with optional icons and actions.

### Props & Types
```typescript
enum AlertType {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning",
  Discount = "discount",
  Neutral = "neutral"
}

interface Props {
  type: AlertType (default: "info")
  title: string (default: "")
  icon: string (default: "")
  hideIcon: boolean (default: false)
  closable: boolean (default: false)
}
```

### Usage Examples
```vue
<!-- Full-featured alert -->
<AkAlert
  type="info"
  title="Important Information"
  icon="info-circle"
  :hideIcon="false"
  :closable="true"
  @close="handleClose"
>
  This is the alert content with detailed information.
  <template #actions>
    <div style="display: flex; gap: var(--space-2); align-items: center;">
      <a href="#" class="ak-link">Learn More</a>
      <a href="#" class="ak-link">Dismiss</a>
    </div>
  </template>
</AkAlert>

<!-- Success alert -->
<AkAlert
  type="success"
  title="Operation Successful"
  icon="check-circle"
  closable
>
  Your changes have been saved successfully.
</AkAlert>

<!-- Discount alert -->
<AkAlert
  type="discount"
  title="25% Special Discount"
  icon="tag"
  closable
>
  Limited time offer - save on your next order!
</AkAlert>
```

## AkBadge - Badge Component

### Description & Purpose
Status badges with icons and color schemes for labeling and status indication.

### Props & Types
```typescript
enum AkBadgeColor {
  Blue = "blue",
  BlueFull = "blue-full",
  Green = "green",
  GreenFull = "green-full",
  Grey = "grey",
  GreyFull = "grey-full",
  Orange = "orange",
  OrangeFull = "orange-full",
  Purple = "purple",
  PurpleFull = "purple-full",
  Red = "red",
  RedFull = "red-full",
  Warm800 = "warm-800",
  Warning700 = "warning-700"
}

enum AkBadgeSize {
  Sm = "sm",
  Xs = "xs",
  Base = "base"
}

enum AkBadgeIconPosition {
  Left = "left",
  Right = "right"
}

interface Props {
  content: string (default: "")
  symbol?: string
  size: AkBadgeSize (default: "sm")
  color: AkBadgeColor (default: "green")
  iconPosition: AkBadgeIconPosition (default: "left")
}
```

### Usage Examples
```vue
<!-- Badge with all props -->
<AkBadge
  content="New Feature"
  color="green"
  size="sm"
  symbol="star"
  iconPosition="left"
/>

<!-- Badge variations -->
<AkBadge
  content="Coming Soon"
  color="orange-full"
  size="xs"
  symbol="clock"
  iconPosition="right"
/>

<AkBadge
  content="Premium"
  color="purple-full"
  size="base"
  symbol="crown"
/>

<AkBadge
  content="Verified"
  color="blue-full"
  size="xs"
  symbol="check"
/>
```

## AkInput - Input Component

### Description & Purpose
Text input field with validation states, icons, and extensive customization options.

### Props & Types
```typescript
type InputType = "email" | "number" | "password" | "search" | "text" | "tel" | "url" | "date"
type InputSize = "medium" | "large"

interface Props extends AkFieldProps {
  id?: string
  iconLeft?: string
  iconRight?: string
  iconRightSecondary?: string
  name?: string
  pattern?: string
  required: boolean (default: false)
  withPasswordEye: boolean (default: false)
  type: InputType (default: "text")
  placeholder?: string
  disabled: boolean (default: false)
  modelValue?: string | number
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  step?: number
  isValid: boolean (default: false)
  hasError: boolean (default: false)
  hasWarning: boolean (default: false)
  readonly: boolean (default: false)
  size: InputSize (default: "medium")
  autocomplete?: string
}
```

### Usage Examples
```vue
<!-- Comprehensive input example -->
<AkInput
  id="email-input"
  name="email"
  type="email"
  label="Email Address"
  labelExtra="Required"
  labelInfo="We'll never share your email"
  placeholder="Enter your email..."
  v-model="emailValue"
  iconLeft="mail"
  iconRight="info"
  :required="true"
  :disabled="false"
  size="medium"
  :hasError="emailHasError"
  :isValid="emailIsValid"
  :errors="emailErrors"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  autocomplete="email"
  :maxlength="100"
  @blur="validateEmail"
  @iconRightClick="showEmailHelp"
/>

<!-- Password input with eye toggle -->
<AkInput
  type="password"
  label="Password"
  placeholder="Enter password..."
  v-model="password"
  :withPasswordEye="true"
  :required="true"
  :minlength="8"
  :hasError="passwordError"
  errors="Password must be at least 8 characters"
/>

<!-- Number input with constraints -->
<AkInput
  type="number"
  label="Quantity"
  v-model="quantity"
  :min="1"
  :max="100"
  :step="1"
  iconRight="percent"
  size="large"
/>
```

## AkSelect - Select Component

### Description & Purpose
Dropdown select with keyboard navigation, advanced features, icons, badges, and sublabels.

### Props & Types
```typescript
type SelectSize = "md" | "lg"

interface AkSelectOption {
  disabled?: boolean
  key?: string
  type?: "divider"
  label: string
  value?: string | number
  subLabel?: string
  icon?: {
    symbol: string
    class?: string
  }
  badge?: {
    content: string
    color: AkBadgeColor
    size: AkBadgeSize
    class?: string
  }
}

interface Props extends AkFieldProps {
  placeholder?: string
  testId?: string
  options: AkSelectOption[]
  modelValue?: string | number
  isValid: boolean (default: false)
  hasError: boolean (default: false)
  disabled: boolean (default: false)
  size: SelectSize (default: "md")
  dropdownFlip: boolean (default: true)
  heightOptionsBox: number (default: 180)
  isOpenByDefault: boolean (default: false)
}
```

### Usage Examples
```vue
<!-- Full-featured select -->
<AkSelect
  label="Choose Country"
  labelExtra="Required"
  labelInfo="Select your shipping country"
  placeholder="Select a country..."
  testId="country-select"
  v-model="selectedCountry"
  :options="countryOptions"
  size="md"
  :isValid="false"
  :hasError="false"
  :disabled="false"
  :dropdownFlip="true"
  :heightOptionsBox="180"
  @change="handleCountryChange"
/>

<!-- Select with complex options -->
<AkSelect
  v-model="selectedPlan"
  :options="[
    {
      label: 'Premium Plan',
      value: 'premium',
      subLabel: '€99/month - All features included',
      icon: { symbol: 'crown' },
      badge: { content: 'Popular', color: 'orange-full', size: 'xs' }
    },
    {
      label: 'Business Features',
      type: 'divider',
      disabled: true
    },
    {
      label: 'Standard Plan',
      value: 'standard',
      subLabel: '€49/month - Essential features',
      icon: { symbol: 'check' }
    }
  ]"
  label="Subscription Plan"
  size="lg"
  :heightOptionsBox="250"
/>
```

## AkModal - Modal Component

### Description & Purpose
Modal dialog with extensive customization options including sizes, buttons, backgrounds, and behaviors.

### Props & Types
```typescript
type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "min" | "max" | "full"
type ValidateButtonColor = "primary" | "error" | "white"

interface Props {
  size: ModalSize (default: "md")
  titleContent?: string
  withCloser: boolean (default: true)
  closerWhite: boolean (default: false)
  darkBackground: boolean (default: false)
  withPadding: boolean (default: true)
  fullHeight: boolean (default: false)
  fullHeightStickyFooter: boolean (default: false)
  cancelButtonText?: string
  cancelButtonIsLink?: boolean
  cancelButtonIsOutlined: boolean (default: true)
  secondaryButtonText?: string
  validateButtonText?: string
  validateButtonColor: ValidateButtonColor (default: "primary")
  validateButtonSymbol?: string
  validateButtonDisabled: boolean (default: false)
  validateButtonLoading: boolean (default: false)
  closeOnValidation: boolean (default: true)
  closeOnCancel: boolean (default: true)
  closeOnBackdrop: boolean (default: true)
  backNavigation: boolean (default: false)
}
```

### Usage Examples
```vue
<!-- Comprehensive modal example -->
<AkModal
  ref="modalRef"
  size="lg"
  titleContent="Confirm Your Action"
  :withCloser="true"
  :darkBackground="false"
  :withPadding="true"
  cancelButtonText="Cancel"
  :cancelButtonIsOutlined="true"
  secondaryButtonText="Save Draft"
  validateButtonText="Confirm"
  validateButtonColor="primary"
  validateButtonSymbol="check"
  :validateButtonDisabled="false"
  :closeOnValidation="true"
  :closeOnCancel="true"
  :closeOnBackdrop="true"
  @validated="handleValidate"
  @cancelled="handleCancel"
  @secondaryAction="handleSecondary"
>
  <div style="padding: var(--space-4);">
    <p>Are you sure you want to proceed with this action?</p>
    <p style="color: var(--neutral-700); margin-top: var(--space-2);">This action cannot be undone.</p>
  </div>
</AkModal>

<!-- Dark full-screen modal -->
<AkModal
  size="full"
  titleContent="Gallery View"
  darkBackground
  closerWhite
  :fullHeight="true"
  :withPadding="false"
  :backNavigation="true"
>
  <!-- Gallery content here -->
</AkModal>
```

## AkCheckboxCard - Checkbox Card Component

### Description & Purpose
Card component with integrated checkbox and collapsible content sections for complex selection scenarios.

### Props & Types
```typescript
interface Props {
  value: string
  text: string
  disabled?: boolean
  checked: boolean (v-model)
}
```

### Usage Examples
```vue
<!-- Full-featured checkbox card -->
<AkCheckboxCard
  v-model:checked="isChecked"
  value="option1"
  text="Enable Advanced Features"
  :disabled="false"
  @change="handleCheckboxChange"
>
  <template #top-right>
    <AkBadge content="Recommended" color="green" size="sm" />
  </template>
  <template #content>
    <div style="color: var(--neutral-700);">
      This option enables advanced features including analytics,
      custom workflows, and priority support.
    </div>
  </template>
  <template #description>
    <div style="padding: var(--space-4); background-color: var(--neutral-100); border-radius: var(--radius-md);">
      <h4 style="font-weight: 600;">Features included:</h4>
      <ul style="list-style-type: disc; margin-left: var(--space-5);">
        <li>Advanced analytics dashboard</li>
        <li>Custom workflow automation</li>
        <li>24/7 priority support</li>
        <li>API access</li>
      </ul>
    </div>
  </template>
</AkCheckboxCard>
```

## AkTable - Table Component

### Description & Purpose
Table component for data display with responsive features, sorting, highlighting, and custom templates.

### Props & Types
```typescript
interface AkTableColumn {
  name: string
  label?: string
  subLabel?: string
  icon?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  align?: AkTableColumnAlign
  tooltip?: string
  sort?: AkTableColumnSortStatus
  mobile?: boolean
}

type AkTableColumnAlign = "left" | "center" | "right"
type AkTableColumnSortStatus = "inactive" | "asc" | "desc"
type AkTableDisplayMode = "table" | "card"

interface AkTableBreakpoint {
  key: string
  minWidth?: number
  maxWidth?: number
  displayMode: AkTableDisplayMode
}

interface Props {
  columns: AkTableColumn[] | function (required)
  data: Array<object>
  condensed: boolean (default: false)
  border: boolean (default: false)
  responsive: boolean (default: false) // DEPRECATED
  stickyHeader: boolean (default: false)
  highlightedRows: number[] (default: [])
  rowAsLink: boolean (default: false)
  fixedColumns: number | boolean (default: 0)
  rowStyles: ("hover" | "cursor-pointer")[] (default: [])
  breakpoints: AkTableBreakpoint[] (default: [])
}
```

### Usage Examples
```vue
<!-- Comprehensive table example -->
<AkTable
  :columns="tableColumns"
  :data="tableData"
  :condensed="false"
  :border="true"
  :stickyHeader="true"
  :highlightedRows="[1, 3]"
  :fixedColumns="2"
  :rowStyles="['hover', 'cursor-pointer']"
  :breakpoints="tableBreakpoints"
  @rowClick="handleRowClick"
  @columnHeaderClick="handleColumnSort"
>
  <!-- Custom column template -->
  <template #column.actions>
    <span>Actions</span>
  </template>
  
  <!-- Custom cell template -->
  <template #item.actions="{ item }">
    <div style="display: flex; gap: var(--space-2);">
      <AkButton size="sm" onlyIcon symbol="edit" @click="editItem(item)" />
      <AkButton size="sm" onlyIcon symbol="trash" color="error" @click="deleteItem(item)" />
    </div>
  </template>
</AkTable>

<script setup>
const tableColumns = [
  {
    name: 'id',
    label: 'ID',
    width: '80px',
    align: 'center'
  },
  {
    name: 'name',
    label: 'Product Name',
    subLabel: 'With description',
    icon: 'package',
    minWidth: '200px',
    sort: 'inactive',
    mobile: true
  },
  {
    name: 'price',
    label: 'Price',
    align: 'right',
    sort: 'asc',
    tooltip: 'Price in EUR'
  }
]
</script>
```

## AkProductCard - Product Card Component

### Description & Purpose
Complex product display card with selection, favorites, pricing, badges, and multiple slots for customization.

### Props & Types
```typescript
interface Image {
  src: string
  alt: string
  title: string
}

interface Badge {
  content: string
  color: AkBadgeColor
  size: AkBadgeSize
}

interface Props {
  image: Image
  name: string
  brandName: string
  price: string
  priceDiscounted?: string
  publicPrice?: string
  unitMultiplier?: string
  selected: boolean (default: false)
  showSelectCheckbox: boolean (default: false)
  showAddToFavorite: boolean (default: false)
  favorite: boolean (default: false)
  isLock: boolean (default: false)
  lockLabel: string (required)
  disabled: boolean (default: false)
  badges: Badge[]
  maxBadgeLimit: number (default: 2)
}
```

### Usage Examples
```vue
<!-- Full-featured product card -->
<AkProductCard
  :image="{
    src: '/products/product-1.jpg',
    alt: 'Premium Coffee Maker',
    title: 'Premium Coffee Maker'
  }"
  name="Premium Espresso Machine"
  brandName="CoffeeMaster Pro"
  price="€299.99"
  priceDiscounted="€249.99"
  publicPrice="€349.99"
  unitMultiplier="Display by 6"
  :selected="false"
  :showSelectCheckbox="true"
  :showAddToFavorite="true"
  :favorite="false"
  :disabled="false"
  :badges="productBadges"
  :maxBadgeLimit="3"
  @selectCard="handleProductSelect"
  @addToFavorite="handleAddToFavorite"
  @clickBrand="handleBrandClick"
>
  <template #overlay>
    <div class="product-overlay">
      <AkBadge content="Sale" color="red-full" size="sm" />
    </div>
  </template>
  
  <template #extra>
    <div class="product-extra-info">
      <span style="font-size: var(--text-xs); color: var(--neutral-700);">Free shipping</span>
    </div>
  </template>
</AkProductCard>

<script setup>
const productBadges = [
  { content: 'New', color: 'green', size: 'xs' },
  { content: '-20%', color: 'red-full', size: 'xs' },
  { content: 'Best Seller', color: 'orange-full', size: 'xs' }
]
</script>
```

---

## AkFormLines - Form Lines Container Component

Container component for form sections with header, badge, tooltip, and collapsible content.

### Props
```typescript
interface AkFormLinesProps {
  title: string;                    // Required title for the form section
  badgeContent?: string;             // Optional badge content
  tooltipInformation?: string;       // Optional tooltip information
  isVisible?: boolean;               // Controls content visibility (default: true)
}
```

### Slots
- **`actions`** - Header actions (buttons, etc.)
- **`description`** - Optional description content
- **`default`** - Main form content (rendered when `isVisible` is true)

### Usage Example
```vue
<template>
  <AkFormLines 
    title="Shipping Configuration"
    badgeContent="No fees set-up"
    tooltipInformation="Configure your shipping settings"
    :isVisible="showShipping"
  >
    <template #actions>
      <AkButton outlined @click="toggleShipping">
        {{ showShipping ? 'Hide' : 'Show' }}
      </AkButton>
    </template>
    
    <template #description>
      <AkParagraph size="sm">
        Configure your shipping preferences and fees
      </AkParagraph>
    </template>
    
    <!-- Form content here -->
    <AkFormLineNumber 
      :options="shippingOptions"
      v-model="shippingValue"
    />
  </AkFormLines>
</template>

<script setup>
import { ref } from 'vue'

const showShipping = ref(true)
const shippingValue = ref(0)
const shippingOptions = [
  { value: 0, label: "Free shipping" },
  { value: 5, label: "Standard shipping" },
  { value: 10, label: "Express shipping" }
]

const toggleShipping = () => {
  showShipping.value = !showShipping.value
}
</script>
```

### CSS Classes
- `.ak-form-lines` - Main container
- `.ak-form-lines--visible` - Applied when `isVisible` is true
- `.header-lines` - Header section
- `.ak-form-lines__description` - Description section
- `.ak-form-lines__content` - Main content section

---

## AkFormLineNumber - Number Input with Dropdown

Number input component with dropdown options, validation, and smart formatting.

### Props
```typescript
interface AkFormLineNumberProps {
  modelValue: string | number;        // Current value
  options: InputDropdownOption[];    // Dropdown options
  step?: number;                     // Step value for formatting (default: 1)
  placeholder?: string;               // Input placeholder
  disabled?: boolean;                // Disabled state
  max?: number;                      // Maximum value
  min?: number;                      // Minimum value
  optionsLabel?: string;             // Options section label
  errors?: string[];                 // Error messages
  warnings?: string[];               // Warning messages
}
```

### Events
- **`update:modelValue`** - Emitted when value changes
- **`select-option`** - Emitted when option is selected
- **`blur`** - Emitted on input blur

### Slots
- **`content`** - Left side content (label, description)
- **`optionItem`** - Custom option rendering
- **`rightInputContent`** - Right side input content (currency, unit)

### Smart Formatting
The component automatically formats numbers based on the `step` prop:
- **Integer steps** (step = 1, 5, 10): Truncates to whole numbers (150.75 → 150)
- **Decimal steps** (step = 0.01, 0.1): Truncates to 2 decimal places (150.756 → 150.75)

### Debouncing
- **Input updates**: 500ms debounce for user typing
- **Validation**: Immediate formatting on blur/validation

### Usage Example
```vue
<template>
  <AkFormLineNumber
    v-model="orderValue"
    :options="orderOptions"
    :step="0.01"
    placeholder="Enter amount"
    :max="1000"
    :min="0"
    optionsLabel="Select or enter amount:"
    :errors="orderErrors"
  >
    <template #content>
      <p>The <b>minimum order value</b> is</p>
    </template>
    
    <template #optionItem="{ option }">
      <div class="custom-option">
        {{ option.label }}
        <span v-if="option.extraLabel" class="extra">{{ option.extraLabel }}</span>
      </div>
    </template>
    
    <template #rightInputContent>
      <AkParagraph>€</AkParagraph>
    </template>
  </AkFormLineNumber>
</template>

<script setup>
import { ref } from 'vue'

const orderValue = ref(100)
const orderErrors = ref([])
const orderOptions = [
  { value: 100, label: "100€", extraLabel: "Recommended" },
  { value: 200, label: "200€" },
  { value: 300, label: "300€" }
]
</script>
```

### Integration with AkFormLines
```vue
<template>
  <AkFormLines title="Order Configuration" :isVisible="true">
    <AkFormLineNumber
      v-model="minOrder"
      :options="minOrderOptions"
      :step="1"
    >
      <template #content>
        <p>The <b>minimum order value</b> is</p>
      </template>
    </AkFormLineNumber>
    
    <AkFormLineNumber
      v-model="shippingFee"
      :options="shippingOptions"
      :step="0.01"
    >
      <template #content>
        <p>You will receive a <b>shipping fee</b> of</p>
      </template>
    </AkFormLineNumber>
  </AkFormLines>
</template>
```

---

# 4. Type System Reference

## Common Types & Enums

```typescript
// Button Types
type AkButtonColor = "primary" | "error" | "white" | "success" | "success-alt" | "orderpay"
type AkButtonSize = "md" | "lg" | "xl"
type AkButtonType = "button" | "submit" | "reset"

// Alert Types
enum AlertType {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning",
  Discount = "discount",
  Neutral = "neutral"
}

// Badge Types
enum AkBadgeColor {
  Blue = "blue",
  BlueFull = "blue-full",
  Green = "green",
  GreenFull = "green-full",
  Grey = "grey",
  GreyFull = "grey-full",
  Orange = "orange",
  OrangeFull = "orange-full",
  Purple = "purple",
  PurpleFull = "purple-full",
  Red = "red",
  RedFull = "red-full",
  Warm800 = "warm-800",
  Warning700 = "warning-700"
}

enum AkBadgeSize {
  Sm = "sm",
  Xs = "xs",
  Base = "base"
}

enum AkBadgeIconPosition {
  Left = "left",
  Right = "right"
}

// Form Line Types
interface InputDropdownOption {
  value: number;
  label: string;
  extraLabel?: string;
}

// Pill Types
enum AkPillColor {
  Blue = "blue",
  BlueFull = "blue-full",
  Green = "green",
  GreenFull = "green-full",
  Grey = "grey",
  GreyFull = "grey-full",
  Orange = "orange",
  OrangeFull = "orange-full",
  Purple = "purple",
  PurpleFull = "purple-full",
  Red = "red",
  RedFull = "red-full",
  GreyLight = "grey-light",
  Accent = "accent",
  AccentAlt = "accent-alt",
  Success100 = "success-100",
  Primary = "primary",
  WarmWhite = "warm-white"
}

interface Pill {
  content?: string | number;
  color?: AkPillColor;
  active?: boolean;
  textColor?: AkPillColor;
}

// Modal Types
type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "min" | "max" | "full"
type ValidateButtonColor = "primary" | "error" | "white"

// Input Types
type InputType = "email" | "number" | "password" | "search" | "text" | "tel" | "url" | "date"
type InputSize = "medium" | "large"

// Select Types
type SelectSize = "md" | "lg"

interface AkSelectOption {
  disabled?: boolean
  key?: string
  type?: "divider"
  label: string
  value?: string | number
  subLabel?: string
  icon?: {
    symbol: string
    class?: string
  }
  badge?: {
    content: string
    color: AkBadgeColor
    size: AkBadgeSize
    class?: string
  }
}

// Table Types
interface AkTableColumn {
  name: string
  label?: string
  subLabel?: string
  icon?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  align?: AkTableColumnAlign
  tooltip?: string
  sort?: AkTableColumnSortStatus
  mobile?: boolean
}

type AkTableColumnAlign = "left" | "center" | "right"
type AkTableColumnSortStatus = "inactive" | "asc" | "desc"
type AkTableDisplayMode = "table" | "card"

interface AkTableBreakpoint {
  key: string
  minWidth?: number
  maxWidth?: number
  displayMode: AkTableDisplayMode
}

// Pagination Types
type AkPaginationType = "page" | "separator"

interface AkPaginationItem {
  disabled?: boolean
  label?: string
  type: AkPaginationType
  value?: number
}

// Carousel Types
interface ResponsiveSlider {
  maxWidth: number
  slidesPerPage: number
}

type AkCarouselControllerType = "square" | "transparent" | "rounded"
type AkCarouselControllerSize = "md" | "xl" | "xxl"
type AkCarouselJustifyOption = "center" | "start"

// Steps Types
interface AkStepsStep {
  title: string
  subtitle?: string
  completed?: boolean
  invalid?: boolean
  icon?: string
  disabled?: boolean
}

type AkStepsBreakpoint = "sm" | "md" | "lg" | "xl"

// Toaster Types
type ToasterType = "success" | "error" | "info"

// Field Props (inherited by form components)
interface AkFieldProps {
  label?: string
  labelExtra?: string
  labelExtraLink?: string
  labelInfo?: string
  required?: boolean
  errors?: string | string[]
  warnings?: string | string[]
}
```

---

# 5. CSS & Styling Reference

## Important Note: Use CSS Custom Properties in Templates

**Do NOT use `ds-` prefixed utility classes in component templates.** These are internal DS styles used by components at runtime.

✅ **CORRECT for templates**: Use CSS custom properties — `var(--primary)`, `var(--space-4)`, `var(--radius-md)`
❌ **WRONG for templates**: `ds-bg-neutral-500`, `ds-text-neutral-400`, `ds-p-4`

See `src/styles/design-tokens.css` for the complete reference of available CSS custom properties.

---

## DS Internal Utility Classes (Reference Only)

The following `ds-` classes are compiled in the design-system.css for internal component use. Do not use these in your templates.

## Color System

### Primary Colors
- **Primary**: `ds-bg-primary`, `ds-text-primary`, `ds-border-primary`
- **White**: `ds-bg-white`, `ds-text-white`, `ds-border-white`

### Neutral Colors (Grayscale)
- **Neutral 900**: `ds-bg-neutral-900`, `ds-text-neutral-900`, `ds-border-neutral-900` (darkest)
- **Neutral 800**: `ds-bg-neutral-800`, `ds-text-neutral-800`, `ds-border-neutral-800`
- **Neutral 700**: `ds-bg-neutral-700`, `ds-text-neutral-700`, `ds-border-neutral-700`
- **Neutral 600**: `ds-bg-neutral-600`, `ds-text-neutral-600`, `ds-border-neutral-600`
- **Neutral 500**: `ds-bg-neutral-500`, `ds-text-neutral-500`, `ds-border-neutral-500` (medium)
- **Neutral 400**: `ds-bg-neutral-400`, `ds-text-neutral-400`, `ds-border-neutral-400`
- **Neutral 300**: `ds-bg-neutral-300`, `ds-text-neutral-300`, `ds-border-neutral-300`
- **Neutral 200**: `ds-bg-neutral-200`, `ds-text-neutral-200`, `ds-border-neutral-200`
- **Neutral 100**: `ds-bg-neutral-100`, `ds-text-neutral-100`, `ds-border-neutral-100` (lightest)

### Status Colors

#### Error (Red)
- **Error 700**: `ds-bg-error-700`, `ds-text-error-700`, `ds-border-error-700` (dark red)
- **Error 500**: `ds-bg-error-500`, `ds-text-error-500`, `ds-border-error-500` (medium red)
- **Error 300**: `ds-bg-error-300`, `ds-text-error-300`, `ds-border-error-300` (light red)
- **Error 100**: `ds-bg-error-100`, `ds-text-error-100`, `ds-border-error-100` (lightest red)

#### Warning (Orange)
- **Warning 700**: `ds-bg-warning-700`, `ds-text-warning-700`, `ds-border-warning-700` (dark orange)
- **Warning 500**: `ds-bg-warning-500`, `ds-text-warning-500`, `ds-border-warning-500` (medium orange)
- **Warning 300**: `ds-bg-warning-300`, `ds-text-warning-300`, `ds-border-warning-300` (light orange)
- **Warning 100**: `ds-bg-warning-100`, `ds-text-warning-100`, `ds-border-warning-100` (lightest orange)

#### Success (Green)
- **Success 700**: `ds-bg-success-700`, `ds-text-success-700`, `ds-border-success-700` (dark green)
- **Success 500**: `ds-bg-success-500`, `ds-text-success-500`, `ds-border-success-500` (medium green)
- **Success 300**: `ds-bg-success-300`, `ds-text-success-300`, `ds-border-success-300` (light green)
- **Success 100**: `ds-bg-success-100`, `ds-text-success-100`, `ds-border-success-100` (lightest green)

#### Info (Blue)
- **Info 700**: `ds-bg-info-700`, `ds-text-info-700`, `ds-border-info-700` (dark blue)
- **Info 500**: `ds-bg-info-500`, `ds-text-info-500`, `ds-border-info-500` (medium blue)
- **Info 300**: `ds-bg-info-300`, `ds-text-info-300`, `ds-border-info-300` (light blue)
- **Info 100**: `ds-bg-info-100`, `ds-text-info-100`, `ds-border-info-100` (lightest blue)

### Brand Colors

#### Accent
- **Accent**: `ds-bg-accent`, `ds-text-accent`, `ds-border-accent`
- **Accent Alt**: `ds-bg-accent-alt`, `ds-text-accent-alt`, `ds-border-accent-alt`
- **Accent 700**: `ds-bg-accent-700`, `ds-text-accent-700`, `ds-border-accent-700`

#### Cold Colors
- **Cold 900**: `ds-bg-cold-900`, `ds-text-cold-900`, `ds-border-cold-900`
- **Cold 800**: `ds-bg-cold-800`, `ds-text-cold-800`, `ds-border-cold-800`
- **Cold 200**: `ds-bg-cold-200`, `ds-text-cold-200`, `ds-border-cold-200`
- **Cold 100**: `ds-bg-cold-100`, `ds-text-cold-100`, `ds-border-cold-100`
- **Cold White**: `ds-bg-cold-white`, `ds-text-cold-white`, `ds-border-cold-white`

#### Warm Colors
- **Warm 900**: `ds-bg-warm-900`, `ds-text-warm-900`, `ds-border-warm-900`
- **Warm 800**: `ds-bg-warm-800`, `ds-text-warm-800`, `ds-border-warm-800`
- **Warm 200**: `ds-bg-warm-200`, `ds-text-warm-200`, `ds-border-warm-200`
- **Warm 100**: `ds-bg-warm-100`, `ds-text-warm-100`, `ds-border-warm-100`
- **Warm White**: `ds-bg-warm-white`, `ds-text-warm-white`, `ds-border-warm-white`

#### Discount (Purple)
- **Discount 700**: `ds-bg-discount-700`, `ds-text-discount-700`, `ds-border-discount-700`
- **Discount 500**: `ds-bg-discount-500`, `ds-text-discount-500`, `ds-border-discount-500`
- **Discount 300**: `ds-bg-discount-300`, `ds-text-discount-300`, `ds-border-discount-300`
- **Discount 100**: `ds-bg-discount-100`, `ds-text-discount-100`, `ds-border-discount-100`

### Special Colors
- **Ratings**: `ds-bg-ratings`, `ds-text-ratings`, `ds-border-ratings` (star ratings)
- **Disabled**: `ds-bg-disabled`, `ds-text-disabled`, `ds-border-disabled`

### OP (Special Brand) Colors
- **OP Primary**: `ds-bg-op-primary`, `ds-text-op-primary`, `ds-border-op-primary`
- **OP Accent**: `ds-bg-op-accent`, `ds-text-op-accent`, `ds-border-op-accent`

### Utility Colors
- **Current**: `ds-bg-current`, `ds-text-current`, `ds-border-current`
- **Transparent**: `ds-bg-transparent`, `ds-text-transparent`, `ds-border-transparent`

## Typography

### Font Family
- **Basic Font**: `ds-font-basic` (Poppins, sans-serif)

### Font Sizes
- **Extra Small**: `ds-text-xs` (0.75rem / 12px)
- **Small**: `ds-text-sm` (0.875rem / 14px)
- **Base**: `ds-text-base` (1rem / 16px)
- **Large**: `ds-text-lg` (1.125rem / 18px)
- **Extra Large**: `ds-text-xl` (1.25rem / 20px)
- **2X Large**: `ds-text-2xl` (1.5rem / 24px)
- **3X Large**: `ds-text-3xl` (1.75rem / 28px)
- **4X Large**: `ds-text-4xl` (2.25rem / 36px)
- **5X Large**: `ds-text-5xl` (2.5rem / 40px)
- **6X Large**: `ds-text-6xl` (3.75rem / 60px)
- **7X Large**: `ds-text-7xl` (4.5rem / 72px)
- **8X Large**: `ds-text-8xl` (6rem / 96px)
- **9X Large**: `ds-text-9xl` (8rem / 128px)

## Spacing

### Spacing Scale
- **0**: `ds-m-0`, `ds-p-0`, `ds-space-x-0`, `ds-space-y-0`
- **0.5**: `ds-m-0.5`, `ds-p-0.5` (0.125rem / 2px)
- **1**: `ds-m-1`, `ds-p-1` (0.25rem / 4px)
- **1.5**: `ds-m-1.5`, `ds-p-1.5` (0.375rem / 6px)
- **2**: `ds-m-2`, `ds-p-2` (0.5rem / 8px)
- **2.5**: `ds-m-2.5`, `ds-p-2.5` (0.625rem / 10px)
- **3**: `ds-m-3`, `ds-p-3` (0.75rem / 12px)
- **4**: `ds-m-4`, `ds-p-4` (1rem / 16px)
- **4.5**: `ds-m-4.5`, `ds-p-4.5` (1.25rem / 20px)
- **5**: `ds-m-5`, `ds-p-5` (1.5rem / 24px)
- **5.5**: `ds-m-5.5`, `ds-p-5.5` (1.75rem / 28px)
- **6**: `ds-m-6`, `ds-p-6` (2rem / 32px)
- **6.5**: `ds-m-6.5`, `ds-p-6.5` (2.5rem / 40px)
- **7**: `ds-m-7`, `ds-p-7` (3rem / 48px)
- **8**: `ds-m-8`, `ds-p-8` (4rem / 64px)
- **9**: `ds-m-9`, `ds-p-9` (5rem / 80px)
- **10**: `ds-m-10`, `ds-p-10` (10rem / 160px)
- **px**: `ds-m-px`, `ds-p-px` (1px)

### Directional Spacing
Available for all spacing values above:
- **All sides**: `ds-m-4`, `ds-p-4`
- **Horizontal**: `ds-mx-4`, `ds-px-4`
- **Vertical**: `ds-my-4`, `ds-py-4`
- **Top**: `ds-mt-4`, `ds-pt-4`
- **Right**: `ds-mr-4`, `ds-pr-4`
- **Bottom**: `ds-mb-4`, `ds-pb-4`
- **Left**: `ds-ml-4`, `ds-pl-4`

## Border Radius

- **Extra Small**: `ds-rounded-xs` (3px)
- **Small**: `ds-rounded-sm` (4px)
- **Medium**: `ds-rounded-md` (8px)
- **Large**: `ds-rounded-lg` (16px)
- **Extra Large**: `ds-rounded-xl` (32px)
- **2X Large**: `ds-rounded-2xl` (48px)
- **Full**: `ds-rounded-full` (9999px - perfect circle)

## Responsive Breakpoints

This project does **not** use Tailwind `ds-` prefix classes. Use CSS utility classes from `src/styles/responsive-utils.css` instead:

| Breakpoint | Value | Utility examples |
|------------|-------|------------------|
| xs | 480px | `.hide-below-xs`, `.show-below-xs` |
| sm | 640px | `.hide-below-sm`, `.show-below-sm` |
| md | 768px | `.hide-below-md`, `.cols-1-md-2`, `.stack-below-md` |
| lg | 1024px | `.hide-below-lg`, `.cols-1-lg-3`, `.stack-below-lg` |
| xl | 1280px | `.hide-below-xl`, `.cols-1-xl-4` |
| 2xl | 1600px | `.hide-below-2xl` |

### Usage Examples
```html
<div class="cols-1-md-2">
  <!-- 1 column on mobile, 2 columns at 768px+ -->
</div>

<div class="hide-below-md">
  <!-- Hidden on mobile, visible at 768px+ -->
</div>

<h1 class="text-responsive-h1">
  <!-- Smaller on mobile, larger on desktop -->
</h1>
```

For custom responsive logic in `<style scoped>`, use `@media (min-width: ...)` with breakpoint values above.

## Grid System

### Grid Template Columns
- **1-2**: `ds-grid-cols-1-2` (1fr 2fr)
- **2-1**: `ds-grid-cols-2-1` (2fr 1fr)

## Common Class Combinations

### Card Components
```html
<div class="ds-bg-white ds-rounded-lg ds-p-6 ds-border ds-border-neutral-300">
  <!-- Card content -->
</div>
```

### Button Styles
```html
<button class="ds-bg-primary ds-text-white ds-px-4 ds-py-2 ds-rounded-md">
  <!-- Primary button -->
</button>
```

### Status Messages
```html
<div class="ds-bg-success-100 ds-text-success-700 ds-p-3 ds-rounded-sm">
  <!-- Success message -->
</div>
```

## Migration Guide

### Common Mapping from Generic Tailwind

| ❌ Generic Tailwind | ✅ Design System |
|-------------------|------------------|
| `bg-gray-500` | `ds-bg-neutral-500` |
| `text-gray-700` | `ds-text-neutral-700` |
| `border-gray-300` | `ds-border-neutral-300` |
| `bg-red-500` | `ds-bg-error-500` |
| `text-red-700` | `ds-text-error-700` |
| `bg-green-500` | `ds-bg-success-500` |
| `text-blue-600` | `ds-text-info-500` |
| `bg-yellow-400` | `ds-bg-warning-500` |
| `rounded-lg` | `ds-rounded-lg` |
| `p-4` | `ds-p-4` |
| `m-2` | `ds-m-2` |
| `text-sm` | `ds-text-sm` |

### Key Differences
1. **All classes are prefixed with `ds-`**
2. **Gray colors are called `neutral`**
3. **Red colors are called `error`**
4. **Green colors are called `success`**
5. **Blue colors are called `info`**
6. **Yellow colors are called `warning`**

## CSS Custom Properties

The design system also provides CSS custom properties that can be used in custom CSS:

```css
.custom-component {
  background-color: var(--primary);
  color: var(--neutral-700);
  border: 1px solid var(--neutral-300);
}
```

Available custom properties include all color values from the color system above, prefixed with `--`.

---

# 6. Development Patterns

## Event Handling Patterns

Most components follow consistent event patterns:

```vue
<script setup>
// Common event handlers
const handleClick = (event) => {
  console.log('Clicked', event)
}

const handleChange = (value) => {
  console.log('Value changed to', value)
}

const handleValidate = () => {
  console.log('Validation triggered')
}

const handleCancel = () => {
  console.log('Cancelled')
}

// Form-specific handlers
const handleBlur = (event) => {
  // Validate on blur
}

const handleFocus = (event) => {
  // Show hints on focus
}

const handleInput = (value) => {
  // Real-time validation
}
</script>
```

## V-Model Usage

Components supporting v-model follow Vue 3 patterns:

```vue
<!-- Standard v-model -->
<AkInput v-model="inputValue" />

<!-- Named v-model -->
<AkCheckboxCard v-model:checked="isChecked" />

<!-- Multiple v-models -->
<CustomComponent 
  v-model:title="title"
  v-model:content="content"
/>
```

## Slot Patterns

Components use named slots for customization:

```vue
<!-- Common slot patterns -->
<AkComponent>
  <!-- Default slot -->
  Main content here
  
  <!-- Named slots -->
  <template #header>
    Header content
  </template>
  
  <template #footer>
    Footer content
  </template>
  
  <!-- Scoped slots -->
  <template #item="{ item, index }">
    {{ index }}: {{ item.name }}
  </template>
</AkComponent>
```

## CSS Custom Properties Reference

Use these CSS custom properties in your templates and styles instead of hardcoded values:

### Spacing
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.5rem (24px)
--space-6: 2rem (32px)
--space-8: 4rem (64px)
```

### Colors
```css
--primary: #14060A
--neutral-100: #F9F9F9
--neutral-700: #808080
--neutral-900: #4D4D4D
--error: #DE043C
--success: #557566
--info-700: #0B00F4
--white: rgba(255,255,255,1) (DS export)
--color-border-light: #F0F0F0 (gap-filler)
```

### Border Radius
```css
--radius-xs: 3px
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 16px
--radius-xl: 32px
--radius-2xl: 48px
```

### Typography
```css
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--font-family: 'Poppins', sans-serif
```

**Example usage:**
```vue
<div style="padding: var(--space-4); border-radius: var(--radius-md); background-color: var(--neutral-100);">
  <p style="color: var(--primary);">Content</p>
</div>
```

## Best Practices

1. **Component Selection**: Choose the right atomic level - prefer molecules over custom atom combinations
2. **Type Safety**: Always use TypeScript interfaces for props and events
3. **CSS Styling**: Use CSS custom properties (`var(--token)`) in templates and scoped styles, not `ds-` classes
4. **Accessibility**: Components include built-in accessibility features - don't override them
5. **Performance**: Use v-model for form components, avoid unnecessary re-renders with proper key usage
6. **Theming**: Stick to design system colors and spacing for consistency

This comprehensive guide provides all the necessary information to implement and use Ankorstore Design System components effectively.