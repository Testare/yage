# yage 0.6

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
    * Initialize behaviors for cloned sprites
    * Behavior "create" method
    * Behavior creation utils
    * remove "utils" from behavior
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
    * Collision checking behavior
    * Sprite Groups
    * Collision Lists
    * Sprites locked to viewport (ghost collision only)
    * Narrow collision engine
        * ignoreCollision
        * Box - Box
        * Circle - Box
        * Circle - Circle
        * Optional draw collision
        * Collision information for the map
        * Collision lists
* Packaging
    * Package game as executable?

# After 1.0
* yage ide (name?) to help create the "assets" object for different games
* example game that runs on yage

# Later features
* Narrow collision engine: vectors
    * Box - Vector
    * Circle - Vector
    * Vector - Vector
* Creating sprite from screenshot

# Bugs/Code Improvements
* Figure out that weird "scale" function and how it should be placed.
* Bug with screepshot op and flipped images being clipped wrong near the
  edges. Try to get resolved with html2canvas first, but if not, do a 
  work around.

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
