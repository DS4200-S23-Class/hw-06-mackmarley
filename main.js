const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 30, right: 30, top: 30, bottom: 30};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#vis1")
			.append("svg")
			.attr("height", FRAME_HEIGHT)
			.attr("width", FRAME_WIDTH)
			.attr("class", "frame1");

d3.csv("data/iris.csv").then((data) => {

	const MAX_X_1 = d3.max(data, (d) => { return parseInt(d.x); });
    const MAX_Y_1 = d3.max(data, (d) => { return parseInt(d.y); });

	const X_SCALE_1 = d3.scaleLinear() 
                     .domain([0, (MAX_X_1 + 1)]) // add some padding  
                      .range([0, VIS_WIDTH]);
    const Y_SCALE_2 = d3.scaleLinear()
                        .domain([MAX_Y_1 + 1, 0])
                        .range([0, VIS_HEIGHT]);

    const colors = d3.scaleOrdinal().domain(data).range("darkblue", "teal", "orange");

    const circles = FRAME1.select("points")
    	.data(data)
    	.enter()
    	.append("circle")
    	.attr("cx", (d) => { return (X_SCALE_1(d.Sepal_Length) + MARGINS.left)})
    	.attr("cy", (d) => { return (Y_SCALE_2(d.Petal_Length) + MARGINS.right)})
    	.attr("r", 4)
    	.attr("id", (d) => {
    		return d.id
    	})
    	.attr("opacity", "50%")
    	.attr("fill", function(d){return colors(d.Species)})
    	.attr("opacity", "50%");

    FRAME1.append("g")
    		.attr("transform", "translate(" + MARGINS.left +
    			"," + (VIS_HEIGHT + MARGINS.top) + ")")
    		.call(d3.axisBottom(X_SCALE_1).ticks(8))
    		.attr("font-size", "10px");

    FRAME1.append("g")
    		.attr("transform", "translate(" + MARGINS.left +
    			"," + (VIS_HEIGHT + MARGINS.top) + ")")
    		.call(d3.axisLeft(Y_SCALE_1).ticks(8))
    		.attr("font-size", "10px");
}