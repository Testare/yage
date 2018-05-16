# yage 0.5
* Behavior "create" method
* Behavior creation utils
* remove "utils" from behavior

# Essential Features for yage-1.0
* Git organization
    * Git branches (master, devo, feature branches)
    * Github issue tracking
* Better documentation
    * Code
        * Commented code added for clarity
        * Commented code removed for clarity
    * GitBook/markdown overall documentation
        * Updated README
        * Guide on how it works (so others could help build the engine)
        * Guide on how to use it (so others can make games with the engine)
            * API Documentation for the different behavior utils
            * Assets folder structure
            * Game state structure
    * Additional tips for friends not used to using node, ES6, React, or
      functional programming
* Behavior updates
    * More util functions for Sprites
    * Behavior initialization
    * Behaviors that only need to run initially? (Possible "onstart" attribute
      separate from behaviors, or behaviors that remove themselves)
    * Self-terminating Temporary behaviors ("effects")
    * Behavior game-dev-level compilation
    * Behaviors React-style JSX?
    * Behaviors for Maps and Game
    * Sprite hasBehavior
    * Behavior while paused
    * behavior-utils chaining?
* HTML Sprites
    * Sprites created using normal html rather than sprite json
* Physics
    * Actor XY-offset
    * Sprites locked to viewport (ghost collision only)
    * Narrow collision engine
        * ignoreCollision
        * Box - Box
        * Circle - Box
        * Circle - Circle
        * Optional draw collision
        * Collision information for the map
        * Collision lists
* Asset loading
    * When assets not found, throw better errors
    * Load asset folders without needing the specified "index.js" files
    * Convention > Configuration: defaults 'n such
        * Animation image names: actor$animation.png or actor.png(animation ===
          'main'
* Packaging
    * Package game as executable?
* Ops system
    * Single-use commands that don't directly affect or can't be well
      represented in the game state object, or affect game state in a way that
      doesn't work well mid-update
    * Pause game
    * Save game state
    * Loading new level
    * Loading game state

# After 1.0
* yage ide (name?) to help create the "assets" object for different games
* example game that runs on yage

# Later features
* Narrow collision engine: vectors
    * Box - Vector
    * Circle - Vector
    * Vector - Vector

# Bugs/Code Improvements
* Figure out that weird "scale" function and how it should be placed.

# Possible extra features
* Multiple maps on one screen?
* JSDocs?
* ClojureScript?
* Other languages for behaviors?
* Some sort of macro so that behaviors can be written without having to save
  the state changes separately each time

# Areas for optimization
* Behaviors pulled to centralized place
* Music/Audio soundboards to preload sounds 
* Audio SFX played using cloneNode(true).play() (using ops system) from sound
  boards rather than node creation
