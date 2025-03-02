class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'

        // load sprites and spritesheets
        this.load.spritesheet('aceMap', 'ace_map_spritesheet.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('aceBattle', 'ace_battle_spritesheet.png', {
            frameWidth: 32,
            frameHeight: 64
        })

        // load audio
        this.load.audio('select', 'select.wav')

        // load map backgrounds/tilemaps
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'mapworld.json')

        // load other stuff
        this.load.image('menuBackground', 'main_title_screen.png')
    }

    create(){
        // Ace walk animations
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('aceMap', {
                start: 0,
                end: 1,
            })
        })

        this.anims.create({
            key: 'walk-side',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('aceMap', {
                start: 2,
                end: 2,
            })
        })


        this.scene.start('menuScene')
    }
}