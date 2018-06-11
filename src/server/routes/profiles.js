const mongoose = require('mongoose');
const Profile = mongoose.model('profiles');
const User = mongoose.model('users');
const { passPort } = require('../shared/middlewares');
const { profileValidator, expValidator, eduValidator } = require('../shared/validators');

const getProfileBy = async (res, param) => {
    const profile = await Profile.findOne(param).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(404).json({ error: 'profile not found for user' });
    return res.json(profile);
}

module.exports = (router) => {
    router.get('/profile', passPort, (req, res) => {
        return getProfileBy(res, { user: req.user.id });
    });
    router.get('/profile/all', async (req, res) => {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(404).json({error: 'there are no profiles'});
        return res.json(profiles);
    });

    router.get('/profile/user/:id', (req, res) => {
        return getProfileBy(res, { user: req.user.id });
    });

    router.get('/profile/handle/:handle', (req, res) => {
        return getProfileBy(res, { handle: req.params.handle });
    });

    router.post('/profile/experience', [passPort, expValidator], async () => {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ error: 'profile not found for user' });
        const exp = Object.assign({}, req.body);
        profile.experience.unshift(exp);
        profile = await profile.save();
        return res.json(profile);
    });

    router.post('/profile/education', [passPort, eduValidator], async () => {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ error: 'profile not found for user' });
        const edu = Object.assign({}, req.body);
        profile.education.unshift(edu);
        profile = await profile.save();
        return res.json(profile);
    });

    // create or update route.
    router.post('/profile', [passPort, profileValidator], async (req, res) => {
        const params = Object.assign({ user: req.user.id }, req.body);
        if (params.skills) params.skills = params.skills.split(',');
        params.social = {};
        if (params.youtube) params.social.youtube = params.youtube;
        if (params.twitter) params.social.twitter = params.twitter;
        if (params.facebook) params.social.facebook = params.facebook;
        if (params.linkedin) params.social.linkedin = params.linkedin;
        if (params.instagram) params.social.instagram = params.instagram;

        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: params }, { new: true });
        } else {
            profile = await Profile.findOne({ handle: params.handle });
            if (profile) return res.status(400).json({ error: 'profile with handle exists' })
            profile = new Profile(params);
            profile = await profile.save();
        };
        return res.json(profile);
    });

    router.delete('/profile/experience/:id', passPort, async (req, res) => {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ error: 'profile not found for user' });
        const removeIndex = profile.experience.findIndex(e => e.id === req.params.id);
        if (removeIndex === -1) return res.status(400).json({error: 'experience does not exist'});
        profile.experience.splice(removeIndex, 1);
        profile = await profile.save();
        return res.json(profile);
    });

    router.delete('/profile/education/:id', passPort, async (req, res) => {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ error: 'profile not found for user' });
        const removeIndex = profile.education.findIndex(e => e.id === req.params.id);
        if (removeIndex === -1) return res.status(400).json({error: 'education does not exist'});
        profile.education.splice(removeIndex, 1);
        profile = await profile.save();
        return res.json(profile);
    });

    router.delete('/profile', passPort, async (req, res) => {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        return res.json({success: true});
    });
}
