import App from "../../app";
import Controller from "../../interfaces/controller.interface";
import {Router} from "express";
import {IRequest, IResponse, INext} from "../../interfaces/express.interface";
import {dbQuery} from "../../utils/DB";
import authMiddleware from "../../middleware/auth.middleware";
import {getSetting} from "../../utils/Global";

class SettingsController extends App implements Controller {
    public path = '/settings'
    public router = Router()

    constructor(...props) {
        super(props)
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', authMiddleware)

        this.router.get('/public', async (req: IRequest, res: IResponse, next: INext) => {
            const settings = await dbQuery('SELECT * FROM settings')

            return res.send({
                AuthenticationMethod: getSetting(settings, 'AuthenticationMethod', 1),
                EnableEdgeComputeFeatures: getSetting(settings, 'EnableEdgeComputeFeatures', false),
                EnableTelemetry: getSetting(settings, 'EnableTelemetry', true),
                LogoURL: getSetting(settings, 'LogoURL', ""),
                OAuthLoginURI: getSetting(settings, 'LoginURI', ""),
                OAuthLogoutURI: getSetting(settings, 'LogoutURI', ""),
            })
        })

        this.router.get('/', async (req: IRequest, res: IResponse) => {
            const settings = await dbQuery('SELECT * FROM settings')

            res.send({
                AllowBindMountsForRegularUsers: getSetting(settings, 'AllowBindMountsForRegularUsers', false),
                AllowContainerCapabilitiesForRegularUsers: getSetting(settings, 'AllowContainerCapabilitiesForRegularUsers', false),
                AllowDeviceMappingForRegularUsers: getSetting(settings, 'AllowDeviceMappingForRegularUsers', false),
                AllowPrivilegedModeForRegularUsers: getSetting(settings, 'AllowPrivilegedModeForRegularUsers', false),
                AllowStackManagementForRegularUsers: getSetting(settings, 'AllowStackManagementForRegularUsers', false),
                AllowVolumeBrowserForRegularUsers: getSetting(settings, 'AllowVolumeBrowserForRegularUsers', false),
                AuthenticationMethod: getSetting(settings, 'AuthenticationMethod', 1),
                BlackListedLabels: getSetting(settings, 'BlackListedLabels', []),
                DisplayDonationHeader: getSetting(settings, 'DisplayDonationHeader', false),
                DisplayExternalContributors: getSetting(settings, 'DisplayExternalContributors', false),
                EdgeAgentCheckinInterval: getSetting(settings, 'EdgeAgentCheckinInterval', 5),
                EnableEdgeComputeFeatures: getSetting(settings, 'EnableEdgeComputeFeatures', false),
                EnableHostManagementFeatures: getSetting(settings, 'EnableHostManagementFeatures', false),
                EnableTelemetry: getSetting(settings, 'EnableTelemetry', true),
                OAuthSettings: {
                    AccessTokenURI: getSetting(settings, 'AccessTokenURI', ""),
                    AuthorizationURI: getSetting(settings, 'AuthorizationURI', ""),
                    ClientID: getSetting(settings, 'ClientID', ""),
                    LogoutURI: getSetting(settings, 'LogoutURI', ""),
                    OAuthAutoCreateUsers: getSetting(settings, 'OAuthAutoCreateUsers', false),
                    RedirectURI: getSetting(settings, 'RedirectURI', ""),
                    ResourceURI: getSetting(settings, 'ResourceURI', ""),
                    SSO: getSetting(settings, 'SSO', false),
                    Scopes: getSetting(settings, 'Scopes', ""),
                    UserIdentifier: getSetting(settings, 'UserIdentifier', ""),
                },
                LogoURL: getSetting(settings, 'LogoURL', ""),
                SnapshotInterval: getSetting(settings, 'SnapshotInterval', "5m"),
                UserSessionTimeout: getSetting(settings, 'UserSessionTimeout', "8h")
            })
        })

        this.router.put('/', async (req: IRequest, res: IResponse) => {
            const data = req.body

            for (let key in data) {
                const item = data[key]
                if (typeof item === 'object') {
                    for (let subKey in item) {
                        const query = await dbQuery(`SELECT * FROM settings WHERE key = '${subKey}'`)
                        if (query['length'] > 0) {
                            await dbQuery(`UPDATE settings SET value = '${item[subKey]}' WHERE key = '${subKey}'`)
                        } else {
                            await dbQuery(`INSERT INTO settings VALUES ('${subKey}', '${item[subKey]}')`)
                        }
                    }
                } else {
                    const query = await dbQuery(`SELECT * FROM settings WHERE key = '${key}'`)
                    if (query['length'] > 0) {
                        await dbQuery(`UPDATE settings SET value = '${data[key]}' WHERE key = '${key}'`)
                    } else {
                        await dbQuery(`INSERT INTO settings VALUES ('${key}', '${data[key]}')`)
                    }
                }
            }
            return res.send({status: 200, message: "Settings has been updated."})

        })

    }
}

export default SettingsController