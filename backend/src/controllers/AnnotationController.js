const Annotations = require('../models/AnnotationData.js');

module.exports = {

    async read(request, response){

        //busca no banco e adiciona na const
        const AnnotationsList = await Annotations.find();

        //retorna o json que está inserido no banco
        return response.json(AnnotationsList)
    },

    async create(request,response) {
        
        const {title, notes, priority} = request.body;

        if(!notes || !title){
            return response.status(400).json({error: "Necessário um título/anotação"})
        }

        const annotationCreated = await Annotations.create({
            title,
            notes,
            priority
        })

        return response.json(annotationCreated)
    },

    async delete(request, response) {
        const { id } = request.params;

        //Procura o _id do banco que seja igual ao id fornecido
        const annotationDeleted = await Annotations.findOneAndDelete({ _id : id});

        console.log(annotationDeleted)

        if(annotationDeleted)
        {
            return response.json(annotationDeleted)
        }

        return response.status(401).json({error: 'Não foi encontrado o registro para deletar!'})

    }

}
















