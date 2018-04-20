Yarden Ne'eman
Web Science Lab 9
4/19/18

Things to note for this lab:
1) I got this dataset from Kaggle: https://www.kaggle.com/mylesoneill/game-of-thrones/data. The dataset is battles.csv

2) I chose this dataset for multiple reasons. First, I really like Game of Thrones so that drew my eye to this dataset. Second, I thought a smaller dataset would be beneficial for this assignment. Since I'm just learning how to use R and igraph I didn't want to handle a very large dataset where it would be really hard to read the output of the graph. I also thought that the nature of the dataset would lend itself to a really nice directed graph.

3) The structure of the graph is as follows. The dataset contains a list of battles from Game of Thrones where each battle has several attributes. Two of these attributes are "attacked_1" and "defender_1" which represent the house that attacked the defending house for this battle. Also listed were any supporting houses that attacked or defended, but I just focused on the main houses of the battle. Each node represents a house in the dataset. Edges are drawn between nodes such that an edge comes out of the attacking house and points to the defending house. The edge labels are the name of the battle.

4) Creating the graph in such a way lets us understand the house dynamics of this data set. The connected components of the graph can show us which houses are tightly related through battles and which engage in their own separate battles. Based on the number of edges coming out of a node, we can also see how often it attacks other houses, and vice versa. We can also see which houses fight often based on the edges between them, for example the Starks and the Lannisters.

5) I was having some problems displaying the edge labels. Ultimately, I had to set the edge weight as the name of the battle and then display the edge weights as the label for it to appear on the graph. In doing so, some warning was generated about coercing types. Since this was a warning, I wrapped the plot() function call in a suppressWarnings() call. Since this was only a warning and the output generated was what I expected, I felt that this was okay to do.

6) I had a lot of issues with plotting the graph. Each time you run the plot command it generates a different graph, and some of the graphs had the nodes and edges overlapping and overall it was very hard to read with even a few nodes. This also made it hard to see the connected components because the nodes were placed pretty randomly when they were plotted. I had to play around with the font and node sizes to get the best output possible. I also needed to save the image of the plot in a higher resolution so that when you zoom in you can actually read the edge labels. This plot is saved under GOT_Plot.png

7) A few interesting things came up from this graph. The first thing is that in one of the battles, it has no defender listed. When the graph was generated, this was represented as an empty node, so in this battle it is listed that The Brave Companions fought no one. Another intereting thing was that in two battles, the Baratheons apparently fought themselves. This is represented as a reflexive edge in the graph which has two different labels.

8) When there are a lot of edges coming in and going out of a node it's sometimes hard to tell in which direction the arrows are pointing. This is particularly evident with the edges between the Starks and Lannisters, where there are so many edges that the arrows are bunched up and it's hard to tell which battle was fought in which direction.