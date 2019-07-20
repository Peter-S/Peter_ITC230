var sonics = require('./models/sonics')

sonics.find({}, (err, items) => {
  if(err) return next (err);
  console.log(items)
})


// return all records that match a condition or
// use findOne
sonics.find({'player':'Jack Sikma'}, (err, items) => {
  if (err) return next(err);
  console.log(items);
  // other code here
 });

//  sonics.deleteOne({player: 'Pete Soukup'}, (err) => {
//    if(err) console.log(err)
//  })

// // return all records that match a condition or
// use findOne
// sonics.find({'player':'Jack Sikma'}, (err, items) => {
//   if (err) return next(err);
//   console.log(items);
//   // other code here
//  });


// insert or update a single record

var newPlayer = {'player': 'Jack Sikma', 'position':'C', 'number': '43' }
sonics.updateOne({'player':'Jack Sikma'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
}); 

var newPlayer = {player: 'John Johnson', position: 'SF', number: '27'}
sonics.updateOne({'player':'John Johnson'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
}); 

var newPlayer = {player: 'Gus Williams', position: 'SG', number: '1'}
sonics.updateOne({'player':'Gus Williams'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
}); 

var newPlayer = {player: 'Dennis Johnson', position: 'PG', number: '24'}
sonics.updateOne({'player':'Dennis Johnson'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
});

var newPlayer = {player: 'Lonnie Shelton', position: 'PF', number: '8'}
sonics.updateOne({'player':'Lonnie Shelton'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
}); 

var newPlayer = {'player':'Pete Soukup', 'position':'PG', 'number': '11' }
sonics.updateOne({'player':'Pete Soukup'}, newPlayer, {upsert:true}, (err, result) => {
  if (err) return next(err);
}); 

