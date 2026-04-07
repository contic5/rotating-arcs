export class UniqueArc
{
    static maxOutRadius=0;
    static centerX=0;
    static centerY=0;
    static layerSize=50;
    constructor(outRadius,size,start_angle,angle_size,layer)
    {
        //The outer radius is the radius of the circle we are drawing.
        this.outRadius=outRadius;

        //The inner radius is the radius of the circle we are erasing. This allows us to create circular arcs.
        this.inRadius=outRadius-UniqueArc.layerSize+size;

        UniqueArc.maxOutRadius=Math.max(this.outRadius,UniqueArc.maxOutRadius);

        this.size=size;
        this.angle=start_angle;

        //How many radians the angle is.
        this.angle_size=angle_size;

        this.layer=layer;
        console.log(this.outRadius);
    }
    step()
    {
        //The arc should rotate slower the further away it is from the circle
        this.rotation_ratio=(1.2*UniqueArc.maxOutRadius-this.outRadius)/(UniqueArc.maxOutRadius);

        //If the layer is even, rotate clockwise. If the layer is odd, rotate counterclockwise.
        if(this.layer%2==0)
        {
            this.angle+=this.rotation_ratio*0.05;
            if(this.angle>2*Math.PI)
            {
                this.angle-=2*Math.PI;
            }
        }
        else
        {
            this.angle-=this.rotation_ratio*0.05;
            if(this.angle<0)
            {
                this.angle+=2*Math.PI;
            }
        }
    }
    draw(c,ctx)
    {
        ctx.lineWidth = 0;

        //Change the color the further away from the center the point is.
        ctx.fillStyle=`hsl(${(this.outRadius-UniqueArc.layerSize)%360}, 50%, 70%)`;
        ctx.beginPath();
        ctx.moveTo(UniqueArc.centerX, UniqueArc.centerY); // Move to the center of the circle
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.outRadius,this.angle,this.angle+this.angle_size);
        ctx.fill();
        ctx.closePath();

        //Erase the inner circle to create an arc.
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#000000";
        ctx.beginPath();
        ctx.moveTo(UniqueArc.centerX, UniqueArc.centerY); // Move to the center of the circle
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.outRadius-UniqueArc.layerSize+this.size,this.angle,this.angle+this.angle_size);
        ctx.fill();
        ctx.closePath();
    }
}