import { UniqueArc } from './arc.js';

function clear()
{
    ctx.fillStyle="#000000";
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
            const outRadius=UniqueArc.layerSize*(layer+1);
            arcs.push(new UniqueArc(outRadius,30,start_angle,angle_size,layer));
        }
    }
    arcs.sort((a,b)=>b.outRadius-a.outRadius);
}
export function update_values()
{
    UniqueArc.turn_speed=parseInt(document.getElementById("turn_speed").value)*0.001;
    console.log(`Arc Turn Speed: ${UniqueArc.turn_speed}`);

    max_layers=parseInt(document.getElementById("max_layers").value);
    console.log(`Max Layers: ${max_layers}`);

    min_layer_arcs=parseInt(document.getElementById("min_layer_arcs").value);
    console.log(`Min Layer Arcs: ${min_layer_arcs}`);

    main();
}

let c=document.getElementById("my_canvas");
let ctx=c.getContext("2d");
UniqueArc.centerX=c.width/2;
UniqueArc.centerY=c.height/2;
UniqueArc.layerSize=50;


let arcs=[];

//How many layers
let max_layers=9;

//How many arcs the first layer should have
let min_layer_arcs=4;


main();
setInterval(draw,1000/30);
draw();