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

        //this.cameras.main.setZoom(2)
        
        bgLayer.setScale(3)
        water.setScale(3)
        waterback.setScale(3)
        house.setScale(3)
        greenery.setScale(3)

        greenery.setCollisionByProperty({ collides: true })
        house.setCollisionByProperty({ collides: true })
        waterback.setCollisionByProperty({ collides: true })

        // add Ace
        const aceSpawn = map.findObject('Spawns', obj => obj.name === 'aceSpawn')
        console.log(aceSpawn)
        this.ace = this.physics.add.sprite(aceSpawn.x, aceSpawn.y, 'aceMap', 0)
        this.ace.setScale(1.5)
        // this.aceMap = this.physics.add.sprite(32, 32, 'aceMap', 0)
        this.ace.body.setCollideWorldBounds(true)

        // Ace walk animations
        this.anims.create({
            key: 'walk-down',
            frameRate: 16,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('aceMap', {
                start: 0,
                end: 1,
            })
        })

        // cameras and bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels * 3, map.heightInPixels * 3)
        this.cameras.main.startFollow(this.ace, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels * 3, map.heightInPixels * 3)

        this.physics.add.collider(this.ace, greenery)
        this.physics.add.collider(this.ace, house)
        this.physics.add.collider(this.ace, waterback)
    
        // input
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
            this.ace.play('walk-down')
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
            this.ace.play('walk-down')
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
            this.ace.play('walk-down')
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
            this.ace.play('walk-down')
        }

        this.direction.normalize()
        this.ace.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}