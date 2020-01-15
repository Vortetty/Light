const LaunchEffect = newEffect(20, e => {
    Draw.color(0x00ffffff,0x00000000,e.fin()); //color goes from ??? to ???
    for(var i = 0; i < 360; i+=4){
        Lines.lineAngle(e.x, e.y, i, e.fin() * 100); //draw a bunch of lines
    };
});

const silo = extendContent(Block, "testsilo", {
    //override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.arrowUpSmall, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    //override configure event
    configured(tile, value){
        //make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            //make this effect occur at the tile location
            Effects.effect(LaunchEffect, tile)

            //create 10 bullets at this tile's location with random rotation and velocity/lifetime
            for(var i = 0; i < 11; i++){
                for(var i = 0; i < 15; i++){
                    Calls.createBullet(Bullets.meltdownLaser, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 10.0), Mathf.random(0.2, 10.0))
                }
            }
            //triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})
