const lightProduce = newEffect(20, e => {
    Draw.color(Color.white, Color.newColor(0x00ffff99), e.fin()); //color goes from white to a transparent blue
    Lines.swirl(0, 0, e.fin() * 100, e.fin() * 360){; //line thickness goes from 3 to 0
});
