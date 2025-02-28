class Map extends Phaser.Scene{
    constructor() {
        super("mapScene")
    }

    init() {
        this.VEL = 300
    }

    create(){
        // tilemap tingz


        // add Ace
        //const aceSpawn = map.findObject('Spawns', obj => obj.name === 'aceSpawn')
        //console.log(aceSpawn)
        //this.ace = this.physics.add.sprite(aceSpawn.x, aceSpawn.y, 'ace', 0)
        this.aceMap = this.physics.add.sprite(32, 32, 'aceMap', 0)
        this.aceMap.body.setCollideWorldBounds(true)

        // Ace walk animation

        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    
        // input
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.aceMap.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}