// Game Title: Golf Quest Mini
// Name: Samantha Siew
// 




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
            debug: true
        }
    },
    scene: [ Load, Menu, Instructions, Map, Play, Credits]
}
let game = new Phaser.Game(config)

// UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let { width, height } = game.config