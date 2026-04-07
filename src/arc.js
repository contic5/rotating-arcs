export class UniqueArc
{
    static maxOutRadius=0;
    constructor(outRadius,size,start_angle,angle_size,layer)
    {
        this.outRadius=outRadius;
        UniqueArc.maxOutRadius=Math.max(this.outRadius,UniqueArc.maxOutRadius);
        this.inRadius=outRadius-50+size;
        console.log(this.outRadius,this.inRadius);

        this.size=size;
        this.angle=start_angle;
        this.angle_size=angle_size;

        this.layer=layer;
        console.log(this.outRadius);
    }
    step()
    {
        this.rotation_ratio=(1.2*UniqueArc.maxOutRadius-this.outRadius)/(UniqueArc.maxOutRadius);
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
        ctx.fillStyle=`hsl(${(this.outRadius-50)%360}, 50%, 70%)`;
        ctx.beginPath();
        ctx.moveTo(c.width/2, c.height/2); // Move to the center of the circle
        ctx.arc(c.width/2,c.height/2,this.outRadius,this.angle,this.angle+this.angle_size);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle="#000000";
        ctx.beginPath();
        ctx.moveTo(c.width/2, c.height/2); // Move to the center of the circle
        ctx.arc(c.width/2,c.height/2,this.outRadius-50+this.size,this.angle,this.angle+this.angle_size);
        ctx.fill();
        ctx.closePath();
    }
}