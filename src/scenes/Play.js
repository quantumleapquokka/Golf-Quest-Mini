class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'this is playScene').setOrigin(0.5)
        console.log('playscene')

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'battleBg').setOrigin(0.5, 0.5)
        this.add.image(50, 10, 'windmill').setOrigin(0,0).setScale(6)

        this.add.sprite(750, 460, 'aceBattle').setScale(3)

    }

    update() {
    }
}