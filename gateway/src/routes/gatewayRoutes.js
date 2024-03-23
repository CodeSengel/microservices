const express = require("express");
const router = express.Router();
const axios = require("axios");

const docker = true;

// Exemple de redirection de requêtes vers un service spécifique
router.get("/tasks", async (req, res) => {
  try {
    // Appel au service task-service
    const response = await axios.get("http://localhost:3005/tasks");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Erreur lors de la récupération des tâches depuis le service task-service",
    });
  }
});

router.get("/test", async (req, res) => {
  try {
    // Appel au service task-service
    const response = await axios.get(`${process.env.SERVICETEST_URL}/test`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Erreur lors de la récupération des tâches depuis le service task-service",
    });
  }
});

// Route pour l'inscription d'un utilisateur
router.post("/register", async (req, res) => {
  console.log("la requete d'inscriotion est arrivé coté gateway");
  try {
    console.log("c est arrive debut try gateway");
    // Rediriger la requête vers le service d'authentification
    if (docker) {
      url = `http://authservice:${process.env.AUTHSERVICE_PORT}/register`;
    } else {
      url = `http://localhost:${process.env.AUTHSERVICE_PORT}/register`;
    }

    const response = await axios.post(url, req.body);

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Erreur lors de l'inscription de l'utilisateur");
  }
});

router.post("/login", async (req, res) => {
  console.log("la requete d'login est arrivé coté gateway");
  if (docker) {
    url = `http://authservice:${process.env.AUTHSERVICE_PORT}/login`;
  } else {
    url = `http://localhost:${process.env.AUTHSERVICE_PORT}/login`;
  }

  try {
    console.log("c est arrive debut try gateway");
    // Rediriger la requête vers le service d'authentification
    const response = await axios.post(url, req.body);

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Erreur lors de a connexion de l'utilisateur");
  }
});

router.get("/isloggedin", async (req, res) => {
  console.log("la requete d'isloggedin est arrivé coté gateway");
  if (docker) {
    url = `http://authservice:${process.env.AUTHSERVICE_PORT}/isloggedin`;
  } else {
    url = `http://localhost:${process.env.AUTHSERVICE_PORT}/isloggedin`;
  }

  try {
    console.log("c est arrive debut try gateway");
    // Rediriger la requête vers le service d'authentification
    const response = await axios.get(url);

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Erreur lors de l'isloggedin de l'utilisateur");
  }
});

router.get("/logout", async (req, res) => {
  console.log("la requete d'logout est arrivé coté gateway");
  try {
    // Rediriger la requête vers le service d'authentification
    if (docker) {
      url = `http://authservice:${process.env.AUTHSERVICE_PORT}/logout`;
    } else {
      url = `http://localhost:${process.env.AUTHSERVICE_PORT}/logout`;
    }

    const response = await axios.get(url);

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Erreur lors de l'logout de l'utilisateur");
  }
});

router.get("/platformlist", async (req, res) => {
  console.log("la requete platformlist est arrivé coté gateway");
  try {
    console.log("c est arrive debut try gateway");
    console.log("req.headers.authorization", req.headers.authorization);

    console.log("/////////////////////////");
    // Rediriger la requête vers le service d'authentification

    const response = await axios.get(
      `http://localhost:${process.env.PLATFORMKEYSERVICE_PORT}/platformlist`,
      {
        headers: {
          Authorization: req.headers.authorization,
          RefreshToken: req.headers.refreshtoken,
        },
      }
    );

    res.status(response.status).send(response.data);
  } catch (error) {
    console.log("errrororor", error);
    res
      .status(500)
      .send("Erreur lors de l'platformlist chaar de l'utilisateur", error);
  }
});

router.get("/platformlistpublic", async (req, res) => {
  console.log("la requete platformlistpubilc est arrivé coté gateway");
  try {
    console.log(
      "Début du traitement de la requête platformlistpubilc côté gateway"
    );

    if (docker) {
      url = `http://publicdataservice:${process.env.PUBLICDATA_PORT}/platformlistpublic`;
    } else {
      url = `http://localhost:${process.env.PUBLICDATA_PORT}/platformlistpublic`;
    }

    console.log("URL de redirection :", url);
    console.log('"***********************************************');
    const response = await axios.get(url, {});
    console.log('"***********************************************');
    console.log("Réponse du service backend :", response.data);

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(
      "Erreur lors du traitement de la requête platformlistpubilc côté gateway :",
      error
    );
    res
      .status(500)
      .send(
        "Erreur lors de la récupération de la liste des plateformes publiques"
      );
  }
});

module.exports = router;
