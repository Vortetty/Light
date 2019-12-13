const lightProduce = newEffect(20, e => {
    Draw.color(Color.white, Color.newColor(0x00ffff00), e.fin()); //color goes from white to a transparent blue
    Lines.swirl(0, 0, e.fin() * 100, 10, e.fin() * 360);
});

const extractor = extendContent(Block, "lightextractor", {

    update(Tile tile) {
        Effects.effect(lightProduce, tile);
    }
});
