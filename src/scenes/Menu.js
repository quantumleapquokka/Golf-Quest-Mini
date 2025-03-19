class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
        this.keys = null
    }

    create() {
        // background 
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBackground').setOrigin(0.5, 0.5)

        // sound
        this.bgm = this.sound.add('titlebgm', {loop: true})
        this.bgm.play()


        // define keys
        this.keys = this.input.keyboard.createCursorKeys()
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)        
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)

        // skip to play/map scene for debugging 
        // this.scene.start("mapScene")
        // this.scene.start("playScene") 
        // this.scene.start("instScene")

    }

    update() {
		const keySPACE = Phaser.Input.Keyboard.JustDown(this.keys.space)

        // moving on from one scene to the next depending on input
        if (keySPACE) {
            this.sound.stopAll()
            this.sound.play('select')
            this.scene.start("mapScene")
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.sound.play('select')
            this.scene.start("creditsScene")
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
            this.sound.play('select')
            this.scene.start("instScene")
        }
        
    }
    
}