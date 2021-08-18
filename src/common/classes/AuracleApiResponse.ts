import { Response } from "express"

/**
 * An enum that contains all the default value for the ApiResponse class
 */
enum AuracleApiResponseMessages {
    defaultValid = "La requête a été effectuée avec succès.",
    default201 = "La ressource a été créée avec succès.",

    defaultAdditionnalAction = "La requête redirige vers une autre URL.",
    default301 = "La ressource n'est plus accessible à cet URI et a été déplacée de manière permanente.",
    default302 = "La ressource n'est plus accessible à cet URI et a été déplacée de manière temporaire.",

    defaultClientError = "Une erreur inconnue dûe à une erreur client s'est produite",
    default401 = "Vous n'êtes pas autorisé à consulter cette ressource car vous n'êtes pas identifié.",
    default403 = "Vous n'êtes pas autorisé à consulter cette ressource car vous n'avez pas le niveau d'authentification requis.",
    default404 = "La ressource demandée n'est pas ou plus disponible.",
    default405 = "Cette méthode n'est pas disponible pour cette ressource.",
    default409 = "La requête génère un conflit de ressource et ne peut aboutir.",

    defaultServerError = "Une erreur serveur inconnue s'est produite, veuillez contactez l'administrateur de l'application.",
}

export class AuracleApiResponse {
    public status: number
    public message?: string
    public data?: Object | Array<any>

    constructor(status: number, data?: Array<any> | Object, message?: string) {
        this.status = status
        this.data = data

        if (message) {
            this.message = message
        }
        // If a message was not provided, gets one by default
        else {
            // HTTP Valid ranges
            if ((this.status >= 200) && (this.status <= 299)) {
                this.message = AuracleApiResponseMessages.defaultValid
            }

            // HTTP Additionnal Action ranges
            else if ((this.status >= 300) && (this.status <= 399)) {
                this.message = AuracleApiResponseMessages.defaultAdditionnalAction
            }

            // HTTP Client Error ranges
            else if ((this.status >= 400) && (this.status <= 499)) {
                this.message = AuracleApiResponseMessages.defaultClientError
            }

            // HTTP Server Error ranges
            else if ((this.status >= 500) && (this.status <= 599)) {
                this.message = AuracleApiResponseMessages.defaultServerError
            }
        }
    }

    public send(res: Response): Response {
        return res.status(this.status).json(this)
    }
}
