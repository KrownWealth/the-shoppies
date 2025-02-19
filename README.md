## Objective:

Build an interface that allows users to search for movies using the OMDB API and nominate their favorite films. Once a user selected five movies, a notification would inform them that they had reached the nomination limit.

### Key Requirements:
- Search Functionality: Implement a search feature that queries the OMDB API and returns a list of movies displaying at least the title and release year.
- Nomination Capability: Enable users to nominate movies from the search results. Once nominated, the corresponding button should be disabled to prevent duplicate nominations.
- Nomination List: Display a separate section where users can view their nominated movies. This list should allow users to remove nominations if desired.
- Notification Banner: Show a banner or message when a user has nominated five movies, indicating that they have reached the nomination limit.

Solution

#### User Stories:
- As a user I should be able to search for films to nominate (Search bar)
- Users must be able to see at least a title, year of release and a nominate button (Api return Movie tile, image, Year or Release, button)
- As a user I expect that the list of results will change as I update my search term ( action.type searchTerm)
- As a user I should be able to nominate a film which will appear in a nomination list (action.type addMovie)
- As a user I should be able to un-nominate a film or remove a nomination. (action.type removeMovie)
- As a user I should be able to see a list of the films I have nominated.
- As a user I should not be able to nominate the same film twice
- As a user I should be able to nominate a film if it is a remake or reboot and has a different year of release but the same title as a prior release
- Users should have the ability to share a link with others that shows what films they have nominated
- Users nominations should be remembered when they return to the page
- As a user I should see a banner when I nominate 5 films
- As a user I should not see a banner if I have nominated 5 films and remove one
 
