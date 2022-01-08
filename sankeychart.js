//Sankey
    //set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#sankey-chart")
    .append("svg")          
        .attr("viewBox", [0, 0, width + 12, height + 20])
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(30)
        .nodePadding(10)
        .size([width, height - 20]);

    var path = sankey.link();

    // load the data
    d3.csv("sankey.csv", function(error, data) {
    //set up graph in same style as original example but empty
    graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
        graph.nodes.push({ "name": d.source});
        graph.nodes.push({ "name": d.target});
        graph.links.push({ "source": d.source,
                        "target": d.target,
                        "value": +d.value });
    });

    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .object(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

    // now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = {"name": d};
        });

    var color = function(d) {
        if ((d.name == 'Agriculture') || (d.name == 'mAgriculture')) { 
        return "#4698bc";
        }
        else if ((d.name == 'Informal Work') || (d.name == 'mInformal Work')) { 
        return "#8bc8d3";
        }
        else if ((d.name == 'Student') || (d.name == 'mStudent')) { 
        return "#6bbb5d";
        }
        else if ((d.name == 'Salaried Work') || (d.name == 'mSalaried Work')) { 
        return "#bcde85";
        }
        else if ((d.name == 'Other') || (d.name == 'mOther')) { 
        return "#e18731";
        }
        else if ((d.name == 'Unemployed') || (d.name == 'mUnemployed')) { 
        return "#f5ac91";
        }
        else if ((d.name == 'Own Business') || (d.name == 'mOwn Business')) { 
        return "#a86cc5";
        }        
        else if ((d.name == 'Unpaid Home Care') || (d.name == 'mUnpaid Home Care')) { 
        return "#b4ace3";
        }
        else if ((d.name == 'Domestic Work') || (d.name == 'mDomestic Work')) { 
        return "#df5d99";
        }};

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(0);
    
    // add in the links
    var link = svg.append("g")
        .selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; }); 

    // add the link titles
    link.append("title")
        .text(function(d) {
        var percent = 0;
        if (d.source.name == 'Agriculture') { percent = ((d.value/262)*100).toFixed(2); }
        else if (d.source.name == 'Informal Work') { percent = ((d.value/209)*100).toFixed(2); }
        else if (d.source.name == 'Student') { percent = ((d.value/136)*100).toFixed(2); }
        else if (d.source.name == 'Salaried Work') { percent = ((d.value/130)*100).toFixed(2); }
        else if (d.source.name == 'Other') { percent = ((d.value/76)*100).toFixed(2); }
        else if (d.source.name == 'Unemployed') { percent = ((d.value/65)*100).toFixed(2); }
        else if (d.source.name == 'Own Business') { percent = ((d.value/56)*100).toFixed(2); }
        else if (d.source.name == 'Unpaid Home Care') { percent = ((d.value/54)*100).toFixed(2); }
        else if (d.source.name == 'Domestic Work') { percent = ((d.value/32)*100).toFixed(2); }                    
        return d.source.name + " → " + d.target.name.substring(1) + "\n" + percent + "%" + " of this source group"; 
        });

    // add in the nodes
    var node = svg.append("g")
        .selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; });
        
    // add the rectangles for the nodes
    node.append("rect")
        .attr("x", function(d) { return d.x0; })
        .attr("y", function(d) { return d.y0; })
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", color);

    // add in the title for the nodes
    node.append("text")
        // .attr("x", function(d) { return d.x0 - 35; })
        // .attr("y", function(d) { return d.y0 - 30 ; })
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)         
        .attr("class", "sankeystyling") 
        .text(function(d) { 
            if (d.name.startsWith('m')) { return d.name.substring(1);}
            else { return d.name; }
            })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
    
    svg.append("text")
        .attr("class", "sourcestyling")
        .attr("y", height + 135) 
        .attr("x", 0)
        .text("Data Source: WFP Survey (2021)");
    });