const artblock = extendContent(Block, "artblock", {
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
                for(var i = 0; i < 150; i++){
                    Effects.effect(Fx.shootBigSmoke2, tile)
                    Calls.createBullet(Bullets.meltdownLaser, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 100.0), Mathf.random(0.2, 100.0))
                }
            //triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})
