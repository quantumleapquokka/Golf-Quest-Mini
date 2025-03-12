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
            frameWidth: 48,
            frameHeight: 64
        })
        this.load.image('windmill', 'windmill_boss.png')

        // load audio
        this.load.audio('select', 'select.wav')
        this.load.audio('transition', 'goInHole.wav')
        this.load.audio('hit', 'hit.wav')
        this.load.audio('victory', 'levelWin.wav')
        this.load.audio('clubSelect', 'menuSelect.wav')
        this.load.audio('powerMeter', 'powerUp.wav')


        // load map backgrounds/tilemaps
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'mapworld.json')
        this.load.image('battleBg', 'boss_battle_bg.png')
        this.load.image('menuBackground', 'main_title_screen.png')
        this.load.image('gameOver', 'game_over.png')

        // load other stuff
        this.load.image('selector', 'selector.png')
        this.load.image('menuBg', 'menu_background.png')
        this.load.image('meter', 'meter.png')   // not in use
        this.load.image('meterE', 'meter_easy.png')
        this.load.image('meterM', 'meter_med.png')
        this.load.image('meterD', 'meter_hard.png')
        this.load.image('arrow', 'arrow.png')
        this.load.image('windmillHP', 'windmill_health.png')
        this.load.image('inst', 'instructions.png')
        
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

        // Ace battle golf swing animation
        this.anims.create({
            key: 'swing',
            frameRate: 5,
            repeat: 0,
            frames: [
                {key: 'aceBattle', frame:2},
                {key: 'aceBattle', frame:3},
                {key: 'aceBattle', frame:2},
                {key: 'aceBattle', frame:1},
            ]
        })


        this.scene.start('menuScene')
    }
}