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
    for(let i=0;i<9;i++)
    {
        let layer_arcs=i+4;
        for(let j=0;j<layer_arcs;j++)
        {
            let start_angle=(2*Math.PI*(i%4))/layer_arcs;
            start_angle+=(2*Math.PI*(j))/layer_arcs;
            const angle_size=(2*Math.PI/(2*layer_arcs));
            arcs.push(new UniqueArc(50*(i+1),30,start_angle,angle_size,i));
        }
    }
    arcs.sort((a,b)=>b.outRadius-a.outRadius);
}

let c=document.getElementById("my_canvas");
let ctx=c.getContext("2d");

let arcs=[];


main();
setInterval(draw,1000/30);
draw();