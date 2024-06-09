const config = useRuntimeConfig();
const auth_token = config.fdAuthToken;
import result from '../../../json/scheduled.json';

export default defineEventHandler(async (event) => {
    // console.log("GET /api/updatematches/scheduled");
    try {
/*        const result = await $fetch("http://api.football-data.org/v4/competitions/2018/matches?status=SCHEDULED", {
            headers: {
                "X-Auth-Token": auth_token
            }
        });
        */
        const matches = result.matches;
        const pb_status = [];
        var competition = null;
        try {
            competition = await event.context.pb.collection('competitions').getFirstListItem(`fd_id="${result.competition.id}"`);
        } catch (err) {
            console.dir(err);
            let data = new FormData();
            data.set('name', result.competition.name);
            data.set('code', result.competition.code);
            data.set('type', result.competition.type);
            data.set('emblem', result.competition.emblem.split('/').pop());
            data.set('fd_id', result.competition.id);
            competition = await event.context.pb.collection('competitions').create(data);
            pb_status.push({ fd_id: competition.fd_id, status: 'created', date: competition.created });
            // console.log("New record:", newRecord);
        }
        if (typeof matches == "object") {
            for(var match in matches) {
                let fd_id = matches[match].id;
                let home_tla = matches[match].homeTeam.tla;
                let away_tla = matches[match].awayTeam.tla;
                let home_record = (home_tla === null) ? {id: null}: await event.context.pb.collection('teams').getFirstListItem(`code="${home_tla}"`);
                let away_record = (away_tla === null) ? {id: null}: await event.context.pb.collection('teams').getFirstListItem(`code="${away_tla}"`);
                let utc_date = new Date(Date.parse(matches[match].utcDate));
                // create data
                const data = new FormData();
                data.set('utc_date', utc_date.toISOString());
                data.set('status', matches[match].status);
                data.set('stage', matches[match].stage);
                data.set('group', matches[match].group);
                data.set('duration', matches[match].score.duration);
                data.set('team_home', home_record.id);
                data.set('team_away', away_record.id);
                data.set('competition', competition.id);
                data.set('fd_id', fd_id);
                // clear group if null
                if (matches[match].group === null) {
                    data.delete('group');
                }
                // clear teams if null
                if (home_tla === null) {
                    data.delete('team_home');
                    data.delete('team_away');
                }
                console.log(data);
                try {
                    const record = await event.context.pb.collection('matches').getFirstListItem(`fd_id="${fd_id}"`);
                    // console.log("Existing record:", record);
                    let updRecord = await event.context.pb.collection('matches').update(record.id, data);
                    pb_status.push({ fd_id: fd_id, status: 'updated', date: updRecord.updated });
                    // console.log("Updated record:", updRecord);
                } catch (err) {
                    console.dir(err);
                    let newRecord = await event.context.pb.collection('matches').create(data);
                    pb_status.push({ fd_id: fd_id, status: 'created', date: newRecord.created });
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