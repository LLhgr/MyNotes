const Annotations = require('../models/AnnotationData.js');

module.exports = {
    async read(request, response) {
        //Seta a query que está no insominia
        const priority = request.query;

        //Busca a priority === True
        const priorityNotes = await Annotations.find(priority);

        //Retorna os elementos com priority True
        return response.json(priorityNotes)
    },

    async update(request, response) {
        const { id } = request.params;

        //Pega o registro que apresenta o id 
        const annotation = await Annotations.findOne({_id : id});

        //Toggle function
        if(annotation.priority ) {
            annotation.priority = false
        } else {
            annotation.priority = true
        }
        //Altera no banco de dados
        await annotation.save();

        return response.json(annotation)   
    }
}