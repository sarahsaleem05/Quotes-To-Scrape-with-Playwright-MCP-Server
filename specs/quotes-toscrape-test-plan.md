# Test Plan: quotes.toscrape.com

## Overview
This test plan covers functional validation of the demo website https://quotes.toscrape.com/. The site consists of quote listings, author details, login functionality, search/filtering by tags, and pagination. The goal is to verify the main user journeys, navigation, data display, and basic interaction flows.

## Scope
In scope:
- Home page loading and content validation
- Quote details and author pages
- Pagination navigation
- Tag filtering and tag page behavior
- Login/logout flows for the protected page
- Basic UI and navigation elements

Out of scope:
- API-level testing
- Performance/load testing
- Accessibility testing beyond basic visibility checks

## Test Suites

### 1. Home Page
Objectives:
- Verify the home page loads successfully
- Confirm the quote list is displayed
- Validate top page elements and navigation

Test cases:
1. Home page loads and title is correct
   - Go to `/`
   - Verify page title contains `Quotes to Scrape`
   - Verify the main heading or logo is visible
2. Quote cards display required content
   - Verify at least one quote card is visible
   - Confirm each visible quote contains quote text, author name, and tags
3. Pagination controls appear
   - Verify the pagination section is visible
   - Confirm the `Next` button or page numbers are visible when there are multiple pages
4. Tag list displays on home page
   - Verify the tag cloud or list is visible
   - Confirm clicking a tag navigates to the tag page

### 2. Pagination
Objectives:
- Confirm page navigation works correctly
- Validate quote content changes when paging

Test cases:
1. Navigate to the next page
   - From `/`, click `Next` in pagination
   - Verify the URL and page indicator update
   - Confirm new quotes load
2. Navigate to a specific page number
   - Click page number `2`
   - Verify the correct page loads and the current page state updates
3. Navigate back to the first page
   - Use `Previous` or page `1`
   - Confirm the first page content is displayed again

### 3. Author Details
Objectives:
- Validate author profile pages load properly
- Confirm author page content is shown

Test cases:
1. Open an author page from a quote card
   - Click an author name on the home page
   - Verify the URL contains `/author/`
   - Confirm author details like name, birth date, location, and biography are visible
2. Return to quote list from author page
   - Click the `Home` or site logo link
   - Verify navigation returns to `/`

### 4. Tag Filtering
Objectives:
- Ensure tag filtering lists quotes for a chosen tag
- Validate tag page content and navigation

Test cases:
1. Filter by tag from the home page
   - Click a tag name on a quote card or tag cloud
   - Verify the page changes to `/tag/<tag-name>/`
   - Confirm only quotes containing that tag are visible
2. Validate tag page pagination
   - If a tag has multiple pages, verify pagination functions on the tag page
   - Confirm page number or `Next` works within the tag context
3. Navigate back from a tag page
   - Use `All` or `Home` to return
   - Confirm the home quote list appears again

### 5. Login / Protected Page
Objectives:
- Verify authentication flow for the login page
- Confirm protected page access restrictions

Test cases:
1. Access login page
   - Navigate to `/login`
   - Verify login form fields are visible: username and password
2. Submit invalid credentials
   - Enter incorrect username/password
   - Verify the error message appears and access is denied
3. Submit valid credentials
   - Enter valid username and password (if known; default values may be `admin/admin` or from site docs)
   - Verify login succeeds and protected area or `logout` link appears
4. Access protected page when authenticated
   - Navigate to `/logout` or a protected page after login
   - Confirm the page is accessible when logged in and not accessible when logged out

### 6. Navigation and Links
Objectives:
- Validate top-level navigation links and site flow

Test cases:
1. Verify site navigation links
   - Confirm links like `Home`, `Login`, and tag links are clickable
   - Verify each navigates to the correct destination
2. Verify browser back/forward behavior
   - Navigate between pages and use browser back/forward
   - Confirm the correct content loads for each step

### 7. Error Handling and Empty States
Objectives:
- Check simple error responses and invalid page handling

Test cases:
1. Visit an invalid author or tag URL
   - Navigate to a non-existing `/author/unknown` or `/tag/unknown`
   - Verify the site returns a meaningful response or fallback page
2. Verify broken navigation does not crash the app
   - Click a link to an invalid URL if available
   - Confirm the site shows an error or returns gracefully

## Test Data
- Tags: `love`, `inspirational`, `life`, `humor` (common tags expected on the site)
- Authors: choose any author listed on the homepage such as `Albert Einstein` or `J.K. Rowling`
- Credentials: if known from the site, use the provided login values; otherwise skip authenticated tests until valid credentials are identified.

## Notes
- This site is intended for scraping/demo practice; test data may refresh or be static.
- Focus on stable selectors and visible page content rather than data values that may change.
- Use Playwright to verify page navigation, content visibility, and control interaction.
