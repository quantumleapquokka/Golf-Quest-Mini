class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'

        // load sprites and spritesheets
        this.load.spritesheet('aceMap', 'ace_map_spritesheet.png', {
            frameWidth: 34,
            frameHeight: 34
        })
        this.load.spritesheet('aceBattle', 'ace_battle_spritesheet.png', {
            frameWidth: 48,
            frameHeight: 64
        })
        this.load.image('windmill', 'windmill_boss.png')

        // load audio
        this.load.audio('select', 'sound/select.wav')
        this.load.audio('transition', 'sound/goInHole.wav')
        this.load.audio('hit', 'sound/hit.wav')
        this.load.audio('victory', 'sound/levelWin.wav')
        this.load.audio('clubSelect', 'sound/menuSelect.wav')
        this.load.audio('powerMeter', 'sound/powerUp.wav')
        this.load.audio('slideIn', 'sound/slideIn.wav')
        this.load.audio('bgM', 'sound/map_bgm.wav')
        this.load.audio('bgmP', 'sound/play_bgm.wav')
        this.load.audio('titlebgm', 'sound/title.wav')
        this.load.audio('health_down', 'sound/health_down.wav')


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
        this.load.image('par', 'par.png')
        this.load.image('ball', 'ball.png')
        
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
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('aceMap', {
                start: 2,
                end: 2,
            })
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('aceMap', {
                start: 3,
                end: 3,
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