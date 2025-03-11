class Instructions extends Phaser.Scene {
    constructor() {
        super("instScene")
    }

    create() {
        // background
        this.cameras.main.setBackgroundColor('#A8E178')
        this.add.image(game.config.width/2, game.config.height/2, 'menuBg').setScale(2, 1.5).setOrigin(0.5)
        this.add.image(game.config.width/2, game.config.height/2, 'inst').setOrigin(0.5)

        let creditsConfig = {
            fontFamily: 'times',
            fontSize: '80px',
            color: '#513f60',
            backgroundColor: '',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            aligh: 'center'
        }

        // display menu text
        // this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, '~INSTRUCTIONS~', creditsConfig).setOrigin(0.5)
        
        
        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        
        
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.sound.play('select')
            this.scene.start("menuScene")
        }
        
    }
    
}