import express from 'express'

import SessionController from './controllers/SessionController'
import ProfileController from './controllers/ProfileController' 
import IncidentController from './controllers/IncidentController'
import OngController from './controllers/OngController'

const router = express.Router()

router.post( '/sessions', SessionController.create )

router.get( '/profile', ProfileController.index )

router.get( '/incidents', IncidentController.index )
router.post( '/incidents', IncidentController.create )
router.delete( '/incidents/:id', IncidentController.remove )

router.get( '/ongs', OngController.index )
router.post( '/ongs', OngController.create )

export default router
