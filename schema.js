const Event = ('../models/event');
const Scintillation = ('../models/scintillation');
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLDouble,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const EventType = new GraphQLObjectType({
    name:'Event',
    fields:() => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        pulseCount: { type: GraphQLString },
        gammaEV: { type: GraphQLDouble},
        scintillation: {
            type: ScintillationType,
            resolve(parent, args){
               
                return Scintillation.findById(parent.scintillationId);
            }
        }
    })
});

const ScintillationType = new GraphQLObjectType({
    name:'Scintillation',
    fields:() => ({
        id: { type: GraphQLID },
        material: { type: GraphQLString },
        location: { type: GraphQLString },
        method: { type: GraphQLString },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return EventType.find({ scintillationId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        event: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
        },
        resolve(parent, args){
            return Event.findById(args.id);
            }
        }
    },
    events:{
        type: new GraphQLList(EventType),
        resolve(parent, args){
            return Event.find({});
        }
    },
    scintillation: {
        type: ScintillationType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args){
            return Scintillation.findById(args.id);
            }
    },
    scintillations:{
        type: new GraphQLList(ScintillationType),
        resolve(parent, args){
            return Scintillation.find({});
        }
    }
});

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addEvent:{
            type:EventType,
            args:{
                date: {type: new GraphQLNonNull(GraphQLString)},
                pulseCount: {type: new GraphQLNonNull(GraphQLInt)},
                gammaEV: {type: new GraphQLNonNull(GraphQLDouble)},
                scintillationId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let event = new Event({
                    date: args.date,
                    pulseCount: args.pulseCount,
                    gammaEV: args.gammaEV,
                    scintillationId: args.scintillationId
                });
                return event.save();
            }
        },
        addScintillation:{
            type:ScintillationType,
            args:{
                material: {type: new GraphQLNonNull(GraphQLString)},
                location: {type: new GraphQLNonNull(GraphQLString)},
                method: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let scintillation = new Scintillation({
                    material: args.material,
                    location: args.location,
                    method: args.method
                });
                return scintillation.save();
            }
        },
        deleteEvent:{
            type:EventType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let event = new Event({
                    id: args.id
                });
                return event.save();
            }
        },
        editEvent:{
            type:EventType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                date: {type: GraphQLString},
                pulseCount: {type: Int},
                gammaEV: {type: GraphQLDouble},
                scintillationId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let event = new Event({
                    date: args.date,
                    pulseCount: args.pulseCount,
                    gammaEV: args.gammaEV,
                    scintillationId: args.scintillationId
                });
                return event.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
