const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#vis1")
			.append("svg")
			.attr("height", FRAME_HEIGHT)
			.attr("width", FRAME_WIDTH)
			.attr("class", "frame");

const FRAME2 = d3.select("#vis2")
            .append("svg")
            .attr("height", FRAME_HEIGHT)
            .attr("width", FRAME_WIDTH)
            .attr("class", "frame");
const FRAME3 = d3.select("#vis3")
            .append("svg")
            .attr("height", FRAME_HEIGHT)
            .attr("width", FRAME_WIDTH)
            .attr("class", "frame");


function builtplot(){
    d3.csv("data/iris.csv").then((data) => {

        //scatter plot 1
    	 const MAX_X_1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
         const MAX_Y_1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });


    	const X_SCALE_1 = d3.scaleLinear() 
                         .domain([0, (MAX_X_1 + 1)]) 
                          .range([0, VIS_WIDTH]);
        const Y_SCALE_1 = d3.scaleLinear()
                             .domain([ 0, MAX_Y_1 + 1])
                             .range([VIS_HEIGHT, 0]);

        const colors = d3.scaleOrdinal().domain(data).range("darkblue", "teal", "orange");
        
        const circles = FRAME1.select("points")
        	.data(data)
        	.enter()
        	.append("circle")
        	.attr("cx", (d) => { return (X_SCALE_1(d.Petal_Length) + MARGINS.left)})
        	.attr("cy", (d) => { return (Y_SCALE_1(d.Sepal_Length) + MARGINS.right)})
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
        			"," + MARGINS.top + ")")
        		.call(d3.axisLeft(Y_SCALE_1).ticks(7))
        		.attr("font-size", "10px");


        //scatter plot 2
         const MAX_X_2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
         const MAX_Y_2 = d3.max(data, (d) => { return parseInt(d.Sepal_Wodth); });


        const X_SCALE_2 = d3.scaleLinear() 
                         .domain([0, (MAX_X_2 + 1)])  
                          .range([0, VIS_WIDTH]);
        const Y_SCALE_2 = d3.scaleLinear()
                             .domain([ 0, MAX_Y_2 + 1])
                             .range([VIS_HEIGHT, 0]);

        const circles2 = FRAME1.select("points")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => { return (X_SCALE_2(d.Petal_Width) + MARGINS.left)})
            .attr("cy", (d) => { return (Y_SCALE_2(d.Sepal_Width) + MARGINS.right)})
            .attr("r", 4)
            .attr("id", (d) => {
                return d.id
            })
            .attr("opacity", "50%")
            .attr("fill", function(d){return colors(d.Species)})
            .attr("opacity", "50%");

        

        FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE_2).ticks(10)) 
            .attr("font-size", '10px');


        FRAME2.append("g")
                .attr("transform", "translate(" + MARGINS.left +
                    "," + MARGINS.top + ")")
                .call(d3.axisLeft(Y_SCALE_2).ticks(15))
                .attr("font-size", "10px");

        //bar chart

        
    const bardata = [
      { species: 'virginica', count: 50 },
      { species: 'versicolor', count: 50 },
      { species: 'setosa', count: 50 }
    ];

    const X_SCALE_3 = d3.scaleBand()
      .domain(bardata.map(function(d) { return d.species; }))
      .range([0, VIS_WIDTH])
      .padding(0.2);

    const Y_SCALE_3 = d3.scaleLinear()
      .domain([0, 60]) 
      .range([VIS_HEIGHT, 0]);

      const colorsbar = d3.scaleOrdinal().domain(bardata).range(["darkblue", "teal", "orange"])

    const g = FRAME3.append("g")
               .attr("transform", "translate(" + MARGINS.top + "," + MARGINS.left + ")");
    g.append("g")
     .attr("transform", "translate(0," + VIS_HEIGHT + ")")
     .call(d3.axisBottom(X_SCALE_3));

    g.append("g")
     .call(d3.axisLeft(Y_SCALE_3).ticks(10))
        .attr("font-size", "10px");

bars = g.selectAll()
     .data(bardata)
     .enter()
     .append("rect")
        .attr('x', d => X_SCALE_3(d.species))
        .attr('y', function(d) { return Y_SCALE_3(d.count); })
        .attr('width', X_SCALE_3.bandwidth())
        .attr('height', function(d) { return VIS_HEIGHT - Y_SCALE_3(d.count); })
        .attr('fill', function(d) {return colorsbar(d.species)})
        .attr("opacity", "50%");





})}

builtplot()