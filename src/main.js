// Game Title: Golf Quest Mini
// Name: Samantha Siew
// Major Phaser Components: tilemaps, cameras, animation manager, physics system, tween manager
/**
 * Something I added to the game, different than the original shown game is having a maximum par that the user has to score under or else they lose.
 * Also, with the par being 7, the player can't only use the easiest golf club, so they are challenged to try two or three of them.
 * If they only used the easiest club, their par would be over the maximum par.
 * The meter and timed shot mechanic was also a new feature that was not in the original, so that there was a bit of challenge in the game.
*/



'use strict'

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1000,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Menu, Instructions, Map, Play, Credits, End]
}
let game = new Phaser.Game(config)

// UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let { width, height } = game.config