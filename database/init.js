db.createCollection('user');
db.user.insertOne(
    {
        username:'myuser',
        password:'password',
        email:'email@provider.com',
        subscribedAt: new Date()
    }
);
