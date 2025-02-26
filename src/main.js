// Game Title: Golf Quest Mini
// Name: Samantha Siew
// Hours Spent: 
'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Map, Play, Credits ]
}
let game = new Phaser.Game(config)

// Key bindings
let keySPACE

// UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let { width, height } = game.config