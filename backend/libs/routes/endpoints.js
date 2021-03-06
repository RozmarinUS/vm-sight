const express = require('express');

const router = express.Router();
const db = require('../db')
const authMiddleware = require('../middlewares/auth')
const Docker = require('dockerode');
const {getUserById} = require('../models/user')
const {getEndpoint, checkAccess} = require('../models/endpoints')
const dockerService = require('../services/docker')

router.use('/', authMiddleware)

router.get('/', async (req, res) => {
    const user = await getUserById(req.user.id);
    if (user.role === 1) {
        db.query('SELECT * FROM endpoints').then(async (endpoints) => {
            if (endpoints.length > 0) {
                let arr = [];
                for (const endpointQ of endpoints) {
                    if (endpointQ.type === 1) {
                        const docker = await dockerService.connect(endpointQ.id)
                        const endpoint = await dockerService.getEndpoint(docker.endpoint, docker.service)
                        arr.push(endpoint)
                    }
                }
                return res.send(arr)
            } else {
                return res.send([])
            }
        })
    } else {
        return res.send([])
    }
})

router.get('/:id', async (req, res) => {
    const docker = await dockerService.connect(req.params.id)
    const endpoint = await dockerService.getEndpoint(docker.endpoint, docker.service)
    return res.send(endpoint)
})

/*
router.get('/', async (req, res) => {
    const user = await getUserById(req.user.id);
    if (user.role === 1) {
        db.query('SELECT * FROM endpoints').then((endpoints) => {
            const promises = endpoints
                .map((endpoint) => {
                    // DOCKER
                    if (endpoint.type === 1) {

                        const docker = dockerService.connect(endpoint)

                        return dockerService.getInfo(docker).then((r) => {

                            const {ServerVersion, Images, ContainersRunning, } = r;

                            const result = {
                                Id: endpoint.id,
                                Name: endpoint.name,
                                Type: endpoint.type,
                                URL: endpoint.url,
                                GroupId: endpoint.groupId,
                                Stat: {
                                    DockerVersion: ServerVersion,
                                    ImageCount: Images,
                                    RunningContainerCount: ContainersRunning
                                },
                                Snapshots: []
                            };
                            return docker.version(undefined).then(() => {
                                result.Status = 1
                                return result;
                            }).catch(() => {
                                result.Status = 0
                                return result
                            })
                        })


                    } else if (endpoint.type === 2) {
                        // KUBERNETES
                    }
                });

            Promise.all(promises).then((results) => res.send(results))
        })
    } else {
        return res.send([])
    }
});


router.get('/snapshots', async (req, res) => {
    const user = await getUserById(req.user.id);

    if (user.role === 1) {
        db.query('SELECT * FROM endpoints').then((endpoints) => {
            endpoints.forEach((endpoint) => {
                const docker = dockerService.connect(endpoint)
                console.log(dockerService.getSnapshot(docker))
                return res.send({response: true})
            })
        })
    } else {
        return res.send([])
    }
});

router.get('/:id/docker/version', async (req, res) => {
    if (checkAccess(req.params.id)) {
        const endpoint = await getEndpoint(req.params.id)
        if (endpoint) {
            const docker = dockerService.connect(endpoint)
            return res.send(await dockerService.getVersion(docker))
        }
    } else {
        return res.status(403).send({msg: "Forbidden"})
    }
})

router.get('/:id/docker/info', async (req, res) => {
    if (checkAccess(req.params.id)) {
        const endpoint = await getEndpoint(req.params.id)
        if (endpoint) {
            const docker = dockerService.connect(endpoint)
            return res.send(await dockerService.getInfo(docker))
        }
    } else {
        return res.status(403).send({msg: "Forbidden"})
    }
})

router.get('/:id/docker/containers/json', async (req, res) => {
    if (checkAccess(req.params.id)) {
        const endpoint = await getEndpoint(req.params.id)
        if (endpoint) {
            const docker = dockerService.connect(endpoint)
            return res.send(await dockerService.getContainers(docker))
        }
    } else {
        return res.status(403).send({msg: "Forbidden"})
    }
})
*/
module.exports = router;
