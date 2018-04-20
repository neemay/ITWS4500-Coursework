library(igraph)
data <- read.csv("battles.csv")
edges <- data[c(6,10)]
edges$weight <- as.character(data[,1])
houses1 <- unique(edges[1])
houses2 <- unique(edges[2])
colnames(houses1)[1] <- c("houses")
colnames(houses2)[1] <- c("houses")
houses <- unique(rbind(houses1,houses2))

net <- graph_from_data_frame(d=edges, directed=T, vertices=houses)
par(mar=c(0,0,0,0))
suppressWarnings(plot(net,
                      edge.label = edges$weight, 
                      edge.arrow.width = 1,
                      edge.arrow.size = 0.3,
                      vertex.size = 15,
                      edge.width = 1,
                      edge.label.cex = .75,
                      vertex.label.color = "black",
                      edge.label.color="black"))

