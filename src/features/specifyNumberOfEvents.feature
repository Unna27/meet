Feature: Specify Number Of Events

  Scenario: When user hasnot specified a event number, default number is 5
    Given the main page is open
    When the user doesn’t provide any number in “number of events” field
    Then the user should see a maximum of 5 or fewer upcoming events aligned according to the screen size

  Scenario: User can change the number of events they want to see
    Given the main page is open
    When the user provides a number (e.g. 2) in “number of events” field
    Then the user should see the specified number of events being displayed aligned according to the screen size

