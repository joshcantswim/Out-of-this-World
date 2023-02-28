//initial styling
// d3.select ('body').style ('font-family', 'Comic Sans MS');
d3.select ('body').style ('font-family', 'Verdana');
d3.select ('.title__wrapper').style ('border', '2px solid gray');
d3.select ('.title__wrapper').style ('width', '500px')


//bar chart for #1

async function createVizOne () {

  let countStar = {};
  try {
    const data = await d3.csv ('/js/exoplanets-1.csv');
    // console.log (data);
    data?.forEach((d)=>{
        countStar['star_' + d.sy_snum] =
        (countStar['star_' + d.sy_snum] ? countStar['star_' + d.sy_snum] : 0) + 1;
    })
   
  } catch (err) {
    console.log (err);
  }

  let data = countStar;

  let margin = {top: 20, right: 20, bottom: 50, left: 60};
  let svgWidth = 720, svgHeight = 400;
  let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
  let sourceNames = [], sourceCount = [];
  
  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
  for(let key in data){
      if(data.hasOwnProperty(key)){
          sourceNames.push(key);
          sourceCount.push(parseInt(data[key]));
      }
  }
  x.domain(sourceNames);
  y.domain([0, d3.max(sourceCount, function(d) { return d; })]);

  
  let svg = d3.select(".viz_1").append("svg");
  svg.attr('height', svgHeight)
      .attr('width', svgWidth);
  
  svg = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5))
      ;


  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top + 20)
  .text("Number of Stars");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 20)
  .text("Total Number of Exoplanets")
//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Exoplanets from systems with 1,2,3,4 stars");

  // Create rectangles
  let bars = svg.selectAll('.bar')
      .data(sourceNames)
      .enter()
      .append("g");
  
  bars.append('rect')
      .attr('class', 'bar')
      .attr("x", function(d) { return x(d); })
      .attr("y", function(d) { return y(data[d]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(data[d]); });
      
  bars.append("text")
      .text(function(d) { 
          return data[d];
      })
      .attr("x", function(d){
          return x(d) + x.bandwidth()/2;
      })
      .attr("y", function(d){
          return y(data[d]) - 5;
      })
      .attr("font-family" , "sans-serif")
      .attr("font-size" , "14px")
      .attr("fill" , "black")
      .attr("text-anchor", "middle");

}



async function createVizTwo(){
      let countPlanet = {};
    try {
      const data = await d3.csv ('/js/exoplanets-1.csv');
      console.log (data);
      data?.forEach((d)=>{
          countPlanet['planet_' + d.sy_pnum] =
          (countPlanet['planet_' + d.sy_pnum] ? countPlanet['planet_' + d.sy_pnum] : 0) + 1;
      })
     
    } catch (err) {
      console.log (err);
    }
  
    let data = countPlanet;
  
    let margin = {top: 20, right: 20, bottom: 60, left: 60};
    let svgWidth = 720, svgHeight = 400;
    let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
    let sourceNames = [], sourceCount = [];
    
    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
    for(let key in data){
        if(data.hasOwnProperty(key)){
            sourceNames.push(key);
            sourceCount.push(parseInt(data[key]));
        }
    }
    x.domain(sourceNames);
    y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
    
    let svg = d3.select(".viz_2").append("svg");

    svg.attr('height', svgHeight)
        .attr('width', svgWidth);
    svg = svg.append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Exoplanets in Systems with Other Planets");
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5))
        ;

  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top + 20)
  .text("Number of planets in system");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 100)
  .text("Total Number of Exoplanets")
  
  
    // Create rectangles
    let bars = svg.selectAll('.bar')
        .data(sourceNames)
        .enter()
        .append("g");
    
    bars.append('rect')
        .attr('class', 'bar')
        .attr("x", function(d) { return x(d); })
        .attr("y", function(d) { return y(data[d]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(data[d]); });
        
    bars.append("text")
        .text(function(d) { 
            return data[d];
        })
        .attr("x", function(d){
            return x(d) + x.bandwidth()/2;
        })
        .attr("y", function(d){
            return y(data[d]) - 5;
        })
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "14px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle");
}
  

async function createVizThree(){
    let countPlanet = {};
  try {
    const data = await d3.csv ('/js/exoplanets-1.csv');
    // console.log (data);
    data?.forEach((d)=>{
       if(d.st_spectype === 'A' || d.st_spectype === 'F' || d.st_spectype === 'G' || d.st_spectype === 'K' || d.st_spectype === 'M' ){
        countPlanet[ d.st_spectype] =
        (countPlanet[ d.st_spectype] ? countPlanet[d.st_spectype] : 0) + 1;
       }
    })
   
  } catch (err) {
    console.log (err);
  }

//   console.log(countPlanet);

  let data = countPlanet;

  let margin = {top: 60, right: 20, bottom: 100, left: 60};
  let svgWidth = 720, svgHeight = 500;
  let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
  let sourceNames = [], sourceCount = [];
  
  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
  for(let key in data){
      if(data.hasOwnProperty(key)){
          sourceNames.push(key);
          sourceCount.push(parseInt(data[key]));
      }
  }
  x.domain(sourceNames);
  y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
  
  let svg = d3.select(".viz_3").append("svg");
  svg.attr('height', svgHeight)
      .attr('width', svgWidth);
//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 80))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Exoplanets Orbitting Stars (A,F,K,G,M)..");
        
  svg = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5))
      ;
 
  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top - 10)
  .text("Star System");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 120)
  .text("Total Number of Exoplanets")         
  // Create rectangles
  let bars = svg.selectAll('.bar')
      .data(sourceNames)
      .enter()
      .append("g");
  
  bars.append('rect')
      .attr('class', 'bar')
      .attr("x", function(d) { return x(d); })
      .attr("y", function(d) { return y(data[d]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(data[d]); });
      
  bars.append("text")
      .text(function(d) { 
          return data[d];
      })
      .attr("x", function(d){
          return x(d) + x.bandwidth()/2;
      })
      .attr("y", function(d){
          return y(data[d]) - 5;
      })
      .attr("font-family" , "sans-serif")
      .attr("font-size" , "14px")
      .attr("fill" , "black")
      .attr("text-anchor", "middle");
      bars.on("click", function(d) {
        window.location.href = "https://en.wikipedia.org/wiki/Stellar_classification";
      
    });
}


async function createVizFour(){
    let countPlanet = {};
  try {
    const data = await d3.csv ('/js/exoplanets-1.csv');
    // console.log (data);
    data?.forEach((d)=>{
        countPlanet[ d.discoverymethod] =
        (countPlanet[ d.discoverymethod] ? countPlanet[d.discoverymethod] : 0) + 1;
    })
   
  } catch (err) {
    console.log (err);
  }

//   console.log(countPlanet);

  let data = countPlanet;

  let margin = {top: 20, right: 20, bottom: 70, left: 60};
  let svgWidth = 1200, svgHeight = 500;
  let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
  let sourceNames = [], sourceCount = [];
  
  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
  for(let key in data){
      if(data.hasOwnProperty(key)){
          sourceNames.push(key);
          sourceCount.push(parseInt(data[key]));
      }
  }
  x.domain(sourceNames);
  y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
  
  let svg = d3.select(".viz_4").append("svg");
  svg.attr('height', svgHeight)
      .attr('width', svgWidth);
  
  svg = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Planets Count with Discovery Methods");

  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top + 30)
  .text("Discovery Methods");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 100)
  .text("Total Number of Exoplanets")
// svg.append("g")

     
  
  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5))
      ;
          
  // Create rectangles
  let bars = svg.selectAll('.bar')
      .data(sourceNames)
      .enter()
      .append("g");
  
  bars.append('rect')
      .attr('class', 'bar')
      .attr("x", function(d) { return x(d); })
      .attr("y", function(d) { return y(data[d]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(data[d]); });
      
  bars.append("text")
      .text(function(d) { 
          return data[d];
      })
      .attr("x", function(d){
          return x(d) + x.bandwidth()/2;
      })
      .attr("y", function(d){
          return y(data[d]) - 5;
      })
      .attr("font-family" , "sans-serif")
      .attr("font-size" , "14px")
      .attr("fill" , "black")
      .attr("text-anchor", "middle");
      bars.on("click", function(d) {
        window.location.href = "https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets";
      
    });

   
     
  
}


async function createVizFive(){
    let countPlanet = {};
  try {
    const data = await d3.csv ('/js/exoplanets-1.csv');
    // console.log (data);

    // Determining habitable vs not
    data?.forEach((d)=>{
       if(d.st_spectype === 'A' || d.st_spectype === 'F' || d.st_spectype === 'G' || d.st_spectype === 'K' || d.st_spectype === 'M' ){
        let distance = parseFloat(d.sy_dist);
        if(d.st_spectype==='A'){
            if(distance >=8.5 && distance<=12.5){
                countPlanet['Habitable'] = (countPlanet['Habitable'] ? countPlanet['Habitable'] : 0 ) + 1
            }else{
                countPlanet['Non Habitable'] = (countPlanet['Non Habitable'] ? countPlanet['Non Habitable'] : 0 ) + 1
            }
        }else if(d.st_spectype==='F'){
           
            if(distance >=1.5 && distance<=2.2){
                countPlanet['Habitable'] = (countPlanet['Habitable'] ? countPlanet['Habitable'] : 0 ) + 1
            }else{
                countPlanet['Non Habitable'] = (countPlanet['Non Habitable'] ? countPlanet['Non Habitable'] : 0 ) + 1
            }
        }else if(d.st_spectype==='G'){
            if(distance >=0.95 && distance<=1.4){
                countPlanet['Habitable'] = (countPlanet['Habitable'] ? countPlanet['Habitable'] : 0 ) + 1
            }else{
                countPlanet['Non Habitable'] = (countPlanet['Non Habitable'] ? countPlanet['Non Habitable'] : 0 ) + 1
            }
        }else if(d.st_spectype==='K'){
            if(distance >=0.38 && distance<=0.56){
                countPlanet['Habitable'] = (countPlanet['Habitable'] ? countPlanet['Habitable'] : 0 ) + 1
            }else{
                countPlanet['Non Habitable'] = (countPlanet['Non Habitable'] ? countPlanet['Non Habitable'] : 0 ) + 1
            }
        }else if(d.st_spectype==='M'){
            if(distance >=0.08 && distance<=0.12){
                countPlanet['Habitable'] = (countPlanet['Habitable'] ? countPlanet['Habitable'] : 0 ) + 1
            }else{
                countPlanet['Non Habitable'] = (countPlanet['Non Habitable'] ? countPlanet['Non Habitable'] : 0 ) + 1
            }
        }
       }
    })
   
  } catch (err) {
    console.log (err);
  }

//   console.log(countPlanet);

  let data = countPlanet;

  let margin = {top: 40, right: 20, bottom: 50, left: 60};
  let svgWidth = 720, svgHeight = 400;
  let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
  let sourceNames = [], sourceCount = [];
  
  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
  for(let key in data){
      if(data.hasOwnProperty(key)){
          sourceNames.push(key);
          sourceCount.push(parseInt(data[key]));
      }
  }
  x.domain(sourceNames);
  y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
  
  let svg = d3.select(".viz_5").append("svg");
  svg.attr('height', svgHeight)
      .attr('width', svgWidth);
  
  svg = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5))
      ;
          

  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top - 10)
  .text("Type of Life");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 100)
  .text("Total Exoplanets")


//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Planets in Habitable and Non Habitable Zone (A,F,G,K,M)");

  // Create rectangles
  let bars = svg.selectAll('.bar')
      .data(sourceNames)
      .enter()
      .append("g");
  
  bars.append('rect')
      .attr('class', 'bar')
      .attr("x", function(d) { return x(d); })
      .attr("y", function(d) { return y(data[d]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(data[d]); });
      
  bars.append("text")
      .text(function(d) { 
          return data[d];
      })
      .attr("x", function(d){
          return x(d) + x.bandwidth()/2;
      })
      .attr("y", function(d){
          return y(data[d]) - 5;
      })
      .attr("font-family" , "sans-serif")
      .attr("font-size" , "14px")
      .attr("fill" , "black")
      .attr("text-anchor", "middle");
     
}


async function createVizSix(){
    let graphData = [];
  try {
    const data = await d3.csv ('/js/exoplanets-1.csv');
    // console.log (data);
    data?.forEach((d)=>{
       graphData.push(parseFloat(d.sy_dist));
     
    })
   
  } catch (err) {
    console.log (err);
  }

  // set the dimensions 
var margin = {top: 10, right: 30, bottom: 50, left: 60},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
//   console.log(graphData);

 

// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".viz_6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Distribution of Exoplanets and Their Distance");
 // X axis: scale and draw:
 const x = d3.scaleLinear()
 .domain([0, 1000])     // can use this instead of 1000 
 .range([0, width]);
svg.append("g")
 .attr("transform", `translate(0, ${height})`)
 .call(d3.axisBottom(x));

 
  // X axis label
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2 + margin.left)
  .attr("y", height + margin.top + 30)
  .text("Exoplanets");
 
 
  // Y axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -margin.top - height/2 + 100)
  .text("Distance")


// set the parameters for the histogram
const histogram = d3.histogram()
 .value(function(d) { return d })   // give the vector of value
 .domain(x.domain())  // then the domain of the graphic
 .thresholds(x.ticks(70)); // then the numbers of bins

// And apply this function to data to get the bins
const bins = histogram(graphData);
// console.log(bins);
// Y axis: scale and draw:
const y = d3.scaleLinear()
 .range([height, 0]);
 y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called 
svg.append("g")
 .call(d3.axisLeft(y));

// append the bar rectangles to the svg element
svg.selectAll("rect")
 .data(bins)
 .join("rect")
   .attr("x", 1)
.attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
   .attr("width", function(d) { return x(d.x1) - x(d.x0) -1})
   .attr("height", function(d) { return height - y(d.length); })
   .style("fill", "#69b3a2");

}

async function createVizSeven(){
  
    let graphData = {};
    try {
      const data = await d3.csv ('/js/exoplanets-1.csv');
      // console.log (data);
      data?.forEach((d)=>{
        graphData['year_' + d.disc_year] =
          (graphData['year_' + d.disc_year] ? graphData['year_' + d.disc_year] : 0) + 1;
      })
  } catch (err) {
    console.log (err);
  }



//   console.log(graphData);


  let finalData = []
for(let key in graphData){
  if(graphData.hasOwnProperty(key)){
    var year = key.match(/\d/g);
    year = year.join("");
    finalData.push({date: d3.timeParse("%Y")(year),value:parseInt(graphData[key])});
      
  }
}


// console.log(finalData);


  // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
//   console.log(graphData);

 

var svg = d3.select(".viz_7").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
 

//title 
svg.append("text")
.attr("x", (width / 2))             
.attr("y", 0 - (margin.top - 20))
.attr("text-anchor", "middle")  
.style("font-size", "16px") 
.style("text-decoration", "underline")  
.text("Exoplanets Discovery");
 // Add X axis --> it is a date format
 const x = d3.scaleTime()
 .domain(d3.extent(finalData, function(d) { return d.date; }))
 .range([ 0, width ]);

// Add Y axis
const y = d3.scaleLinear()
 .domain([0, d3.max(finalData, function(d) { return +d.value; })])
 .range([ height, 0 ]);
svg.append("g")
 .call(d3.axisLeft(y));

 // X axis label
 svg.append("g")
 .attr("transform", `translate(0, ${height})`)
 .call(d3.axisBottom(x));
 svg.append("text")
 .attr("text-anchor", "end")
 .attr("x", width/2 + margin.left)
 .attr("y", height + margin.top + 20)
 .text("Discovery Years");


 // Y axis label:
 svg.append("text")
 .attr("text-anchor", "end")
 .attr("transform", "rotate(-90)")
 .attr("y", -margin.left + 15)
 .attr("x", -margin.top - height/2 + 20)
 .text("Planet Counts")

  // Add the line 
  
  
  //fix this why did I do it this way 
  svg.append("path")
  .datum(finalData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.value) })
    ).append("svg:title") // TITLE ? 
    .text(function(d) { return d.value; });


}


async function createVizEight(){
    
    let finalData = []
    try {
      const data = await d3.csv ('/js/exoplanets-1.csv');
      // console.log (data);
      data?.forEach((d)=>{
        finalData.push({radius:d.pl_rade,mass:d.pl_bmasse});
      })
  } catch (err) {
    console.log (err);
  }



//   console.log(finalData);

var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var svg = d3.select(".viz_8").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//title 
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 20))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Radius vs Mass");

 // Add X axis
 var x = d3.scaleLinear()
 .domain([0, d3.max(finalData,(d)=>d.radius)])
 .range([ 0, width ]);
svg.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x));

 svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text("Planet Radius");

// Add Y axis
var y = d3.scaleLinear()
 .domain([0, d3.max(finalData,(d)=>d.mass)])
 .range([ height, 0]);
svg.append("g")
 .call(d3.axisLeft(y));

 // Y axis label:
 svg.append("text")
 .attr("text-anchor", "end")
 .attr("transform", "rotate(-90)")
 .attr("y", -margin.left + 20)
 .attr("x", -margin.top - height/2 + 20)
 .text("Mass")

 var color = d3.scaleOrdinal()
    .domain(["planet", "values" ])
    .range([ "#F8766D", "#00BA38"])

// Add dots...usd tiny dots as to not need to transform data, log etc
svg.append('g')
 .selectAll("dot")
 .data(finalData)
 .enter()
 .append("circle")
   .attr("cx", function (d) { return x(d.radius); } )
   .attr("cy", function (d) { return y(d.mass); } )
   .attr("r", 1.8)
   .style("fill", "#69b3a2")


}

// call them all here
createVizOne ();
createVizTwo();
createVizThree();
createVizFour();
createVizFive();
createVizSix();
createVizSeven();
createVizEight();