class directionInput {
    constructor() {
        this.heldDirections=[];
        this.touchY='';
        this.touchX='';
        this.touchThresholdY=15;
        this.touchThresholdX=400;
        this.map = {
            "ArrowUp":"up",
            "ArrowDown":"down",
            "ArrowLeft":"left",
            "ArrowRight":"right",
            "KeyW":"up",
            "KeyS":"down",
            "KeyA":"left",
            "KeyD":"right",   

            
        }
        
        this.keys=[];
    }

    get direction(){
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", e=> {
            const dir = this.map[e.code];
            console.log('dirrrr', dir)
            if (dir && this.heldDirections.indexOf(dir) === -1) { 
                this.heldDirections.unshift(dir);
                console.log(this.heldDirections)
            }
        });
        document.addEventListener("keyup", e=> {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir)
            console.log('index', index)
            if (index > -1){
                this.heldDirections.splice(index,1);
                console.log(this.heldDirections)
            }
        });
        window.addEventListener('touchstart' , e=> {
     
            this.touchY=e.changedTouches[0].pageY
        });         // runs infinitely as long as event is firing
                    // make calculations: direction, time of event
        window.addEventListener('touchmove', e=> {
            const swipeDistanceY=e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX=e.changedTouches[0].pageX - this.touchX;
            
            if (swipeDistanceY < -this.touchThresholdY && this.keys.indexOf('swipe up') ===-1) {
                console.log('swiping up')    
                this.keys.push('swipe up');
                this.heldDirections.unshift('up');
            }
            else if  (swipeDistanceY > this.touchThresholdY && this.keys.indexOf('swipe down') ===-1) {
                this.keys.push('swipe down');
                this.heldDirections.unshift('down');
            }
        });         // runs once   
                    // cleanup, discard values
        window.addEventListener('touchend', e=> {
                console.log(this.keys);
                this.keys.splice(this.keys.indexOf('swipe up'), 1)
                this.keys.splice(this.keys.indexOf('swipe down'), 1)
                this.heldDirections.splice(0,1);

        });
    }
}