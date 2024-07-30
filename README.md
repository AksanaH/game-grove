# GameCue

## Summary

GameCue is a web application designed for video game enthusiasts to effortlessly manage their favorite games. With GameCue, users can search for video games, add them to a personalized list of favorites, rate them, mark them as played, and remove them when no longer needed. Secure user authentication through JWT guarantees that all actions are protected. Whether you're looking to organize your game collection or keep track of what you've played, GameCue makes it easy and enjoyable.

## User Story

```md
AS A video game enthusiast,
I WANT TO search for video games and add them to my list of favorites,
SO THAT I can easily keep track of the games I love, rate them, mark them as played, and manage my collection efficiently.
```

## Acceptance Criteria

```md
GIVEN a user logs in successfully using their credentials,
WHEN the user performs any actions,
THEN the system should allow the user to complete the action securely using JWT for authentication.
GIVEN a user on the main page
WHEN entered a video game name in the search bar and submit the search,
THEN the system should display a list of video games matching the search query.
GIVEN a list of search results,
WHEN the user clicks on the "Add to Favorites" button for a specific game,
THEN the system should add the selected game to the user’s list of favorites.
GIVEN a user viewing their list of favorite games,
WHEN the user selects a game and provides a rating (e.g., 1 to 5 stars),
THEN the system should save and display the user’s rating for the selected game.
GIVEN a user viewing their list of favorite games,
WHEN the user marks a game as played by clicking the "Mark as Played" button,
THEN the system should update the game’s status to indicate it has been played.
GIVEN a user viewing their list of favorite games,
WHEN the user clicks the "Delete" button for a specific game,
THEN the system should remove the selected game from the user’s list of favorites.
```

## Usage

### Logging In

Step 1: Click on the "Login" button on the main page.
Step 2: Enter your username and password to log in.
Step 3: If you don’t have an account, click "Sign Up" to create a new account.
Step 4: Once logged in, you can manage your favorite games, including adding, rating, marking as played, and deleting games.

### Search for Video Games

Step 1: Navigate to the main page of the application.
Step 2: Enter the name of the video game you want to search for in the search bar.
Step 3: Click the "Search" button or press "Enter."
Step 4: Browse through the search results displayed on the page.

### Add Games to Favorites

Step 1: From the search results, find the game you want to add to your favorites.
Step 2: Click the "Add to Favorites" button next to the game.
Step 3: The game will be added to your list of favorites, accessible from your profile page.

### Rate a Game

Step 1: Go to your saved games tab.
Step 2: Find the game you want to rate in your list of favorites.
Step 3: Select the rating (e.g., 1 to 5 stars) for the game.
Step 4: Your rating will be saved and displayed next to the game.

### Mark a Game as Played

Step 1: Go to your saved games tab.
Step 2: Find the game you want to mark as played in your list of favorites.
Step 3: Click the check box next to the game.
Step 4: The game’s status will be updated to indicate it has been played.

### Delete a Game from Favorites

Step 1: Go to your profile page.
Step 2: Find the game you want to delete from your favorites list.
Step 3: Click the trash icon next to the game.
Step 4: The game will be removed from your favorites list and inputted into the "Recently Deleted" list.

### View Your Profile

Step 1: Ensure you are logged in to your account.
Step 2: Click on your profile tab.
Step 3: Edit your bio and add an image.

## License

MIT License

---

© Aksana Hlebik. Stephen Cooper. Juan Garcia. Ronald Hoover. Adriana Nino. [Github Repo](https://github.com/AksanaH/game-grove). [Deployed Site]().
