
const newman = require('newman');
const uuidv1 = require('uuid/v1');

fs = require('fs');
const fileName = './postman_environment.json';
newman.run({
collection: require('./postman_collection.json'),
iterationCount: 2,
environment: require(fileName),
delayRequest: 300,
// collection: require('./Wells.postman_collection.json'),
reporters: 'cli'
}).on('beforeRequest', (error, args) => {
if (error) {
  console.error(error);
}
}).on('request',  (error, args) => {
if (error) {
  console.error(error);
}
else {
    const resultData = JSON.parse(args.response.stream).data.payload;
    const results = [];
    resultData.forEach(result => {
        results.push(result.id);
    });
  fs.writeFile(`./responses/response_${uuidv1()}.txt`, JSON.stringify(results), (error) => {
      if (error) { 
          console.error(error); 
      }
  });        
}
});