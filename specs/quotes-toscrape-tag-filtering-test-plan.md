# Tag Filtering Test Plan

## Application Overview

Tag filtering validation for quotes.toscrape.com, including tag navigation, filtered quote verification, pagination within tag pages, and return navigation to the home quote list.

## Test Scenarios

### 1. Tag Filtering

**Seed:** `tests/seed.spec.ts`

#### 1.1. Filter quotes by a selected tag

**File:** `specs/quotes-toscrape-tag-filtering-test-plan.md`

**Steps:**
  1. -
    - expect: Start at the home page at https://quotes.toscrape.com/
  2. Click the tag link named "love" from the visible tag list or quote card
    - expect: The browser navigates to a URL containing /tag/love/
  3. -
    - expect: At least one quote card is visible on the tag page
    - expect: Every visible quote card contains the selected tag text in its tag list

#### 1.2. Validate tag page pagination

**File:** `specs/quotes-toscrape-tag-filtering-test-plan.md`

**Steps:**
  1. -
    - expect: Start on a tag page for an existing tag such as /tag/love/
  2. Click the "Next" pagination link on the tag page
    - expect: The URL updates to page 2 for the selected tag
    - expect: Quote cards continue to display and each visible quote contains the selected tag

#### 1.3. Return to home from a tag page

**File:** `specs/quotes-toscrape-tag-filtering-test-plan.md`

**Steps:**
  1. -
    - expect: Start on a filtered tag page such as /tag/love/
  2. Click the site logo or Home link labeled "Quotes to Scrape"
    - expect: The browser returns to the home page at /
    - expect: The home quote list is visible again
