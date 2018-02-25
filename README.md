# YAGE (Yet Another Game Engine)

## Overview

This project is meant to be an expirement with technologies to create a simple yet functional 2D game engine.

## Technologies used

The whole project is a node project, so when you download the source code you have to use `npm install` to get it set up.

The project uses Electron to create and run the app, and uses Facebook's React library with JSX to build the UI. The code is written in JavaScript using advanced features and JSX with help from Babel to transpile it.

The whole code base is designed to be run (impurely) functionally, it is possible that one day a lot of the code may be re-written with ClojureScript instead of JSX.

## Overall architecture goals

The overall idea is that THIS project will be a game *engine*, not a game itself. However, we will likely create
a game in order to know that the engine works. The difference is basically that an engine is reusable for many
games: Things specific to a game should not be included.

The components should be separated, with all the game-specific elements inside an "assets" folder. The game
engine is given the assets folder either at runtime, or in some config file (up for debate). The code
for the engine should all be in the "src" folder. Everything necessary for the game engine to run, except for
the asset folder, should be in the "build" folder when it is compiled.

Ideally, at some point we will make an IDE to make games using this, that will help people to create an 
"assets folder" artifact for the engine, rather than manually creating one. #stretchGoals

## Folder architecture

### assets

This folder contains the assets used to build the game. Except for the index.js files which help with loading the assets and caching them, nothing required for the game *engine* should be included in this folder, but everything else *should* be. Specific subfolders are currently:

#### assets/actors

An actor is basically a collection of related animations, used by sprites. Each actor contains the specific information for their animations. The animations are loaded from images in the `strips` sub-folder, where each frame of an animation is defined with 1 px "border" between the different frames. The timing of the frames is handled in the actor JSON files

#### assets/behaviors (not yet implemented)

Behaviors are the code that runs for a specific object (Sprite, Map, Game, etc.). Each of these objects would have a "behaviors" attribute that would list the behaviors they implement. 

#### assets/maps

Holds the information for a map, such as the background image, the sprites it contains, and (eventually) the collision data.

#### assets/templateSprites

Since some sprites are created over and over again, we can create template sprites to create sprites out of easily.

#### assets/config.json

Not a subfolder but a single file, this contains the configuration information for the game, including the starting map. The Game State object itself is created initally from this config file

#### index.js

All the index.js files in the assets folder are used to make the assets folder behave like a single object from a require statement. For example, `require('../assets').actors.bob` returns the object defined in the `bob.json` file in the `actors` folder.

### assets_test

Just another assets folder, to test dynamic loading of different asset folders.

### build

This folder contains the transpiled javascript code. Nothing created directly by a human should be in this folder, it should all be code transpiled from src. I.E., we should be able to delete this folder at any time, run `npm run build ; npm start`, and the program should run perfect. This folder is ignored in the git commits for this reason. However, all code written in the src folder should be written from the perspective of being in this folder, since this is the folder from which the code will actually be run.

### node_modules

Contains the required node modules for the project. Ignored by git, installed by `npm install`

### src

Contains all the source code. Nothing in here should be necessary once the code is compiled.

### src/main

Contains the main source code

### src/test

It is good practice to make unit and integration test code. I haven't done it yet, but this folder is there
to tell me to do it eventually haha.

### src/main/docs

Not sure if this is the best name for it or not, but this holds the source code that isn't transpiled, which right now is just the main HTML and CSS file. These files are copied straight into the build folder.

### src/main/jsx

Contains all the human-written code for the project. It is in the "jsx" folder right now to recognize that all the code is transpiled with features from babel and babel plugins, and also that we may in the future start reimplementing or adding code from other languages (such as clojurescript).

Currently, this should just contain the code for the engine, not for the entity behaviors IN the engine. Code for
behaviors should be in the assets folders. If we use JSX, we might have to find another way to build the
example behavior code (src/behavior/jsx ?).

Everything in this folder is designed to be pretty modular. It has a few independent code files and then folders for everything that contains a significant amount of code.

* behavior - Expiremental code, doesn't do anything yet
* launcher - The script that starts everything. It is the script run by the Electron "main" process
* run - This script that starts everything inside the window, it is run by the Electron "renderer" process. It also contains the "Game State Atom," which is a js object that contains all information about the state of the game. This folder contains the logic for the game loop.

#### src/main/jsx/init

Contains the code for transforming the asset files into the appropriate JavaScript Objects for the game to run. For instance, it takes the name of a template sprite, finds the template, and then copies it. In other words, it takes an asset folder and transforms it into the appropriate Game State Atom.

#### src/main/jsx/ui

Contains the code for drawing the game. It takes the Game State Atom as a parameter, and then constructs the visual from it. This folder is the only one that really needs to use React.  It also is in charge of collecting and maintaing the state of input from the user.

#### src/main/jsx/update

Contains the logic for updating the Game State Atom during every game loop frame. This folder currently contains very little, but it might eventually have to become multiple folders, since this is probably going to be the most complex part of the engine. It should include implementation for default behavior of sprites and maps, such as collision data and animation updates, as well as making sure the behaviors the game-creators define as used, such as controls for a player avatar or victory conditions.

## Game (Run) State Atom

The entire Run and Game State is stored in one object. To be functional, functions would take this game state atom and produce a modified one each time.

The basic structure of the Game state atom is...
* Game
    * Map
        *  Sprites
            * Player (Actor reference, animation information)
            * Physics
            * Other things?

The specifics of the structure change over time, and are open to being modified. However, the information needed to create the specific Game State should all be in the various asset files, and running the `init` folder's source on these files should __always__ produce a __stable__ game state object (e.g., all default values should be filled in, and no errors should arise from accessing attributes of the game). 

The only exception to this is when the asset file does not define a required attribute. It would be nice in the future to implement some feature to detect missing required attributes, and also to create some documentation of the specifics of the Game State (future todo items).

