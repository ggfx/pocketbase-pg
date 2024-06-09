// plugins/pocketbase.js
import PocketBase from 'pocketbase';

const runtimeConfig = useRuntimeConfig();
const pb_api = runtimeConfig.pbApi;
const pb = new PocketBase(pb_api);
// console.log(runtimeConfig);
// console.log(pb);
export default defineEventHandler(async(event)=> {
//  console.log("Authenticate");
  event.context.authData = await pb.admins.authWithPassword(runtimeConfig.pbUser, runtimeConfig.pbPass);
  console.log(event.context.authData);
  event.context.pb = pb;
})