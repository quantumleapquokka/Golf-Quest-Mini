class End extends Phaser.Scene {
    constructor() {
        super("endScene")
    }

    create() {
        // background
        this.add.image(game.config.width/2, game.config.height/2, 'gameOver').setOrigin(0.5)
        
        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        
        
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.sound.play('select')
            this.scene.stop("playScene")
            this.scene.start("menuScene")
        }
        
    }
    
}