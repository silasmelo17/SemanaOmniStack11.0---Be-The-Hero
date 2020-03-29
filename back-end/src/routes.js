const express = require('express')

const { celebrate, Segments, Joi } = require('celebrate')

const SessionController = require('./controllers/SessionController')
const ProfileController = require('./controllers/ProfileController' )
const IncidentController = require('./controllers/IncidentController')
const OngController = require('./controllers/OngController')

const router = express.Router()

router.post( '/sessions', SessionController.create )

router.get( '/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), ProfileController.index )

router.get( '/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index )

router.post( '/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), IncidentController.create )

router.delete( '/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.remove )

router.get( '/ongs', OngController.index )
router.post( '/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create )

module.exports = router
