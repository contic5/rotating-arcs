
export function hex_to_rgb(hex)
{
    //hex=hex.replace("#","");
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        hex = hex.split("").map(s => s + s).join("");
    }

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return [r,g,b];
}

//https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
export function rgb_to_hsl(r, g, b) {
    r /= 255; 
    g /= 255; 
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let distance = max - min;
    let h;
    if (distance === 0) 
    {
        h = 0;
    }
    else if (max === r) 
    {
        h = (g - b) / distance % 6;
    }
    else if (max === g) 
    {
        h = (b - r) / distance + 2;
    }
    else if (max === b) 
    {
        h = (r - g) / distance + 4;
    }
    let l = (min + max) / 2;
    
    let s=0;
    if(distance!=0)
    {
        s = distance / (1 - Math.abs(2 * l - 1));
    }
    return [h * 60, 100*s, l*100];
}