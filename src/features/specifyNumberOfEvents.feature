Feature: Specify Number of Events
  Scenario: By default, 32 events are shown
    Given the user has not specified number of events
    When the user is viewing a list of events
    Then the user should see 32 events

  Scenario: User specifies the number of events to display
    Given the user has specified the number of events
    When the user sees the event list
    Then the user should see the specified number of events