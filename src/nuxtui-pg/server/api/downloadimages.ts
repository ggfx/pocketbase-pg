import matches from '../../json/matches.json';
import download from 'image-downloader';

export default defineEventHandler(async (event) => {
    console.log("GET /api/downloadimages");
    if (typeof matches == "object") {
        for(var match in matches) {
            let { tla } = matches[match].homeTeam;
            let options = {
                url: matches[match].homeTeam.crest,
                dest: '../../public/assets'
            };
            // get image
            download.image(options).then(({ filename }) => {
                console.log('Saved to', filename);
            }).catch((err) => console.error(err));
        }
    }
});