// Menu Selection code from: https://blog.ourcade.co/posts/2020/phaser-3-ui-menu-selection-cursor-selector/ 
class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.cursors = null
        this.buttons = []
        this.selectedButtonIndex = 0
        this.buttonSelect = 0
    }
    

    create() {
        // this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'this is playScene').setOrigin(0.5)
        console.log('playscene')

        // keyboard input
        this.cursors = this.input.keyboard.createCursorKeys()

        // add in sprites and other assets into scene
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'battleBg').setOrigin(0.5, 0.5)
        this.add.image(100, 10, 'windmill').setOrigin(0,0).setScale(6)
        this.aceBattle = this.add.sprite(750, 460, 'aceBattle').setScale(3)
        this.menuBg = this.add.image(165, 520, 'menuBg').setScale(0.5)//.setVisible(false)
        this.buttonSelect = this.add.image(0, 0, 'selector').setVisible(false)

        // create attacking menu options
        // Putt button
        const puttButton = this.add.text(175, 470, 'Putt', {
            fontSize: '32px',
            align: 'left'
        }).setOrigin(0.5)//.setVisible(false)
        // Chip button
        const chipButton = this.add.text(175, 520, 'Chip', {
            fontSize: '32px',
            align: 'left',
        }).setOrigin(0.5)//.setVisible(false)
        // Drive button
        const driveButton = this.add.text(175, 570, ' Drive', {
            fontSize: '32px',
            align: 'left'
        }).setOrigin(0.5)//.setVisible(false)


        // delay appearance of menu for 3 seconds
        this.time.delayedCall(3000, () => {
            this.menuBg.setVisible(true)
            puttButton.setVisible(true)
            chipButton.setVisible(true)
            driveButton.setVisible(true)
            this.buttonSelect.setVisible(true)
        })

        this.buttons.push(puttButton)
        this.buttons.push(chipButton)
        this.buttons.push(driveButton)

        // start menu selection with first option
        this.selectButton(0)

        // once button selected transition to actual play
        puttButton.on('selected', () => {
            console.log('putt')

            // make everything invisible again
            this.menuBg.setVisible(false)
            puttButton.setVisible(false)
            chipButton.setVisible(false)
            driveButton.setVisible(false)
            this.buttonSelect.setVisible(false)

            // change sprite frame
            this.aceBattle.setFrame(2)
        })
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            puttButton.off('selected')
        })
    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		
		if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
		}
    }

    // move the button selector
    selectButton(index) {
        const currButton = this.buttons[this.selectedButtonIndex]

        const button = this.buttons[index]

        this.buttonSelect.x = button.x + button.displayWidth * 0.5 - 115
        this.buttonSelect.y = button.y

        this.selectedButtonIndex = index
    }

    // change button selected
    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change

        if (index >= this.buttons.length) {
            index = 0
        } else if (index < 0) {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    // confirm selection
    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex]   // currently selected button
        button.emit('selected')
    }
}