import { hex_to_rgb,rgb_to_hsl } from './support.js';

export class UniqueArc
{
    static max_out_radius=0;
    static centerX=0;
    static centerY=0;
    static layer_size=50;
    static turn_speed=0.05;
    static empty_space=30;
    static lighting=50;
    static saturation=50;
    static uneven_rotation_speed=true;
    static using_one_color=false;
    static drawing_color="#ffffff";
    static inverted_hex_color=null;
    
    constructor(out_radius,start_angle,angle_size,layer,inverted=false)
    {
        //The outer radius is the radius of the circle we are drawing.
        this.out_radius=out_radius;

        //The inner radius is the radius of the circle we are erasing. This allows us to create circular arcs.
        this.inRadius=out_radius-UniqueArc.layer_size+UniqueArc.empty_space;

        UniqueArc.max_out_radius=Math.max(this.out_radius,UniqueArc.max_out_radius);

        this.angle=start_angle;

        //How many radians the angle is.
        this.angle_size=angle_size;

        this.layer=layer;

        this.inverted=inverted;
        if(this.inverted&&UniqueArc.using_one_color)
        {
            let rgb=hex_to_rgb(UniqueArc.drawing_color);
            let hsl=rgb_to_hsl(rgb[0],rgb[1],rgb[2]);
            hsl[0]=(hsl[0]+180)%360;

            UniqueArc.inverted_hex_color=hsl;
        }
    }
    step()
    {
        //The arc should rotate slower the further away it is from the circle
        this.rotation_ratio=(1.2*UniqueArc.max_out_radius-this.out_radius)/(UniqueArc.max_out_radius);
        if(!UniqueArc.uneven_rotation_speed)
        {
            this.rotation_ratio=1;
        }

        //If the layer is even, rotate clockwise. If the layer is odd, rotate counterclockwise.
        if(this.layer%2==0)
        {
            this.angle+=this.rotation_ratio*UniqueArc.turn_speed;
            if(this.angle>2*Math.PI)
            {
                this.angle-=2*Math.PI;
            }
        }
        else
        {
            this.angle-=this.rotation_ratio*UniqueArc.turn_speed;
            if(this.angle<0)
            {
                this.angle+=2*Math.PI;
            }
        }
    }
    draw(c,ctx)
    {
        ctx.strokeWidth = 0;
        const epsilon = 0.001; // small angle overlap
        
        //Change the color the further away from the center the point is.
        if(UniqueArc.using_one_color)
        {
            if(this.inverted)
            {
                ctx.fillStyle=`hsl(${UniqueArc.inverted_hex_color[0]}, ${UniqueArc.inverted_hex_color[1]}%, ${UniqueArc.inverted_hex_color[2]}%)`;
            }
            else
            {
                ctx.fillStyle=UniqueArc.drawing_color;
            }
        }
        else
        {
            let hue=(this.out_radius-UniqueArc.layer_size)%360;
            if(this.inverted)
            {
                hue=(hue+180)%360;
            }
            ctx.fillStyle=`hsl(${hue}, ${UniqueArc.saturation}%, ${UniqueArc.lighting}%)`;
        }
        ctx.beginPath();
        
        //Draw an arc by using both an outer arc and inner arc
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.out_radius,this.angle,this.angle+this.angle_size);

        //Draw an arc by using both an outer arc and inner arc.
        //INNER ARC MUST ROTATE BACKWARDS TO GET TO THE ORIGINAL POINT. USE COUNTERCLOCKWISE INSTEAD OF CLOCKWISE.
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.inRadius,this.angle+this.angle_size,this.angle,true);
    
        ctx.closePath();
        ctx.fill();
    }
}