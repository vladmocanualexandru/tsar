let enemies = []
let enemy_animationFrames = {
    up: [],
    right: [],
    down: [],
    left: []
  }

function initEnemies(noOfEnemies, spritesheet){

    for (let i=0; i<5; i++) {
        let tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 0, 35, 58)
        enemy_animationFrames.up.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 59, 35, 58)
        enemy_animationFrames.right.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 117, 35, 58)
        enemy_animationFrames.down.push(tex)
        
        tex = new aliases.Texture(spritesheet)
        tex.frame = new aliases.Rectangle(i*35, 175, 35, 57)
        enemy_animationFrames.left.push(tex)
    }

    for (let index = 0; index < noOfEnemies; index++) {
        let enemy = {}

        enemy.direction = enemy_animationFrames.down

        enemy.shadow = new aliases.Graphics();
        enemy.shadow.beginFill(0x000000, 0.3);
        enemy.shadow.drawEllipse(0, 0, 20, 7);
        enemy.shadow.endFill();
        enemy.shadow.x = 17;
        enemy.shadow.y = 58;

        enemy.char = aliases.Sprite.from(enemy.direction[0]);
        enemy.char.x = 0
        enemy.char.y = 0

        

        enemies.push(enemy)
    }
}

function addEnemiesToStage(stage){

    enemies.forEach(enemy => {
        
        enemy.container = new aliases.Container()
        enemy.container.addChild(enemy.shadow)
        enemy.container.addChild(enemy.char)
        enemy.container.x = Math.random()*window.innerWidth;
        enemy.container.y = Math.random()*window.innerHeight/2;
        enemy.container.vx = 0;
        enemy.container.vy = 0;
        
        stage.addChild(enemy.container);
    });
}

function updateEnemiesPosition(spritesheet, frameCounter, rangeRadius, mouse){

    enemies.forEach(enemy => {

        if (frameCounter%120 == 0) {
            let randomDirection = Math.round(Math.random()*3)
            if (randomDirection == 0) enemy.direction = enemy_animationFrames.up;
            if (randomDirection == 1) enemy.direction = enemy_animationFrames.right;
            if (randomDirection == 2) enemy.direction = enemy_animationFrames.down;
            if (randomDirection == 3) enemy.direction = enemy_animationFrames.left;
        }

        enemy.char.texture = enemy.direction[Math.floor((frameCounter%60)/12)]
    });

    // if (player_moving) {
    //     spritesheet.frame = player_direction[Math.floor((frameCounter%60)/12)]
    //   } else { 
    //     spritesheet.frame = player_direction[0]
    //   }
      
    //   player_char.setTexture(spritesheet)
    //   player.x += player.vx;
    //   player.y += player.vy;
      
    //   player_melee_range.clear();
    //   player_throw_trajectory.clear()
      
    //   if (melee_activated) {
    //     player_melee_range.lineStyle(4, 0xFF0000, 0.2);
    //     player_melee_range.beginFill(0xFF0000, 0);
    //     player_melee_range.drawCircle(0, 0, rangeRadius);
    //     player_throw_trajectory.lineStyle(4, 0xFF0000, 0);
    //   } else {
    //     player_melee_range.lineStyle(4, 0xFF0000, 0);
    //     player_melee_range.beginFill(0xFF0000, 0);
    //     player_melee_range.drawCircle(0, 0, rangeRadius);
    //     player_throw_trajectory.lineStyle(4, 0xFF0000, 0.2);
        
    //   }
      
    //   player_throw_trajectory.moveTo(player.x+17, player.y+29);
    //   player_throw_trajectory.lineTo(mouse.x, mouse.y);
    //   player_melee_range.endFill();
}