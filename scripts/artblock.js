const NewColorPicker = extend(FloatingDialog, "ColorPicker", {  // for now this mightnt work, need the correct thing for the first thing.
    show(color, alpha, consumer){
        this.current.set(color);
        this.cons = consumer;
        show();

        cont.clear();
        cont.pane(t => {
            t.table(Tex.pane, i => {
                i.stack(new Image(Tex.alphaBg), new Image(){{
                    setColor(current);
                    update(() => setColor(current));
                }}).size(200f);
            }).colspan(2).padBottom(5);

            float w = 150f;

            t.row();

            t.defaults().padBottom(4);
            t.add("R").color(Pal.remove);
            t.addSlider(0f, 1f, 0.01f, current.r, current::r).width(w);
            t.row();
            t.add("G").color(Color.lime);
            t.addSlider(0f, 1f, 0.01f, current.g, current::g).width(w);
            t.row();
            t.add("B").color(Color.royal);
            t.addSlider(0f, 1f, 0.01f, current.b, current::b).width(w);
            t.row();
            if(alpha){
                t.add("A");
                t.addSlider(0f, 1f, 0.01f, current.a, current::a).width(w);
                t.row();
            }
        })
    }
})

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
        
        
    }
})
