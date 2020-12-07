const AWS = require("aws-sdk")
const cloudwatchlogs = new AWS.CloudWatchLogs({region: "eu-west-1"});


let run = async(nextToken) =>{
    try {
        const logGroups = await cloudwatchlogs.describeLogGroups({
            limit: 50,
            nextToken
        }).promise();


        for (const logGroup of logGroups.logGroups) {
            console.log(`Deleting: ${ logGroup.logGroupName }`);
            await cloudwatchlogs.deleteLogGroup({logGroupName: logGroup.logGroupName}).promise();
        }

        if(logGroups.nextToken) {
            return run(logGroups.nextToken);
        }

        return;

    }catch(err) {
        console.log(err);
    }
}


run();
