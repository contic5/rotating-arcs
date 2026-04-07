ctx.strokeWidth = 0;
        const epsilon = 0.001; // small angle overlap

        ctx.fillStyle=`hsl(${(this.outRadius-UniqueArc.layerSize)%360}, 50%, 70%)`;
        /*
        //Change the color the further away from the center the point is.
        ctx.fillStyle=`hsl(${(this.outRadius-UniqueArc.layerSize)%360}, 50%, 70%)`;
        ctx.strokeStyle="#000000";
        ctx.beginPath();
        ctx.moveTo(UniqueArc.centerX, UniqueArc.centerY); // Move to the center of the circle
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.outRadius,this.angle,this.angle+this.angle_size-epsilon);
        ctx.fill();
        ctx.closePath();

        //Erase the inner circle to create an arc.
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#000000";
        ctx.beginPath();
        ctx.moveTo(UniqueArc.centerX, UniqueArc.centerY); // Move to the center of the circle
        ctx.arc(UniqueArc.centerX,UniqueArc.centerY,this.inRadius,this.angle+epsilon,this.angle+this.angle_size);
        ctx.fill();
        ctx.closePath();
        */

        ctx.fillStyle=`hsl(${(this.outRadius-UniqueArc.layerSize)%360}, 50%, 70%)`;

        ctx.beginPath();
        ctx.arc(
        UniqueArc.centerX,
        UniqueArc.centerY,
        this.outRadius + overlap,
        this.angle,
        this.angle + this.angle_size + epsilon
        );

        ctx.arc(
        UniqueArc.centerX,
        UniqueArc.centerY,
        this.inRadius - overlap,
        this.angle + this.angle_size + epsilon,
        this.angle,
        true
        );

        ctx.closePath();
        ctx.fill();