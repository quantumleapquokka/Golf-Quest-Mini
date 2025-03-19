class Ace extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(1.5)
        this.setSize(27,27)
        this.setCollideWorldBounds(true)

        this.VEL = 100
        this.keys = scene.cursors

        scene.stateMachine = new StateMachine("idle", {
            idle: new IdleState(),
            move: new MoveState()
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, ace) {
        ace.setVelocity(0)
        ace.anims.stop()
    }
    execute(scene, ace) {
        const { left, right, up, down } = ace.keys

        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, ace) {
        const { left, right, up, down } = ace.keys
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
            ace.anims.play("walk", true)
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
            ace.anims.play("walk", true)
        }

        direction.normalize();
        ace.setVelocity(ace.VEL * direction.x, ace.VEL * direction.y);
        hero.anims.play(`walk-${hero.direction}`, true)
        
        if (!left.isDown && !right.isDown && !up.isDown && !down.isDown) {
            this.stateMachine.transition("idle");
        }
    }
}