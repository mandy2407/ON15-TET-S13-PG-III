const noteSchema = require("../models/noteSchema");
const NoteSchema = require("../models/noteSchema");

const getAll = async (req, res) => {
    try {
        const allNotes = await NoteSchema.find();
        res.status(200).send(allNotes)
    } catch (err) {
        console.error(err)
    }
}

const createNote = async (req, res) => {
    //const { autor, title } = req.body;
    try {
        if (!req.body.author || !req.body.title) {
            res.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })
        }

        const newNote = new NoteSchema({
            //_id: new mongoose.Schema.Types.ObjectId,
            author: req.body.author,
            title: req.body.title,
            createdAt: new Date()
        })
        console.log("NOVA NOTA", newNote)

        const savedNote = await newNote.save()

        if (savedNote) {
            res.status(201).send({
                "message": "Nota criada com sucesso",
                savedNote
            })
        }

    } catch (err) {
        console.error(err);
    }
}

const updateNote = async (req, res) => {
    try {
        // atualizar o documento a partir id
        // receber esse id da requisição
        // encontrar o documento que possui aquele id
        const findNote = await NoteSchema.findById(req.params.id)

        if (!findNote) {
            res.status(404).send({
                "message": "Nota não encontrada",
                "statusCode": 404
            })
        }

        // confiro as informações atualizadas
        findNote.author = req.body.author || findNote.author
        findNote.title = req.body.title || findNote.title

        // salvo as atualizações

        const savedNote = await findNote.save()
        // envio a resposta
        res.status(200).send({
            "message": "Nota atualizada com sucesso",
            savedNote
        })

    } catch (err) {
        console.error(err)
    }

}

const deleteNote = async (req, res) => {
    const findNote = await NoteSchema.findById(req.params.id)

    try {
        await findNote.delete()

        resp.status(200).send({
            "message": "Nota deletada",
            findNote
        })
    } catch (err) {
        console.error(err);
    }
    await findNote.delete()

    resp.status(200).send({
        "message": "Nota deletada",
        findNote
    })
};

module.exports = {
    getAll,
    createNote,
    updateNote,
    deleteNote
}