

class sprite {
    constructor(config){
        // Setup Image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = ()=>{
            this.isLoaded = true;
        }

        // Shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow){

            this.shadow.src = "images/characters/shadow.png";
        }
        this.shadow.onload = ()=>{
            this.isShadowLoaded = true;
        }
        

        // Configure Animation and Initial State
        this.animations=config.animations||{
            "idle-down" :   [ [0,0] ] ,
            "idle-right":   [ [0,1] ] ,
            "idle-up"   :   [ [0,2] ] ,
            "idle-left" :   [ [0,3] ] ,
            "walk-down" :   [ [1,0], [0,0] , [3,0] , [0,0]],
            "walk-right":   [ [1,1], [0,1] , [3,1] , [0,1]],
            "walk-up"   :   [ [1,2], [0,2] , [3,2] , [0,2]],
            "walk-left" :   [ [1,3], [0,3] , [3,3] , [0,3]]
        }
        this.currentAnimation="idle-down";// set default animation for all sprites
        this.currentAnimationFrame=0;

        this.animationFrameLimit = config.animationFrameLimit || 16; 
        this.animationFrameProgress = this.animationFrameLimit;

        // Reference game object
        this.gameObject = config.gameObject
    }

    updateAnimationProgress(){
        // Downtick frame progress
        if (this.animationFrameProgress>0){
            this.animationFrameProgress-=1;
            return;
        }

        // Reset the counter
        this.animationFrameProgress=this.animationFrameLimit;
        this.currentAnimationFrame+=1;

        if(this.frame === undefined) {
            this.currentAnimationFrame=0;
        }

    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
        
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    draw(ctx){ // Adjusting sprite to tiles of map
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y) // Shadow is already cut 32x32 no need to crop

        const [ frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image, // Cropping Sprite
            frameX * 32, frameY*32, // Left and right cut
            32,32, // Width and height cut
            x,y, //position of canvas
            32,32 // size it should be drawn

            
            )
            this.updateAnimationProgress();
    }
    
}