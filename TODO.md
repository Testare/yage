# Essential Features
* Git organization
* Better documentation
* Behavior updates
    * More util functions for Sprites
    * Parameters for behavior (Customization for behaviors in Sprite JSON)
    * Behavior creation utils
    * Behavior initialization
    * Behaviors that only need to run initially? (Possible "onstart" attribute separate from behaviors)
    * Behavior game-dev-level compilation
    * Behaviors React-style JSX?
    * Behaviors for Levels, Viewport, Game, etc.
    * Sprite user-defined state?
    * Sprite hasBehavior
* Narrow collision engine
* Multiple maps on one screen?
* HTML Sprites
* Asset loading
    * Update draw-sprite to not have the background-url for sprites hardcoded
    * Also for draw-map backgrounds
    * Also for audio
* Actor loading: Preload background images so switching animations is smoother

# Bugs/Code Improvements
* Figure out that weird "scale" function and how it should be placed.

# Extra features
* JSDocs?
* ClojureScript?
* Other languages for behaviors?

# Areas for optimization
* Behaviors pulled to centralized place
* Music/Audio soundboards to preload sounds 
* Audio SFX played using cloneNode(true).play() from sound boards rather than node creation