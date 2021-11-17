import {MongoClient} from 'mongodb';
(async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017/test',{ useUnifiedTopology: true });
  const db = client.db('test');

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
  console.log('end');
})()


function version2VersionSort(v) {
  return v.split('.').reduce(function(v_sort, num) {
    v_sort.push(num.padStart(5, 0));
    return v_sort;
  }, []).join('.');
}