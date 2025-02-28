class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
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

        // load other stuff
        this.load.image('menuBackground', 'main_title_screen.png')
    }

    create() {
        // background 
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBackground').setOrigin(0.5, 0.5)

        // let menuConfig = {
        //     fontFamily: 'fantasy',
        //     fontSize: '125px',
        //     color: '#513f60',
        //     backgroundColor: '',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0,
        //     align: 'center'
        // }


        // define keys
        // this.keys = this.input.keyboard.createCursorKeys()
        // keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        // this.keys.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)

        // skip to play/map scene for debugging 
        // this.scene.start("mapScene")
        // this.scene.start("playScene") 

    }

    update() {
        // moving on from one scene to the next depending on input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select')
            this.scene.start("mapScene")
        }

        // if (Phaser.Input.Keyboard.JustDown(keyC)) {
        //     this.sound.play('select')
        //     this.scene.start("playScene")
        // }

        // if (Phaser.Input.Keyboard.JustDown(keyI)) {
        //     this.sound.play('select')
        //     this.scene.start("playScene")
        // }
        
    }
    
}