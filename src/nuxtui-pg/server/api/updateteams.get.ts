import matches from '../../json/matches.json'

export default defineEventHandler(async (event) => {
    // console.log("GET /api/updateteams");
//    try {
        /*
        const result = await $fetch("http://api.football-data.org/v4/competitions/2018/matches?stage=GROUP_STAGE", {
            headers: {
                "X-Auth-Token": "2e89c17a514049d7bbe8d49ddadbd6a3"
            }
        });
        const matches = result.matches;
        */
/*
        const data = {
            "name": "test",
            "code": "test"
        };
        const records = await event.context.pb.collection('teams').create({

        });
*/
        const pb_status = [];
        if (typeof matches == "object") {
            for(var match in matches) {
                let { tla } = matches[match].homeTeam;
                // create data
                const data = new FormData();
                data.set('name', matches[match].homeTeam.name);
                data.set('code', tla);
                if (matches[match].homeTeam.crest.length > 0) {
                    data.set('crest', tla.toLowerCase() + '.' + matches[match].homeTeam.crest.split('.').pop());
                }
                // console.log(data);
                try {
                    const record = await event.context.pb.collection('teams').getFirstListItem(`code="${tla}"`);
                    // console.log("Existing record:", record);
                    let updRecord = await event.context.pb.collection('teams').update(record.id, data);
                    pb_status.push({ code: tla, status: 'updated', date: updRecord.updated });
                    // console.log("Updated record:", updRecord);
                } catch (err) {
                    console.dir(err);
                    let newRecord = await event.context.pb.collection('teams').create(data);
                    pb_status.push({ code: tla, status: 'created', date: newRecord.created });
                    // console.log("New record:", newRecord);
                }
            }
        }
        return pb_status;
/*    } catch (err) {
        console.dir(err);
        event.node.res.statusCode = 500;
        return {
            code: "ERROR",
            message: "Something went wrong.",
        };
    }
        */
});