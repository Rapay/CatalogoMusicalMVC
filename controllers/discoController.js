const { Disco, Artista, Genero, Faixa } = require('../models');

module.exports = {
    async listar(req, res) {
        const discos = await Disco.findAll({ include: [Artista, Genero, Faixa] });
        res.render('discos/lista', { discos });
    },

    async criar(req, res) {
        const { titulo, anoLancamento, capa, generos, artistas, faixas } = req.body;

        const disco = await Disco.create({ titulo, anoLancamento, capa });
        if (generos) await disco.setGeneros(generos);
        if (artistas) await disco.setArtistas(artistas);
        if (faixas) await Promise.all(faixas.map(f => Faixa.create({ ...f, DiscoId: disco.id })));

        res.redirect('/discos');
    },

    async deletar(req, res) {
        const { id } = req.params;
        await Disco.destroy({ where: { id } });
        res.redirect('/discos');
    }
};
