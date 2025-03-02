class Ace extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(1.5)
        this.setCollideWorldBounds(true)

        this.VEL = 100
        this.keys = scene.cursors

        scene.stateMachine = new StateMachine("idle", {
            idle: new IdleState(),
            move: new MoveState()
        }, [scene, this])
    }
    
    // update() {
    //     this.stateMachine.step()
    // }
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

        // let direction = new Phaser.Math.Vector2(0,0)

        // if (up.isDown || down.isDown) {
        //     direction.y = -1
        //     ace.anims.play("walk", true)
        // }

        // if (left.isDown || right.isDown) {
        //     direction.x = left.isDown ? -1 : 1
        //     ace.anims.play("walk-side", true)
        // }
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
            ace.anims.play("walk", true)
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
            ace.anims.play("walk", true)
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
            ace.anims.play("walk-side", true)
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
            ace.anims.play("walk-side", true)
        }

        direction.normalize();
        ace.setVelocity(ace.VEL * direction.x, ace.VEL * direction.y);
        hero.anims.play(`walk-${hero.direction}`, true)
        
        if (!left.isDown && !right.isDown && !up.isDown && !down.isDown) {
            this.stateMachine.transition("idle");
        }
    }
}