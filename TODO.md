# yage 0.6
* rename config.json to game.json?
* Default map "src" attribute
* Clean up init module?

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
    * Sprites locked to viewport (ghost collision only)
    * Defaults for physics (velX, velY)
    * Physics "candy" and "ignoreCollision" cleanup
    * Collision data initialization
    * Physics collision action: (Bounce, slide-retain-velocity, slide-change-velocity)
    * Narrow collision engine
        * Refactor to more files?
        * Collision sensitivity modification
        * Collision information for the map
    * Test/[reimplement] loadmap op
* Packaging
    * Package game as executable?
* Misc
    * Preloading master sprites
    * Error handling for load/save operation when file not found
    * If I haven't already done it, remove the update function from the ui
    * If I haven't already done it, stop templated sprites from trying to name themselves in init/sprite

# After 1.0
* yage ide (name?) to help create the "assets" object for different games
* example game that runs on yage

# Later features
* At least one of these
    * Narrow collision engine: vectors (?)
        * Box - Vector
        * Circle - Vector
        * Vector - Vector
        * (Poly - Vector) ?
    * Narrow collision engine: poly/convex (Seperating Axis Theorem?)
* Creating sprite from screenshot

# Bugs/Code Improvements
* Figure out that weird "scale" function and how it should be placed.
* Bug with screepshot op and flipped images being clipped wrong near the
  edges. Try to get resolved with html2canvas first, but if not, do a 
  work around.
* Keep track of what sprites are moving and which aren't, rather than checking each one every frame?

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
