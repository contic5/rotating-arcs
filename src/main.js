import { UniqueArc } from './arc.js';

function clear()
{
    ctx.fillStyle=background_color;
    ctx.fillRect(0,0,c.width,c.height);
}
function draw()
{
    clear();
    for(let arc of arcs)
    {
        arc.step();
        arc.draw(c,ctx);
    }
}
function main()
{
    arcs=[];
    for(let layer=0;layer<max_layers;layer++)
    {
        //How many arcs there are in this layer
        let layer_arcs=layer+min_layer_arcs;

        //The first start angle
        let start_angle=(2*Math.PI*(layer%4))/layer_arcs;
        for(let j=0;j<layer_arcs;j++)
        {
            //Each arc should rotate over so it does not lay ontop of another arc.
            start_angle+=(2*Math.PI)/layer_arcs;

            //Use this to make sure each arc has half empty space
            const angle_size=(2*Math.PI/(2*layer_arcs));

            //The outer radius should equal the layer size*(layer+1)
            const outRadius=UniqueArc.layer_size*(layer+1);
            arcs.push(new UniqueArc(outRadius,start_angle,angle_size,layer));
        }
    }
    arcs.sort((a,b)=>b.outRadius-a.outRadius);
}
export function update_values()
{
    console.log("Updated Values");

    UniqueArc.turn_speed=parseInt(document.getElementById("turn_speed").value)*0.001;
    console.log(`Arc Turn Speed: ${UniqueArc.turn_speed}`);

    max_layers=parseInt(document.getElementById("max_layers").value);
    console.log(`Max Layers: ${max_layers}`);

    min_layer_arcs=parseInt(document.getElementById("min_layer_arcs").value);
    console.log(`Min Layer Arcs: ${min_layer_arcs}`);

    UniqueArc.layer_size=parseInt(document.getElementById("layer_size").value);

    UniqueArc.empty_space=parseInt(document.getElementById("empty_space").value);

    //Make sure empty space is always smaller than layer size.
    UniqueArc.empty_space=Math.min(UniqueArc.empty_space,UniqueArc.layer_size-1);
    document.getElementById("empty_space").value=UniqueArc.empty_space;

    console.log(`Layer Size: ${UniqueArc.layer_size}`);
    console.log(`Empty Space: ${UniqueArc.empty_space}`);

    UniqueArc.lighting=parseInt(document.getElementById("lighting").value);
    console.log(`Lighting: ${UniqueArc.lighting}`);

    UniqueArc.saturation=parseInt(document.getElementById("saturation").value);

    background_color=document.getElementById("background_color").value;

    
    main();
}

let c=document.getElementById("my_canvas");
let ctx=c.getContext("2d");
UniqueArc.centerX=c.width/2;
UniqueArc.centerY=c.height/2;
UniqueArc.layer_size=50;


let arcs=[];

//How much empty space there is in the layer.
let empty_space=30;

//How many layers
let max_layers=9;

//How many arcs the first layer should have
let min_layer_arcs=4;

let background_color="#000000";


main();
setInterval(draw,1000/30);
draw();