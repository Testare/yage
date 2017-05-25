module Sprites where

import Control.Monad.State
import Data.Map as M

data WorldState = WorldState (Map SpriteRef Sprite) String deriving(Show)
type SpriteRef = String
data Sprite = Sprite Int Int deriving(Show)

addSprite' sptref spt (WorldState sprmap str) =
    (sptref,(WorldState (insert sptref spt sprmap) str))
addSprite'' :: SpriteRef -> Sprite -> State WorldState SpriteRef
addSprite'' sptref spt = state $ addSprite' sptref spt

addSprite :: SpriteRef -> Sprite -> State WorldState SpriteRef
addSprite sptref spt = state $ \(WorldState sprmap str) -> 
    (sptref,(WorldState (insert sptref spt sprmap) str))

safeAddSprite :: SpriteRef -> Sprite -> State WorldState (Maybe SpriteRef)
safeAddSprite sptref spt = state $ \(WorldState sprmap str) ->  if member sptref sprmap 
    then (Nothing,(WorldState sprmap str))
    else (Just sptref,(WorldState (insert sptref spt sprmap) str))

move :: Int -> Int -> Sprite -> Sprite
move xdiff ydiff (Sprite x y) = (Sprite (x+xdiff) (y+ydiff)) 

moveUp ::Int -> Sprite -> Sprite
moveUp = move 0 . negate
moveDown = move 0
moveLeft = flip move 0 . negate
moveRight = flip move 0


myworld = WorldState empty "my world"

createWorld = do
    george <- addSprite "George" (Sprite 50 50)
    wat <- safeAddSprite george (Sprite 40 40)
    addSprite "Kayla" (Sprite 30 30)
    michael <- addSprite "Michael" (Sprite 20 20)
    addSprite'' michael (Sprite 10 10)
    return wat

