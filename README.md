Country Explorer

A simple and interactive frontend web application to explore information about countries around the world.
Built using HTML, CSS, and JavaScript, this project fetches country data from an API and displays it in a user-friendly UI.

 Features
   View list of all countries
   Search countries by name
   Detailed view for each country
   Add countries to favourites
   Smooth animations and clean UI
   Responsive design

Project Structure

Country_Explorer/
│
├── index.html          # Main entry point
├── App.js              # Main logic controller
├── Api.js              # Handles API requests
├── Helpers.js          # Utility/helper functions
├── CountryCard.js      # UI for country preview card
├── CountryDetail.js    # UI for detailed country info
├── Favourites.js       # Manage favourite countries
├── Base.css            # Base styling
├── Components.css      # Component-specific styling
└── Animations.css      # Animations and transitions

How It Works

Api.js fetches country data from a public API.
App.js controls rendering and interaction flow.
Countries are displayed as cards using CountryCard.js.
Clicking a card opens detailed info via CountryDetail.js.
Users can add/remove countries from favourites handled by Favourites.js.

Technologies Used

HTML5
CSS3
Vanilla JavaScript (ES6)
REST Countries API
