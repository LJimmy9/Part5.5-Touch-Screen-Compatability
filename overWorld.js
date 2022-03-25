class overWorld{
   constructor(config){
    this.element = config.element; // passes element for overWorld to operate
    this.canvas = this.element.querySelector(".game-canvas"); // from this element we want to grab canvas
    this.ctx = this.canvas.getContext("2d"); // access to draw on canvas elements
    this.map=null;
   } 

   startGameLoop(){
       const step = () =>{
        
        //clear off the canvas
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        // Draw lower layer
        this.map.drawLowerImage(this.ctx);

        // Draw game objects
        Object.values(this.map.gameObjects).forEach(object =>{
            object.update({
                arrow: this.directionInput.direction
            })
            object.sprite.draw(this.ctx);
        })

        // Draw upper layer
        this.map.drawUpperImage(this.ctx);
        
        
        requestAnimationFrame(()=>{
            step();
        })
       }
       step();
   }

   init() { // init method initializes class code, etc. 
        this.map=new overWorldMaps(window.overWorldMaps.demoRoom);
        this.directionInput = new directionInput();
        this.directionInput.init();
        this.directionInput.direction; // Returns keys that are held down

        this.startGameLoop();

    }



}