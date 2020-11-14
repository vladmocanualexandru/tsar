let player, player_shadow, player_char, player_melee_range, player_throw_trajectory, player_direction, player_moving = false, melee_activated, player_speed
let player_animationFrames = {
    up: [],
    right: [],
    down: [],
    left: []
  }

function initPlayer(rangeRadius, speed, spritesheet){
    player_throw_trajectory = new aliases.Graphics();
    
    player_speed = speed

    player_melee_range = new aliases.Graphics();
    player_melee_range.lineStyle(4, 0xFF00FF, 0);
    player_melee_range.beginFill(0xFF0000, 0);
    player_melee_range.drawCircle(0, 0, rangeRadius);
    player_melee_range.endFill();
    player_melee_range.x = 17;
    player_melee_range.y = 29;
    player_melee_range.interactive = true;
    
    player_melee_range.on("mouseover", function(e){  
        melee_activated = true
    })
    
    player_melee_range.on("mouseout", function(e){  
        melee_activated = false
    })

    mapKeyboardEvents()
    
    player_shadow = new aliases.Graphics();
    player_shadow.beginFill(0x000000, 0.3);
    player_shadow.drawEllipse(0, 0, 20, 7);
    player_shadow.endFill();
    player_shadow.x = 17;
    player_shadow.y = 58;

    for (let i=0; i<5; i++) {
        let tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 0, 35, 58)
        player_animationFrames.up.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 59, 35, 58)
        player_animationFrames.right.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 117, 35, 58)
        player_animationFrames.down.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 175, 35, 57)
        player_animationFrames.left.push(tex)
    }
    
    player_char = aliases.Sprite.from(player_animationFrames.down[0]);
    player_char.x = 0
    player_char.y = 0

    player_direction = player_animationFrames.down
}

function addPlayerToStage(stage){
    stage.addChild(player_throw_trajectory);
      
    player = new aliases.Container(); 
    player.addChild(player_shadow)
    player.addChild(player_melee_range)
    player.addChild(player_char)
    player.x = window.innerWidth/2;
    player.y = window.innerHeight/2;
    player.vx = 0;
    player.vy = 0;
    
    stage.addChild(player);
}

function mapKeyboardEvents(){
    let 
      left = commons.keyboard("a"),
      up = commons.keyboard("w"),
      right = commons.keyboard("d"),
      down = commons.keyboard("s");

    left.press = () => {
        player.vx = -1;
        player.vy = 0;

        player_moving = true
        player_direction = player_animationFrames.left
    }; 
    
    left.release = () => {
    if (!right.isDown && player.vy === 0) {
        player_moving = false
        player.vx = 0;
    }
    };
    
    up.press = () => {
        player.vy = -1;
        player.vx = 0;

        player_moving = true
        player_direction = player_animationFrames.up
    };

    up.release = () => {
        if (!down.isDown && player.vx === 0) {
            player_moving = false
            player.vy = 0;
        }
    };

    right.press = () => {
        player.vx = 1;
        player.vy = 0;

        player_moving = true
        player_direction = player_animationFrames.right
    };

    right.release = () => {
        if (!left.isDown && player.vy === 0) {
            player_moving = false
            player.vx = 0;
        }   
    };

    down.press = () => {
        player.vy = 1;
        player.vx = 0;

        player_moving = true
        player_direction = player_animationFrames.down
    };

    down.release = () => {
        if (!up.isDown && player.vx === 0) {
            player_moving = false
            player.vy = 0;
        }
    };
}

function updatePlayerPosition(frameCounter, rangeRadius, mouse){
    if (player_moving) {
        player_char.texture = player_direction[Math.floor((frameCounter%60)/12)]
      } else { 
        player_char.texture = player_direction[0]
      }
      
      player.x += player.vx*player_speed;
      player.y += player.vy*player_speed;
      
      player_melee_range.clear();
      player_throw_trajectory.clear()
      
      if (melee_activated) {
        player_melee_range.lineStyle(4, 0xFF0000, 0.2);
        player_melee_range.beginFill(0xFF0000, 0);
        player_melee_range.drawCircle(0, 0, rangeRadius);
        player_throw_trajectory.lineStyle(4, 0xFF0000, 0);
      } else {
        player_melee_range.lineStyle(4, 0xFF0000, 0);
        player_melee_range.beginFill(0xFF0000, 0);
        player_melee_range.drawCircle(0, 0, rangeRadius);
        player_throw_trajectory.lineStyle(4, 0xFF0000, 0.2);
        
      }
      
      player_throw_trajectory.moveTo(player.x+17, player.y+29);
      player_throw_trajectory.lineTo(mouse.x, mouse.y);
      player_melee_range.endFill();
}