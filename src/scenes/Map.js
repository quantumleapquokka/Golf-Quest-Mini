class Map extends Phaser.Scene{
    constructor() {
        super("mapScene")
    }

    init() {
        this.VEL = 300
    }

    create(){
        // tilemap tingz
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const water = map.createLayer('water', tileset, 0, 0)
        const waterback = map.createLayer('waterback', tileset, 0, 0)
        const house = map.createLayer('house', tileset, 0, 0)
        const greenery = map.createLayer('greenery', tileset, 0, 0)
        const holeLayer = map.createLayer('hole', tileset, 0, 0)

        this.cameras.main.setZoom(2)
        
        bgLayer.setScale(3)
        water.setScale(3)
        waterback.setScale(3)
        house.setScale(3)
        greenery.setScale(3)
        holeLayer.setScale(3)

        greenery.setCollisionByProperty({ collides: true, hole: true })
        house.setCollisionByProperty({ collides: true, hole: true })
        waterback.setCollisionByProperty({ collides: true })

        // add Ace
        const aceSpawn = map.findObject('Spawns', obj => obj.name === 'aceSpawn')
        console.log(aceSpawn)
        this.ace = new Ace(this, aceSpawn.x, aceSpawn.y, "aceMap", 0, "down")
        this.add.existing(this.ace)
        // this.ace = this.physics.add.sprite(aceSpawn.x, aceSpawn.y, 'aceMap', 0)
        // this.ace.setScale(1.5)
        // // this.aceMap = this.physics.add.sprite(32, 32, 'aceMap', 0)
        // this.ace.body.setCollideWorldBounds(true)

        // cameras and bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels * 3, map.heightInPixels * 3)
        this.cameras.main.startFollow(this.ace, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels * 3, map.heightInPixels * 3)

        this.physics.add.collider(this.ace, greenery)
        this.physics.add.collider(this.ace, house)
        this.physics.add.collider(this.ace, waterback)
        this.physics.add.collider(this.ace, holeLayer)

        // transition to next scene if sprite is touching the golf hole 
        holeLayer.setTileIndexCallback(901, () => {
            // Fade out first
            this.cameras.main.fadeOut(1000, 0, 0, 0) // 1000ms (1 second fade-out)

            // Wait until the fade-out is complete, then start the scene
            this.time.delayedCall(1000, () => {
                this.scene.start("playScene")
                this.cameras.main.fadeIn(2000, 0, 0, 0) // Fade in the next scene
            })
        }, this)
        this.physics.add.overlap(this.ace, holeLayer, (player, layer) => {
            // Determine the tile at the player's world position
            let tile = holeLayer.getTileAtWorldXY(player.x, player.y);
            // if(tile && tile.properties.hole) {
                
            //     console.log("Next scene")
            //     this.scene.start("playScene")
            // }
        }, null, this)
        
        
        // input
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.ace.update()       // update ace's movements
        this.direction = new Phaser.Math.Vector2(0)

        // handle movements and animation indication for movement
        if(this.cursors.left.isDown) {
            this.direction.x = -1
            this.ace.direction = 'walk-side'
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
            this.ace.direction = 'walk-side'
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
            this.ace.direction = 'walk'
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
            this.ace.direction = 'walk'
        }

        // stop movement at 'idle' position, which is the last walk frame
        if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        this.direction.normalize()
        this.ace.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
        this.ace.anims.play(`${this.ace.direction}`, true)

        
    }
}

