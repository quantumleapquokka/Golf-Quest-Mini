class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        // background color
        this.cameras.main.setBackgroundColor('#ff6ca2') 

        let creditsConfig = {
            fontFamily: 'times',
            fontSize: '80px',
            color: '#000000',
            backgroundColor: '',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            align: 'center'
        }

        // display menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding- 50, '★CREDITS★', creditsConfig).setOrigin(0.5)
        creditsConfig.fontSize = '35px'

        this.add.text(game.config.width/2, game.config.height/3, 'Code - Samantha Siew', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.5, 'Visual Assets(sprites, ui, etc.) - Samantha Siew', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.0, 'Sound Assets: made on onlinesound.net \nor found on internet copyright free - Samantha Siew', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/1.5, 'TV Show - Steven Universe (S1 EP19 [Rose\'s Room\])', creditsConfig).setOrigin(0.5)

        creditsConfig.backgroundColor = '#40f549'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding * 5, 'press [SPACE] to go back to main menu', creditsConfig).setOrigin(0.5)
        
        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)    }

    update() {
        
        
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.sound.play('select')
            this.scene.start("menuScene")
        }
        
    }
    
}