const agriculturedata2 = [
                ["Mexico", 197908],
                ["South Africa", 5508],
                ["Jamaica", 4659],
                ["Guatemala", 2123],
                ["Nicaragua", 693],
                ["Honduras", 299],
                ["Costa Rica", 243],
                ["Romania", 224],
                ["El Salvador",168]
            ];

			width = 550;
			height = 350;
            marginLeft = 80;
            const marginTop2 = 10;
            barHeight = 20;
            widthMultiplier = .0015;
            gap = 5;

            // define svg
			const svg2 = d3.select("#viz2")
                .append("svg")
                // .attr("width", width)
                // .attr("height", height)
                .attr("viewBox", [0, 0, width, height - 20])

                
			
            // add rectangle bars
            svg2.append("g")
                .attr("class", "rect-bars")
                .attr("transform", "translate("+marginLeft+", " + marginTop2+")")
            .selectAll("rect")
                .data(agriculturedata2)
                .enter()
                .append("rect")
                    .attr("y", (d, i) => i * (20 + 10 + gap) + 10)
                    .attr("x", 50)
                    .attr("width", d => d[1] * widthMultiplier)
                    .attr("height", 30)
                    .attr('fill-opacity', 1)
                    .attr("fill", "#4698bc");
            

            
            svg2.selectAll("text")

                 .data(agriculturedata2)
                 .enter()
                 .append("text")

                 .text(function(d) { return d[0]})
                .attr("transform", "translate("+marginLeft+", " + marginTop2+")")
                 .attr("y", (d, i) => i * (20 + 10 + gap) + 30)
                .attr("x", 40)
                .attr('class','text_styling')
                 .attr("fill" , "#353536")
                .attr("text-anchor", "end");
                    
             svg2.selectAll("text2")
                 .data(agriculturedata2)
                 .enter()
                 .append("text")
                            .attr("transform", "translate("+marginLeft+", " + marginTop2+")")
                 .text(function(d) { return d[1]})
                 .attr("y", (d, i) => i * (20 + 10 + gap) + 30)
                .attr("x", d => d[1] * widthMultiplier + 60)
                 .attr("class", "label_styling")
                 .attr("fill" , "#353536")

            // svg3.append("text")
            //      .attr("class", "sourcestyling")
            //      .attr("y", 200) 
            //      .attr("x", 100)
            //      .text("Data Source: ...");
            
                // svg2.selectAll("text3")
                //  .data(agriculturedata2)
                // .attr("class", "title_styling")
                //  .enter()
                //     .append("text")
                //             .attr("transform", "translate("+marginLeft+", " + marginTop2+")")
                // .attr("x", (200))             
                // .attr("y", 0)
                // .attr("text-anchor", "middle");  
                // .text("Distribution of H-2A Visas by Recipient Country");
