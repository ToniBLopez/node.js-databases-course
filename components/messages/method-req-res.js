const express = require('express');

const response = require('../../server/query-success-or-error');
const controller = require('./controller')

const router = express.Router()

router.get('/', (req, res) => {
    const specificUserId = req.query.userId || null

    controller.getMessages(specificUserId)
        .then(messageList => {
            response.success(req, res, messageList, 200)
        })
        .catch(err => {
            response.error(req, res, 'Unexpected Error', 500, err)
        })
})

router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then(resolve => {
            response.success(req, res, resolve, 202)
        })
        .catch(err => {
            response.error(req, res, 'Información invalida', 402, `Error en el controller: Error:${err}`)
        })
})

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.updatedMessage)
        .then(data => {
            response.success(req, res, data, 202)
        })
        .catch(err => {
            response.error(req, res, 'Error interno', 304, err)
        })
})

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `User ${req.params.id} removed successfully`, 200)
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err)
        })
})

module.exports = router;