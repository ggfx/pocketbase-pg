const config = useRuntimeConfig();
const auth_token = config.fdAuthToken;
const today = new Date(Date.now());
const date_filter = today.toISOString().split("T");

export default defineEventHandler(async (event) => {
    // console.log("GET /api/updatematches/");
    try {
        const result = await $fetch(`http://api.football-data.org/v4/competitions/2018/matches/?status=FINISHED&dateFrom=${date_filter[0]}&dateTo=${date_filter[0]}`, {
            headers: {
                "X-Auth-Token": auth_token
            }
        });
        const matches = result.matches;
        const pb_status = [];
        if (typeof matches == "object") {
            for(var match in matches) {
                let fd_id = matches[match].id;
                // create data
                const data = new FormData();
                data.set('status', matches[match].status);
                data.set('duration', matches[match].score.duration);
                data.set('score_home', matches[match].score.fullTime.home);
                data.set('score_away', matches[match].score.fullTime.away);
                // console.log(data);
                try {
                    const record = await event.context.pb.collection('matches').getFirstListItem(`fd_id="${fd_id}"`);
                    // console.log("Existing record:", record);
                    let updRecord = await event.context.pb.collection('matches').update(record.id, data);
                    pb_status.push({ fd_id: fd_id, status: 'updated', date: updRecord.updated });
                    // console.log("Updated record:", updRecord);
                } catch (err) {
                    console.dir(err);
                    // let newRecord = await event.context.pb.collection('matches').create(data);
                    pb_status.push({ fd_id: fd_id, status: 'match not found' });
                    // console.log("New record:", newRecord);
                }
            }
        }
        return pb_status;
    } catch (err) {
        console.dir(err);
        event.node.res.statusCode = 500;
        return {
            code: "ERROR",
            message: "Something went wrong.",
        };
    }
});