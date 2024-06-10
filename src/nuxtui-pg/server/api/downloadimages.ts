import matches from '../../json/matches.json';
import download from 'image-downloader';

export default defineEventHandler(async (event) => {
    // console.log("GET /api/downloadimages");
    const img_dl = [];
    if (typeof matches == "object") {
        for(var match in matches) {
            let { tla } = matches[match].homeTeam;
            let options = {
                url: matches[match].homeTeam.crest,
                dest: '../../public/assets/' + tla.toLowerCase() + '.' + matches[match].homeTeam.crest.split('.').pop()
            };
            // get image, array of promises
            img_dl.push(
                download.image(options)
            )
            // download.image(options).then(({ filename }) => {
                // console.log('Saved to', filename);
                // img_dl.push({ message: matches[match].homeTeam.crest + ' saved to ' + filename });
            // }).catch((err) => console.error(err));
        }
    }
    return (await Promise.all(img_dl)).map(({ filename }) => "Saved to " + filename);
    // return img_dl;
});