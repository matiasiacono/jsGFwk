var Hazards = {
    onInit: function onInit(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = 16;
        this.height = 12;
        
        this.onUpdate = this.normalUpdate;
        
        if (param.move !== undefined) {
            this.speed = param.move.speed;
            this.moveAcc = 0;
            this.originalYPosition = param.y;
            this.originalXPosition = param.x;
            this.range = param.move.range;
            
            switch(param.move.style) {
                case 'upDown':
                    this.onUpdate = this.upDownUpdate;
                    break;
                case 'leftRight':
                    this.onUpdate = this.leftRightUpdate
                    break;
                case 'both':
                default:
                    this.onUpdate = this.bothUpdate
                    break;
            }
        }
    },
    
    bothUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.x = (Math.sin(this.moveAcc) * this.range) + this.originalXPosition;
        this.y = (Math.cos(this.moveAcc) * this.range) + this.originalYPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    leftRightUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.x = (Math.sin(this.moveAcc) * this.range) + this.originalXPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    upDownUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.y = (Math.sin(this.moveAcc) * this.range) + this.originalYPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    normalUpdate: function normalUpdate(delta) {
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    onUpdate: function onUpdate() { },

    onDraw: function onDraw(ctx) {
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(jsGFwk.Sprites.traps.image, this.x, this.y);
    }
};