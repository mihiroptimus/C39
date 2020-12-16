class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", (data) => {
            gameState = data.val();
        });
    }
    
    update(state){
        database.ref('/').update({
            gameState: state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value")
            if (playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form()
            form.display();
        }

        car1 = createSprite(100, 200);
        car2 = createSprite(300, 200);
        car3 = createSprite(500, 200);
        car4 = createSprite(700, 200);

        car1.addImage(car1img);
        car2.addImage(car2img);
        car3.addImage(car3img);
        car4.addImage(car4img);

        cars = [car1, car2, car3, car4];

        crossedFinishPoint = false;
    }

    play(){
        form.hide()
        Player.getPlayerInfo()
        player.getFinishedPlayers();

        if(allPlayers !== undefined){
            background(90);
            image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
            //var displayPosition = 100;
            var index = 0;
            var x = 190;
            var y;
            for(var plr in allPlayers){
                index++;
                x = x + 240;
                y = displayHeight - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index === player.index){
                    fill("red");
                    stroke(10);
                    ellipse(x, y, 70, 70);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }
                //displayPosition += 50;
                textSize(20);
                textAlign(CENTER);
                fill("yellow");
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 70);
            }

            if(keyDown(UP_ARROW) && player.index !== null && crossedFinishPoint === false){
                player.distance += 10;
                player.update();
            }
            if(player.distance > 4200 && crossedFinishPoint === false){
                Player.updateFinishedPlayers();
                player.rank = finishPlayers;
                player.update();
                crossedFinishPoint = true;

            }
        }
        drawSprites();
    }
}