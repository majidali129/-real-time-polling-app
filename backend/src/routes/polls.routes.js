import express from 'express'

import {getAllPolls, getPollDetails, createNewPoll} from '../controllers/poll.controller.js'

const router = express.Router()


router.route('/').get(getAllPolls);
router.route('/:id').get(getPollDetails);
router.route('/create-poll').post(createNewPoll)



export default router