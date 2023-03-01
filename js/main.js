
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



//FIRST SCATTER PLOT
const xscale1 = (coord) => coord * 40;
const yscale1 = (coord) => coord * 40;


const color = (d) => {
            if (d.Species === "setosa") {
                 return "gray";
                } else if (d.Species === "versicolor") {
                return "slateblue";
                } else {
                 return "teal";
                    }
                    };

d3.csv("data/iris.csv").then((data) => {

        //scatter plot 
    	      
        FRAME1.selectAll("circle")
        	.data(data)
        	.enter()
        	.append("circle")
        	.attr("cx", (d) => xscale1(d.Petal_Length))
        	.attr("cy", (d) => 400 - yscale1(d.Sepal_Length))
        	.attr("r", 4)
            .attr("fill",  (d) => color(d))
            .attr("opacity", "50%")
        	.attr("id", (d) => `circle-${d.id}`);



      


         	});


//SECOND SCATTER PLOT
const xscale2 = (coord) => coord * 140;
const yscale2 = (coord) => coord * 80;


const handleMouseover = (event, d) => {
  const id = d.id;
  const species = d.Species;
  const element = FRAME1.select(`#circle-${id}`);
  element.style("opacity", "100%")
  element.style("stroke", "orange")
  element.style("stroke-width", "2px")
  let bar = FRAME3.select('#rect-1');
  if (species === "versicolor") {
    bar = FRAME3.select('#rect-2');
  } else if (species === "virginica") {
    bar = FRAME3.select('#rect-3');
  }
  bar.style("stroke", "orange");
  bar.style("stroke-width", "3px");
  
}


d3.csv("data/iris.csv").then((data) => {

        //scatter plot
              
        FRAME2.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => xscale2(d.Petal_Width))
            .attr("cy", (d) => 400 - yscale2(d.Sepal_Width))
            .attr("r", 4)
            .attr("fill",  (d) => color(d))
            .attr("opacity", "50%")
            .attr("id", (d) => `circle-${d.id}`)
            .on("mouseover", handleMouseover);

    });




        
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


bars = FRAME3.selectAll()
     .data(bardata)
     .enter()
     .append("rect")
        .attr('x', d => X_SCALE_3(d.species))
        .attr('y', function(d) { return Y_SCALE_3(d.count); })
        .attr('width', X_SCALE_3.bandwidth())
        .attr('height', function(d) { return VIS_HEIGHT - Y_SCALE_3(d.count); })
        .attr('fill', function(d) {return colorsbar(d.species)})
        .attr("opacity", "50%");









