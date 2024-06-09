export default defineEventHandler(async (event) => {
//    console.log("GET /api/competitions");
    try {
//        console.log("Find competitions");
        const records = await event.context.pb.collection('competitions').getFullList();
        return records;
    } catch (err) {
        console.dir(err);
        event.node.res.statusCode = 500;
        return {
            code: "ERROR",
            message: "Something went wrong.",
        };
    }
});