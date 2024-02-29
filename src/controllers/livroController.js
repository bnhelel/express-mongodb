import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
          res.status(500).json({message:  `${erro.message} - falha na requisiçao do livro`})  
        }    
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso", livro: novoLivro });   
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro`  });

        } 
    }
    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "livro atualizado"}); 
        }   catch (erro) {
            res.status(500).json({message:  `${erro.message} - falha na atualização do livro`});
        }    
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "livro excluído com sucesso"}); 
        }   catch (erro) {
            res.status(500).json({message:  `${erro.message} - falha na exclusão do livro`});
        }    
    };


    static async listarLivroPorEditora (req, res) {
        const editora = req.query.editora
        try {
            const livrosPorEdiora = await livro.find({editora: editora});
            res.status(200).json(livrosPorEdiora);
        } catch (erro) {
            res.status(500).json({message:  `${erro.message} - falha na busca`});  
        }
    }
};

export default LivroController