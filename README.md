Front end of my movie app, built in React

Features: 
- All users can view every movie, review, actor and director
- Logged in users have access to "Watchlist" and "Watched Movies" pages and they can add movies to both of those pages, as well as remove them
- Adding a rating to a movie in the "Watched Movies" page is done by clicking the stars below the name of the movie. Doing that will send that rating to the films' "ratings" array, which is used to calculate the average  score of the movie
- Logged in users can also post their reviews to movies by going to the page of the film and clicking the "Add Review" button, which will open a popup window where they can fill out the contents of the review
- If the user has already rated the film, then the stars in the "Add Review" popup will automitically be filled acording to the rating the user gave the film
- When posting the review, if the user chooses a rating that is different than the one they initially gave it, the old rating will be replaced with the one the user gave it in the review
- Removing the movie from the "Watched Movies" page will also remove the rating from the "ratings" array of the film, as well as delete every review the user posted for that movie
- The user can delete their own reviews by findig them on the film page and clicking the delete button next to it
- When the page initially loads it will check whether the user is and admin or not, and if they are they have access to certain features

Admin Features:
- The admin can add movies, actors and directors by hovering over the "Admin Options" tab on the navbar and selecting which one they want to add
- The website has the ability to handle image upload when adding or editing movies, actors and directors as an admin
- On the "Add Movie" page all actors and directors will be fetched so the select tags can be filled with them
- Can add one director and multiple actors per film
- The admin can also delete and edit movies, actors and directors
- Deleting a movie will delete its poster from the server and it will remove that movie from every watchlist and watched movies array of every user who had it in there, it will also delete every review that movie had and it will remove that film from every director who directed it and every actor who starred in it
- Deleting a director will delete their image from the server and also delete every movie they directed, and for every movie deleted the above will happen
- Deleting an actor will delete their image from the server and remove them from every movie they starred in
- When editing a movie, director or actor, if the admin does not provide a new image the old one will be used. If the admin does provide a new image, the new one will be used and the old one will be deleted from the server