//this part works
const lightProduce = newEffect(20, e => {
    Draw.color(Color.white, Color.newColor(0x00ffff00), e.fin()); //color goes from white to a transparent blue
    Lines.swirl(0, 0, e.fin() * 100, 10, e.fin() * 360);
});

//this is iffy, might work might not, just producing effect on block update and rebuilding the update thing so it works like a normal producer.
const extractor = extendContent(Block, "lightextractor", {

    update(tile) {
        Effects.effect(lightProduce, tile);
        GenericCrafterEntity entity = tile.ent();
           
        if(entity.cons.valid()){

            entity.progress += getProgressIncrease(entity, craftTime);
            entity.totalProgress += entity.delta();
            entity.warmup = Mathf.lerpDelta(entity.warmup, 1f, 0.02f);

            if(Mathf.chance(Time.delta() * updateEffectChance)){
                Effects.effect(updateEffect, entity.x + Mathf.range(size * 4f), entity.y + Mathf.range(size * 4));
            }
        }else{
            entity.warmup = Mathf.lerp(entity.warmup, 0f, 0.02f);
        }

        if(entity.progress >= 1f){
            entity.cons.trigger();

            if(outputItem != null){
                useContent(tile, outputItem.item);
                for(int i = 0; i < outputItem.amount; i++){
                    offloadNear(tile, outputItem.item);
                }
            }

            if(outputLiquid != null){
                useContent(tile, outputLiquid.liquid);
                handleLiquid(tile, tile, outputLiquid.liquid, outputLiquid.amount);
            }

            Effects.effect(craftEffect, tile.drawx(), tile.drawy());
            entity.progress = 0f;
        }

        if(outputItem != null && tile.entity.timer.get(timerDump, dumpTime)){
            tryDump(tile, outputItem.item);
        }

        if(outputLiquid != null){
            tryDumpLiquid(tile, outputLiquid.liquid);
        }
    }
});
