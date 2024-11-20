## Rules

- add/remove/modify existing code to achieve the end result (some code needs a refactor)
- don't install additional packages
- you need to use `zustand`, but it's up to you to decide what state should be global
- write the code like it's a real feature

### Cards

- add expand/collapse functionality
- make sure the "Delete" button works
- add animations

### Deleted Cards

- display the number of deleted cards
- reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
- write the code, so in the future you will be able to add "revert" functionality

### Behavior

- cards by default should be collapsed
- expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
- "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

- add a "Refresh" button (just like the "Reveal" button)
- create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.


Testing features I would add to app:

1.	Store:
	- deleteCard: Ensure a card is removed from list and added to deletedCards.
	- toggleExpand: Validate toggling works as expected.
	- revealDeletedCards: Ensure deletedCardsVisible is set to true.
    - ensure if store is updated and errors are handled properly
2.	Components:
	- Card: Render with/without a description, expanded/collapsed states, and verify button actions.
	- Entrypoint: Ensure correct rendering based on Zustand store states.
3.	Persistence:
	- Mock localStorage and test if expandedCards persists correctly across refreshes.
4.	Error Handling:
	- Simulate API failure and validate the “Retry” functionality works.
5.	UI Validation:
	- Test that animations (like fade-out on delete) apply correctly using CSS class assertions.
6. Button Factory:
    - test if factory correctly provides proper buttons into app and classes, check if it throws error when selecting unknown button

From manual point of testing it would be good to make WCAG tests from a11ty view using built screen reader and use "Wave" tool to check if heading structure is proper and other accessibility points are valid.