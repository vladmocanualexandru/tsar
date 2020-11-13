function buildApplication(){

    let result = new aliases.Application({ 
        width: window.innerWidth, 
        height: window.innerHeight,                       
        antialias: true, 
        transparent: false, 
        resolution: 1
      });

    result.renderer.view.style.position = "absolute";
    result.renderer.view.style.display = "block";
    result.renderer.autoResize = true;

    result.stage.interactive = true;
    result.stage.on("mousemove", function(e){  
        mousePosition = e.data.global
    })

    return result;
}

