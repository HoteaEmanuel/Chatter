import { Db } from 'mongodb';
module.exports = {
  async up(db: Db) {
    const duplicates = await db
      .collection('users')
      .aggregate([
        { $group: { _id: '$email', ids: { $push: '$_id' }, count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
      ])
      .toArray();

    for (const dup of duplicates) {
      const [, ...idsToRemove] = dup.ids.sort();
      await db.collection('users').deleteMany({ _id: { $in: idsToRemove } });
    }

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
};
