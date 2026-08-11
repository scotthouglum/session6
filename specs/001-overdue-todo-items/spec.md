# Feature Specification: Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`

**Created**: 2026-08-11

**Status**: Draft

**Input**: User description: "As a todo application user, I want to easily identify and distinguish overdue tasks in my todo list, so that I can prioritize my work and quickly see which tasks are past their due date. Users need a clear, visual way to identify which todos have not been completed by their due date, without having to manually check dates against today's date."

## Clarifications

### Session 2026-08-11

- Q: What visual treatment should mark a todo as overdue in the list? → A: Color + text badge/label (e.g., an "Overdue" badge near the due date)
- Q: Where and how should the overdue count from Story 3 be displayed? → A: A standalone summary line above the todo list (e.g., "3 todos overdue")
- Q: Should the overdue count summary line be hidden when there are zero overdue todos, or always shown (including "0 todos overdue")? → A: Always shown, including "0 todos overdue" when none are overdue

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identify overdue todos at a glance (Priority: P1)

As a todo application user, I want to easily identify and distinguish overdue tasks in my todo list, so that I can prioritize my work and quickly see which tasks are past their due date, without manually comparing dates.

**Why this priority**: This is the core value of the feature — without a visual signal, users have no way to notice overdue work without manually comparing dates. This alone delivers the entire feature's value.

**Independent Test**: Create todos with due dates in the past, today, and the future, and verify only the past-due, incomplete todo is visually marked as overdue in the list.

**Acceptance Scenarios**:

1. **Given** a todo with a due date earlier than today and status incomplete, **When** the user views the todo list, **Then** the todo is displayed with a distinct overdue indicator (e.g., color/label) that differs from normal and completed todos.
2. **Given** a todo with a due date of today, **When** the user views the todo list, **Then** the todo is NOT marked as overdue.
3. **Given** a todo with a due date in the future, **When** the user views the todo list, **Then** the todo is NOT marked as overdue.
4. **Given** a todo with no due date set, **When** the user views the todo list, **Then** the todo is NOT marked as overdue.

---

### User Story 2 - Overdue status updates immediately on changes (Priority: P2)

As a user, when I complete an overdue todo or edit its due date, I want the overdue indicator to update immediately without needing to refresh the page, so the list always reflects accurate status.

**Why this priority**: Ensures the indicator remains trustworthy after user actions; builds on Story 1 but is not required for the base visual flag to exist.

**Independent Test**: Mark an overdue todo as complete and verify the overdue indicator disappears immediately; edit an overdue todo's due date to a future date and verify the indicator disappears immediately.

**Acceptance Scenarios**:

1. **Given** a todo currently marked as overdue, **When** the user marks it complete, **Then** the overdue indicator is removed immediately without a page refresh.
2. **Given** a todo currently marked as overdue, **When** the user edits its due date to today or a future date, **Then** the overdue indicator is removed immediately without a page refresh.
3. **Given** an incomplete todo not currently overdue, **When** the user edits its due date to a date earlier than today, **Then** the overdue indicator appears immediately without a page refresh.

---

### User Story 3 - See how many todos are overdue (Priority: P3)

As a user, I want to see a count of how many todos are currently overdue, so I can gauge how much attention my list needs without scanning every item.

**Why this priority**: A nice-to-have summary that adds convenience but is not required for the core identification value delivered by Story 1.

**Independent Test**: Create a known number of overdue todos and verify the displayed overdue count matches, updating as todos are completed or edited.

**Acceptance Scenarios**:

1. **Given** the todo list contains a mix of overdue, upcoming, and completed todos, **When** the user views the list, **Then** a count of currently overdue todos is displayed.
2. **Given** an overdue count is displayed, **When** an overdue todo is completed or its due date is changed to no longer be overdue, **Then** the count decreases immediately to reflect the change.

### Edge Cases

- A todo's due date is today: it is NOT considered overdue (only dates strictly before today count).
- A todo has no due date: it can never be overdue.
- A completed todo has a due date in the past: it is NOT shown as overdue since it is already done.
- The user's local date changes (e.g., the app remains open past midnight): overdue status is recalculated the next time the list is viewed or refreshed.
- A todo is edited to remove its due date entirely: any overdue indicator is removed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST visually distinguish, in the todo list, any incomplete todo whose due date is earlier than the current date ("overdue").
- **FR-002**: System MUST NOT mark a completed todo as overdue, regardless of its due date.
- **FR-003**: System MUST NOT mark a todo with no due date as overdue.
- **FR-004**: System MUST NOT mark a todo due today or in the future as overdue.
- **FR-005**: System MUST update a todo's overdue indicator immediately (without requiring a page refresh) when the todo's completion status changes.
- **FR-006**: System MUST update a todo's overdue indicator immediately (without requiring a page refresh) when the todo's due date is changed.
- **FR-007**: System MUST display a count of currently overdue todos, updated immediately as todos change status or due date, shown as a standalone summary line above the todo list (e.g., "3 todos overdue"). The line MUST always be shown, including "0 todos overdue" when there are none.
- **FR-008**: The overdue indicator MUST be visually distinguishable from the existing completion status indicator (i.e., a user can tell overdue and completed apart at a glance).
- **FR-009**: The overdue indicator MUST combine a distinct color with a text badge/label (e.g., "Overdue") displayed near the due date, so status is conveyed without relying on color alone.

### Key Entities

- **Todo Item**: Existing entity with title, due date (optional), and completion status. This feature adds a derived "overdue" state computed from due date and completion status; no new stored attribute is required.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of incomplete todos with a due date before the current date are visually marked as overdue in the list.
- **SC-002**: 0% of completed todos or todos without a due date are incorrectly marked as overdue.
- **SC-003**: The overdue indicator and overdue count reflect a completion or due-date change within 1 second, with no page reload required.
- **SC-004**: Users can identify which todos are overdue within a few seconds of viewing the list, without needing to compare dates manually.

## Assumptions

- "Overdue" means the todo's due date is strictly earlier than the current calendar date; the due date is a date only (no time-of-day component), so a todo due "today" is not overdue.
- The current date is determined by the user's local device/browser clock, consistent with how due dates are already displayed elsewhere in the app.
- The overdue indicator is a visual treatment (e.g., color, icon, or label) within the existing todo list UI, following the app's existing design system; no new screens or navigation are introduced.
- No notifications, reminders, or emails are part of this feature — it is a passive visual indicator only, consistent with the app's existing out-of-scope decisions around reminders.
- This feature only affects display/derived state; it does not change how todos are created, stored, or the existing due date field.
