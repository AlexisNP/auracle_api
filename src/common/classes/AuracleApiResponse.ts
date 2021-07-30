import { Response } from "express"

/**
 * An enum that contains all the default value for the ApiResponse class
 */
enum AuracleApiMessages {
    defaultValid = "La requête a été effectuée avec succès.",
    defaultRedirect = "La requête redirige vers une autre URL.",
    defaultClientError = "Une erreur inconnue dûe à une erreur client s'est produite",
    defaultServerError = "Une erreur serveur inconnue s'est produite, veuillez contactez l'administrateur de l'application."
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
                this.message = AuracleApiMessages.defaultValid
            }

            // HTTP Redirect ranges
            else if ((this.status >= 300) && (this.status <= 399)) {
                this.message = AuracleApiMessages.defaultRedirect
            }

            // HTTP Client Error ranges
            else if ((this.status >= 400) && (this.status <= 499)) {
                this.message = AuracleApiMessages.defaultClientError
            }

            // HTTP Server Error ranges
            else if ((this.status >= 500) && (this.status <= 599)) {
                this.message = AuracleApiMessages.defaultServerError
            }
        }
    }

    public send(res: Response): Response {
        return res.status(this.status).json(this)
    }
}
