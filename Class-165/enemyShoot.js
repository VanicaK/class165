AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var direction=new THREE.Vector3();
            var position1=new THREE.Vector3();
            var position2=new THREE.Vector3();
            var enemy=els[i].object3D
            var player=document.querySelector("#weapon").object3D
            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)
            direction.subVectors(position1,position2).normalize()

            //Get enemey and player position using Three.js methods
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10))
            enemyBullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:0
            })

            //set the velocity and it's direction
            
            //Set dynamic-body attribute
            

            //Get text attribute
            var element=document.querySelector("#countLife")
            var playerlife=parseInt(element.getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
                    if(playerlife>0){
                        playerlife-=1
                        element.setAttribute("text",{value:playerlife})
                    }else if(playerlife<=0){
                        var over=document.querySelector("#over")
                        over.setAttribute("visible",True)
                        var tankel=document.querySelectorAll(".enemy")
                        for (i=0;i<tankel.length;i++){
                            scene.removeChild(tankel[i])
                        }
                    }
                    //Add the conditions here



                }
            });

        }
    },

});