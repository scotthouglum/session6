<!--
Sync Impact Report
- Version change: template baseline -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. User Value and Scope Discipline
	- Template Principle 2 -> II. Simplicity and Single Responsibility
	- Template Principle 3 -> III. Test-First Quality Gate (NON-NEGOTIABLE)
	- Template Principle 4 -> IV. Immediate Persistence and Data Integrity
	- Template Principle 5 -> V. Accessible Themed UI Consistency
- Added sections:
	- Technical Standards and Constraints
	- Development Workflow and Review Gates
- Removed sections:
	- None
- Follow-up TODOs:
	- None
-->

# Session6 Todo App Constitution

## Core Principles

### I. User Value and Scope Discipline
All work MUST directly support the defined todo application outcomes: create, view,
update status, edit details, and delete with confirmation. Features explicitly marked
out of scope (authentication, collaboration, advanced filtering, reminders, bulk
actions, and similar expansions) MUST NOT be added unless the requirements are
formally amended. This protects delivery focus and keeps the product aligned with
its learning and usability goals.

### II. Simplicity and Single Responsibility
Code and components MUST remain small, readable, and purpose-driven. Each module,
function, and React component MUST have one clear responsibility, follow existing
naming and formatting conventions, and avoid duplication through shared utilities
when repetition appears. Simpler implementations take precedence over speculative
abstractions unless measurable constraints justify extra complexity.

### III. Test-First Quality Gate (NON-NEGOTIABLE)
Behavior changes MUST be validated with automated tests that assert user-visible
outcomes rather than implementation details. New or changed functionality MUST
include or update unit or integration tests in colocated test directories, and the
workspace test suites MUST pass before merge. Coverage SHOULD remain at or above
the project target, and regressions in critical workflows are release blockers.

### IV. Immediate Persistence and Data Integrity
Todo state changes MUST be persisted through the backend API immediately after user
actions. The system MUST preserve key domain rules: required title, optional due
date, incomplete-by-default creation, and creation-order list display. Destructive
actions MUST require explicit confirmation, and failures MUST surface clear,
actionable user feedback.

### V. Accessible Themed UI Consistency
The interface MUST implement the documented Halloween-themed design system with
consistent spacing, typography, color semantics, and component behavior across light
and dark modes. Interactive elements MUST be keyboard accessible, focus-visible,
and meet WCAG AA contrast expectations. UX polish MUST never reduce clarity,
discoverability, or task completion speed.

## Technical Standards and Constraints

The approved stack is React frontend plus Express backend in the existing monorepo
workspace layout. Changes MUST preserve npm workspace operability and existing
package boundaries. Data persistence MUST use the current backend persistence
mechanism, and schema changes beyond basic todo storage are disallowed unless
explicitly approved through requirement updates.

Code style requirements are mandatory: 2-space indentation, LF endings, minimal
trailing whitespace, consistent import ordering, and established naming conventions
(camelCase, PascalCase, UPPER_SNAKE_CASE where appropriate). Error handling MUST be
graceful and user-facing where failures affect workflows.

## Development Workflow and Review Gates

Work MUST be delivered through focused, atomic commits on feature branches with clear
messages describing intent and impact. Pull requests MUST include a requirement-aware
summary and test evidence for affected packages. Before review, contributors MUST run
relevant test suites and resolve lint issues when linting scripts are present.

Reviewers MUST verify constitution compliance explicitly: scope alignment, principle
adherence, and adequate test coverage for changed behavior. Any deviation from this
constitution requires documented justification and a follow-up amendment proposal.

## Governance

This constitution is the highest project-level authority for engineering practices in
this repository. In case of conflict, this document overrides ad hoc conventions and
informal preferences.

Amendments require: (1) a written proposal describing the change and rationale,
(2) reviewer approval in pull request discussion, and (3) updates to affected
documentation when principles alter implementation expectations.

Versioning policy for this constitution follows semantic versioning:
- MAJOR for incompatible governance changes or principle removals/redefinitions.
- MINOR for new principles/sections or materially expanded guidance.
- PATCH for clarifications, wording improvements, and non-semantic refinements.

Compliance review is required for every pull request. Review outcomes MUST record
whether the change is compliant, compliant with justified exception, or blocked.

**Version**: 1.0.0 | **Ratified**: 2026-08-11 | **Last Amended**: 2026-08-11
