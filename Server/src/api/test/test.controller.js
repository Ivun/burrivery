import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Test } from '.'
import {firebaseCloudMessager} from '../../services/firebase'

export const create = ({ bodymen: { body } }, res, next) =>
  Test.create(body)
    .then((test) => test.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Test.find(query, select, cursor)
    .then((tests) => tests.map((test) => test.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? test.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? _.merge(test, body).save() : null)
    .then((test) => test ? test.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? test.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const sendNotification = ({params:{token,title,body}}, res, next) => {
  firebaseCloudMessager.sendMessage(token, title, body)
  return Promise.resolve('notification request has been sent').then(success(res));
}
