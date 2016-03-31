function cos(degree)
	{
		switch (degree) 
		{
			case 0:
				return 1;
			case 30:
				return 0.87;
			case 60:
				return 0.5;
			case 90:
				return 0;
			case 120:
				return -0.5;
			case 150:
				return -0.87;
			case 180:
				return -1;
			case 210:
				return -0.87;
			case 240:
				return -0.5;
			case 270:
				return 0;
			case 300:
				return 0.5;
			case 330:
				return 0.87;
		} 
	}
	function sin(degree)
	{
		switch (degree) 
		{
			case 0:
				return 0;
			case 30:
				return 0.5;
			case 60:
				return 0.87;
			case 90:
				return 1;
			case 120:
				return 0.87;
			case 150:
				return 0.5;
			case 180:
				return 0;
			case 210:
				return -0.5;
			case 240:
				return -0.87;
			case 270:
				return -1;
			case 300:
				return -0.87;
			case 330:
				return -0.5;
		} 
	}
	function returnDegreeRange(degree)
	{
		if(degree<0)
			degree=degree+360;
		if(degree>345||degree<=15)
		return 0;
		if(degree>15&&degree<=45)
		return 30;
		if(degree>45&&degree<=75)
		return 60;
		if(degree>75&&degree<=105)
		return 90;
		if(degree>105&&degree<=135)
		return 120;
		if(degree>135&&degree<=165)
		return 150;
		if(degree>165&&degree<=195)
		return 180;
		if(degree>195&&degree<=225)
		return 210;
		if(degree>225&&degree<=255)
		return 240;
		if(degree>255&&degree<=285)
		return 270;
		if(degree>285&&degree<=315)
		return 300;
		if(degree>315&&degree<=345)
		return 330;
	}
 function degree(a,b)
 {
	var theta = Math.atan2(a.y-b.y,a.x-b.x);
	theta *= 180/Math.PI;
	return theta;
 }
function round(n)
{
	return Math.round(n);
}