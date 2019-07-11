'use strict'

let sonics79 = [
  {
    player: 'Dennis Johnson',
    position: 'PG',
    number: '24'
  },
  {
    player: 'Gus Williams',
    position: 'SG',
    number: '1'
  },
  {
    player: 'John Johnson',
    position: 'SF',
    number: '27'
  },
  {
    player: 'Lonnie Shelton',
    position: 'PF',
    number: '8'
  },
  {
    player: 'Jack Sikma',
    position: 'C',
    number: '43'
  }
 ];

 const getAll = () =>
 {
   return sonics79;
 }

 const get = (player) =>
 {
   return sonics79.find((sonic) => 
   {
     return sonic.player == player
   })
 }

 const deletePlayer = (player) =>
 {
   let nl = sonics79.length
   sonics79 = sonics79.filter((item) => 
   {
     return item.player !== player
   })
   return {deleted: nl !== sonics79.length, total: sonics79.length}
 }

 const addPlayer = (player) => 
 {
   let nl = sonics79.length
   let found = get(player.player)
   if (!found) {
     sonics79.push(player)
   }
   return {added: nl !== sonics79.length, total: sonics79.length };
 }

//  console.log('before', getAll())
//  console.log(addPlayer({
//   player: 'Jack Sikma',
//   position: 'PF',
//   number: '11'
// }))

//  sonics79.push(
//   {
//     player: 'Pete Soukup',
//     position: 'PF',
//     number: '11'
//   }
//  )

//  console.log('after', getAll())
//  console.log(sonics79.length)


//  console.log(get('Dennis Johnson'))
//  console.log(getAll())
//  console.log(deletePlayer('Dennis Johnson'))
//  console.log(getAll())

 module.exports = { get, getAll, deletePlayer, addPlayer }
