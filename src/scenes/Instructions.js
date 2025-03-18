class Instructions extends Phaser.Scene {
    constructor() {
        super("instScene")
    }

    create() {
        // background
        this.cameras.main.setBackgroundColor('#A8E178')

        // pink background
        this.add.image(game.config.width/2, game.config.height/2, 'menuBg').setScale(2, 1.5).setOrigin(0.5)
        
        // instruction text
        this.add.image(game.config.width/2 - 15, game.config.height/2 + 10, 'inst').setOrigin(0.5)

        // display menu text
        this.add.text(game.config.width/2, game.config.height/1 - borderUISize - borderPadding, 'press [space] to return to main menu', {
            fontStyle: 'bold',
            fontSize: '24px',
            align: 'left',
            // color: '#000'
        }).setOrigin(0.5)
        
        this.add.text(game.config.width/2 + 15, 95, '+', {
            fontSize: '50px',
            align: 'left',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        
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