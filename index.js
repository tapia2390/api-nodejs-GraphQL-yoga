var express = require('express');
var graphqlHTTP = require('express-graphql');
var { graphqlHTTP } = require('express-graphql'); 
var { buildSchema } = require('graphql');


// Construimos el schema
var schema = buildSchema(`

  type Truck  {
	id: Int
	brand: String
    model: String
    color: String
    numberId: String
    isAvailable: Boolean
	}

  type Query {
    	trucks: [Truck]
    	truck(id: Int): Truck
  	}


  type Mutation {
    	addTruck(brand: String, model: String, color: String, numberId: String, isAvailable: Boolean): Truck
      	}

`);

var trucks = [];
var counter=1;

// Función para resolver las peticiones
var root = {
    trucks: () => { return trucks; },

    truck: ( data ) => { 
    console.log(trucks)
	for ( var i=0; i<trucks.length; i++ ) 
		if ( trucks[i].id==data.id ) 
			return trucks[i]; 
        

    
	return null; 
	},

  addTruck: ( data ) => { 
	var c={ 'id': counter, 'brand':data.brand, 'model':data.model, 'color':data.color, 'numberId':data.numberId , 'isAvailable':data.isAvailable }; 
	trucks.push( c ); 
	counter++; 
	return c; 
	},
};

// Arrancamos el servidor web
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('GraphQL API en http://localhost:4000/graphql');