Feature: Show or Hide Event Details

  Scenario: An event element is collapsed by default
    Given user opens the app
    When the user has not selected any city
    Then the user should see a list of all upcoming events with “show details” button

  Scenario: User should see more detailed information about the selected event
    Given the main page is open
    And the user looks at the first event
    When user clicks “show details” button of a particular event
    Then the user should see more detailed information about the selected event along with “hide details” button

  Scenario: User can collapse an event to show minimal information about an event

    Given the main page is open
    And the user has viewed more detailed information about an event
    When the user clicks “hide details” button
    Then the user should see less information about the event with “show details” button
