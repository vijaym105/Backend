const songModel = require('../models/songs.model')
const id3 = require('node-id3')
const storageService = require('../services/storage')


async function songCreat(req, res) {

    const bufferdFile = req.file.buffer

    const tag = id3.read(bufferdFile)
    const {mood} = req.body

    const [songFile, postFile] = await Promise.all([
        storageService.uploadFiles({
            buffer: bufferdFile,
            filename: tag.title + ".mp3",
            folder: 'moodify/songs'
        }),
        storageService.uploadFiles({
            buffer: tag.image.imageBuffer,
            filename: tag.title + ".jpeg",
            folder: 'moodify/posters'
        })
    ])

    const song = await songModel.create({
        title:tag.title,
        url:songFile.url,
        ThumbnailUrl: postFile.url,
        mood
    })

     res.status(201).json({
        message: "song created and fetched successfuly",
        song
    })
}

async function getSong(req, res) {

    const { mood } = req.query

    const song = await songModel.findOne({
        mood,
    })

    res.status(200).json({
        message: "song fetched successfully.",
        song,
    })

}



module.exports = {
    songCreat,
    getSong
}