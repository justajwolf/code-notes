import { MongoClient, ObjectId } from 'mongodb';
(async () => {
    //   const client = await MongoClient.connect('mongodb://localhost:27017/test',{ useUnifiedTopology: true });
    //   const db = client.db('test');

    // bundles
    // const bundles = await db.collection('versionbundlelogs').find({}).toArray();
    // const bulkBundles = bundles.reduce((arr, b) => {
    //   arr.push({
    //     updateOne: {
    //       filter: {_id: b._id},
    //       update: {$set: {v_sort: version2VersionSort(b.v)}},
    //     },
    //   })
    //   return arr;
    // }, []);
    // const bundleRes = await db.collection('versionbundlelogs').bulkWrite(bulkBundles);

    // releases
    // const relesaes = await db.collection('versionreleases').find({}).toArray();
    // const bulkRelesaes = relesaes.reduce((arr, b) => {
    //   arr.push({
    //     updateOne: {
    //       filter: {_id: b._id},
    //       update: {$set: {v_sort: version2VersionSort(b.v)}},
    //     },
    //   })
    //   return arr;
    // }, []);
    // const releaseRes = await db.collection('versionreleases').bulkWrite(bulkRelesaes);
    const types = [
        {
            "_id": "623888ff41a4483d9d4089e9",
            "legacy_type": 4,
            "type_id": "623888ff41a4483d9d4089e9",
            "name": "任务",
        },
        {
            "_id": "623888ff41a4483d9d4089ea",
            "legacy_type": 5,
            "type_id": "623888ff41a4483d9d4089ea",
            "name": "缺陷",
        },
        {
            "_id": "65eeffd97c8f996dfd147f36",
            "legacy_type": 3,
            "type_id": "65eeffd97c8f996dfd147f36",
            "name": "用户故事",
        }
    ]
    const result = types.map(t => {
        const id = new ObjectId(t.type_id);
        const date = id.getTimestamp();
        return [date.getTime(), date.toISOString(), t.type_id, t.name]
    }).sort((a: any, b: any) => a[0] - b[0]).map(a => a.join(" / "));
    console.log(result);
})()


function version2VersionSort(v: string) {
    return v.split('.').reduce(function (v_sort, num) {
        v_sort.push(num.padStart(5, "0"));
        return v_sort;
    }, []).join('.');
}