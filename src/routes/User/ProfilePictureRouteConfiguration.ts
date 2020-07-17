import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { URLProfilePictureSchema, ProfilePictureSchema } from "./UserSchema";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IProfilePictureUploadController from "../../controllers/User/ProfilePicture/IProfilePictureUploadController";
import URLProfilePictureUploadController from "../../controllers/User/ProfilePicture/URLProfilePictureController";
import IProfilePictureController from "../../controllers/User/ProfilePicture/IProfilePictureController";
import ProfilePictureController from "../../controllers/User/ProfilePicture/ProfilePictureController";
import FileProfilePictureController from "../../controllers/User/ProfilePicture/FileProfilePictureController";
import multer from "multer";

const profilePictureFileHandler = multer({
    
})

export default class ProfilePictureRouteConfiguration extends RouterConfiguration {
    private urlProfilePictureUploadController : IProfilePictureUploadController;
    private profilePictureController : IProfilePictureController;
    private fileProfilePictureUploadController : IProfilePictureUploadController;

    constructor() {
        super();
        this.urlProfilePictureUploadController = new URLProfilePictureUploadController();
        this.profilePictureController = new ProfilePictureController();
        this.fileProfilePictureUploadController = new FileProfilePictureController();
    }

    public configureRoutes(): void {
        this.router.post(
            "/link",
            new ValidationMiddleware(URLProfilePictureSchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.urlProfilePictureUploadController.handleUpload())
        );

        this.router.post(
            "/file",
            profilePictureFileHandler.single("avatar"),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.fileProfilePictureUploadController.handleUpload())
        );

        this.router.get(
            "/:userId",
            new ValidationMiddleware(ProfilePictureSchema).validateParams(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Read, async (request) => {
                return [new ResourceRequest(request.params.userId, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.profilePictureController.handleGetProfilePicture())
        )
    }

}