var map = require('./mapping.json');
var csvjson = require('csvjson');
var fs = require('fs');
var _ = require('lodash');

var data = fs.readFileSync('DummyData.csv', { encoding : 'utf8'});

var options = {
  delimiter : '|'
};
 
var parsedData = csvjson.toObject(data, options);

var output = [];

_.forEach(parsedData, function(item) {
    var record = {};
    var addresses = [];
    var address = {};
    _.forEach(map, function(mapping){
        if(mapping.destTable == "Person") {
            record[mapping.destAttribute] = item[mapping.srcAttribute];
        } else {
            address[mapping.destAttribute] = item[mapping.srcAttribute];
        }
    });

    record.address = address;
    output.push(record);
});

console.log(output);