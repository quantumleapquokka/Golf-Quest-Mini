// Menu Selection code from: https://blog.ourcade.co/posts/2020/phaser-3-ui-menu-selection-cursor-selector/ 
// Health bar: https://phaser.io/examples/v3.85.0/game-objects/graphics/view/health-bars-demo
class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.cursors = null
        this.buttons = []
        this.selectedButtonIndex = 0
        this.buttonSelect = 0

        this.currentClub = null
        this.isStopped = false
        this.par = 0

        // health bar
        this.healthBarFill = null
        this.maxHealth = 100
        this.currentHealth = 100
    }
    

    create() {
        console.log('playscene')

        this.currentClub = null
        this.isStopped = false
        this.par = 0
        this.isMeterActive = false

        // health bar
        this.healthBarFill = null
        this.maxHealth = 100
        this.currentHealth = 100
        

        // keyboard input
        this.cursors = this.input.keyboard.createCursorKeys()
        // this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)        // emergency exit

        // add in sprites and other assets into scene
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'battleBg').setOrigin(0.5, 0.5)
        this.windmill = this.add.image(100, 10, 'windmill').setOrigin(0,0).setScale(6)
        this.aceBattle = this.add.sprite(750, 460, 'aceBattle').setScale(3)
        this.menuBg = this.add.image(165, 520, 'menuBg').setScale(0.5).setVisible(false)
        this.buttonSelect = this.add.image(0, 0, 'selector').setVisible(false)
        this.meterE = this.add.image(140, 550, 'meterE').setScale(3.1).setVisible(false)
        this.meterM = this.add.image(140, 550, 'meterM').setScale(3.1).setVisible(false)
        this.meterD = this.add.image(140, 550, 'meterD').setScale(3.1).setVisible(false)
       
        // health bar filling update
        this.healthBarBackground = this.add.rectangle(670, 105, 300, 20, 0xFFFFFF).setVisible(false)
        this.healthBarFill = this.add.rectangle(670, 105, 300, 20, 0x00ff00).setVisible(false)
        this.windmillHP = this.add.image(670, 85, 'windmillHP').setScale(1.3).setVisible(false)

        // par

        // Create hit meter
        this.arrow = this.add.image(140, 580, 'arrow').setScale(0.5).setVisible(false)

        
        // add tween for the sprites to slide into the scene
        this.windmill.setX(this.cameras.main.width + this.windmill.width)
        this.aceBattle.setX(-this.aceBattle.width)
        this.tweens.add({
            targets: this.windmill,
            x: 100,
            duration: 1000,
            ease: 'Power2'
        })
        this.tweens.add({
            targets: this.aceBattle,
            x: 750,
            duration: 1000,
            ease: 'Power2'
        })


        // create attacking menu options
        // Putt button
        const puttButton = this.add.text(175, 470, 'Putt', {
            fontSize: '32px',
            align: 'left'
        }).setOrigin(0.5).setVisible(false)
        // Chip button
        const chipButton = this.add.text(175, 520, 'Chip', {
            fontSize: '32px',
            align: 'left',
        }).setOrigin(0.5).setVisible(false)
        // Drive button
        const driveButton = this.add.text(175, 570, ' Drive', {
            fontSize: '32px',
            align: 'left'
        }).setOrigin(0.5).setVisible(false)


        // delay appearance of menu for 2 seconds
        this.time.delayedCall(1500, () => {
            this.healthBarFill.setVisible(true)
            this.showMenu()
        })

        this.buttons.push(puttButton)
        this.buttons.push(chipButton)
        this.buttons.push(driveButton)

        // start menu selection with first option
        this.selectButton(0)

        // once button selected transition to actual play
        puttButton.on('selected', () => {
            console.log('putt')
            this.aceBattle.setFrame(2)
            this.startMeter('putt')
            this.updateHealth()
        })
        chipButton.on('selected', () => {
            console.log('chip')
            this.aceBattle.setFrame(2)
            this.startMeter('chip')
            this.updateHealth()
        })
        driveButton.on('selected', () => {
            console.log('drive')
            this.aceBattle.setFrame(2)
            this.startMeter('drive')
            this.updateHealth()
        })
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            puttButton.off('selected')
            chipButton.off('selected')
            driveButton.off('selected')
        })

        this.parText = this.add.text(game.config.width / 2 + 50, 800, `Par: ${this.par}`, {
            fontSize: '50px',
            align: 'left',
            color: '#000',
        }).setOrigin(0.5)
    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		
		if (!this.isStopped) {
            this.arrow.angle += this.direction * this.meterSpeed
            if (this.arrow.angle >= 90 || this.arrow.angle <= -90) {
                this.direction *= -1
            }
        }

        if (this.isMeterActive) return

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

        // check if score is 0 yet
        if (this.currentHealth <= 0 && this.par <= 5) {
            this.add.text(game.config.width / 2, game.config.height / 2, 'VICTORY!', {
                fontSize: '120px',
                align: 'center',
            })
            this.sound.play('victory')
            this.isMeterActive = true
            this.time.delayedCall(2000, () => {
                this.scene.start("endScene")
            })
        } else if (this.currentHealth <= 0 && this.par > 5) {
            this.add.text(game.config.width / 2, game.config.height / 2, 'YOU LOST,\nTRY AGAIN!', {
                fontSize: '120px',
                align: 'center',
            })
            this.time.delayedCall(2000, () => {
                this.scene.stop("playScene")
                this.scene.start("mapScene")
            })
        }
    }

    // move the button selector
    selectButton(index) {
        const currButton = this.buttons[this.selectedButtonIndex]

        const button = this.buttons[index]

        this.buttonSelect.x = 97    //button.x + button.displayWidth * 0.5 - 115
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
        this.sound.play('clubSelect')
        button.emit('selected')
    }

    // Functions for handling the starting and functioning of the moving meter 
    startMeter(club){
        this.currentClub = club
        this.isStopped = false
        this.isMeterActive = true

        this.par += 1   // increment par

        this.hideMenu()

        
        this.arrow.setVisible(true)
        this.arrow.angle = -90
        this.direction = 1

        this.sound.play('powerMeter')

        if(club === 'putt') {
            this.meterE.setVisible(true)
            this.greenRange = [-10, 10]
            this.yellowRange = [-30, 30]
            this.meterSpeed = 1.5
        } else if(club === 'chip') {
            this.meterM.setVisible(true)
            this.greenRange = [-30, 30]
            this.yellowRange = [-40, 40]
            this.meterSpeed = 3.5
        } else if(club === 'drive') {
            this.meterD.setVisible(true)
            this.greenRange = [-50, 50]
            this.yellowRange = [-60, 60]
            this.meterSpeed = 5.5
        }

        this.input.once('pointerdown', () => {this.stopPointer(), this.sound.play('hit')})
    }
    stopPointer() {
        if(this.isStopped) return
        this.isStopped = true

        this.aceBattle.play('swing')
        
        let angle = this.arrow.angle
        if (angle > this.greenRange[0] && angle < this.greenRange[1]) {
            this.successHit()
        } else if (angle > this.yellowRange[0] && angle < this.yellowRange[1]) {
            this.weakHit()
        } else {
            this.failHit()
        }

        // Hide meter and show menu again
        this.time.delayedCall(2000, () => {
            this.arrow.setVisible(false)
            this.meterE.setVisible(false)
            this.meterM.setVisible(false)
            this.meterD.setVisible(false)
            // this.graphics.clear()
            this.showMenu()
            this.isMeterActive = false
        })
    }

    successHit() {
        console.log("windmill hit")

        // decrease the hp
        this.decreaseHealth(20)
    }

    weakHit() {
        console.log("yellow hit less points")

        // decrease the hp less than successful hit
        this.decreaseHealth(10)
    }

    failHit() {
        console.log("windmill missed")

        // still increment the par
        this.increaseHealth(10)
    }

    showMenu() {
        this.menuBg.setVisible(true)
        this.buttons.forEach(button => button.setVisible(true))
        this.buttonSelect.setVisible(true)
        this.windmillHP.setVisible(true)
    }

    hideMenu() {
        this.menuBg.setVisible(false)
        this.buttons.forEach(button => button.setVisible(false))
        this.buttonSelect.setVisible(false)
    }

    //Health bar stuff
    // update bar width
    updateHealth() {
        this.healthBarFill.width = (this.currentHealth / this.maxHealth) * this.healthBarBackground.width
    }

     // Update health on hit
     decreaseHealth(amount) {
        this.currentHealth -= amount
        if (this.currentHealth < 0) this.currentHealth = 0
        this.updateHealth()
    }

    increaseHealth(amount) {
        this.currentHealth += amount
        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth
        this.updateHealth()
    }
}