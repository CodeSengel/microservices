// Utilisez require pour importer le service d'authentification
const platformKeyFactory = require("../services/platformService");

// Importez la méthode d'inscription depuis le service d'authentification
const { getAvailablePlatformList } = platformKeyFactory();

const getAvailablePlatform = async (req, res) => {
    console.log(' list demandé coté platform')
    try {  
        const temp = await getAvailablePlatformList(req.headers.authorization, req.headers.refreshtoken)
        res.status(200).json({ message: 'platform marche ', data : temp});
    } catch (error) {
        // Gérez les erreurs et renvoyez un code d'erreur
        res.status(500).json({ message: 'Erreur lors de l\' list demandé coté platform : ' + error });
    }
};

// Exportez le contrôleur pour l'utilisation dans d'autres fichiers
module.exports = {
    getAvailablePlatform
};
