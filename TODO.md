# Essential Features for 1.0
* Git organization
* Better documentation
* Behavior updates
    * More util functions for Sprites
    * Parameters for behavior (Customization for behaviors in Sprite JSON)
    * Behavior creation utils
    * Behavior initialization
    * Behaviors that only need to run initially? (Possible "onstart" attribute separate from behaviors, or behaviors that remove themselves)
    * Behavior game-dev-level compilation
    * Behaviors React-style JSX?
    * Behaviors for Levels, Viewport, Game, etc.
    * Sprite user-defined state?
    * Sprite hasBehavior
    * Self-terminating Temporary behaviors ("effects")

* Narrow collision engine
    * Collision behaviors: ghost - elastic - inelastic
    * Box - Box
    * Circle - Box
    * Circle - Circle
    * Optional draw collision
    * Collision information for the map
* HTML Sprites
* Asset loading
    * When assets not found, throw better errors
    * Load asset folders without needing the specified "index.js" files
* Actor loading: Preload background images so switching animations is smoother
* Rename "build" to "yage"?
* Determine how to use yage as a node dependency so NPM can be used to build games

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

# Areas for optimization
* Behaviors pulled to centralized place
* Music/Audio soundboards to preload sounds 
* Audio SFX played using cloneNode(true).play() from sound boards rather than node creation
