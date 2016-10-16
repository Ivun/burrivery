/**
 * Created by k1nval on 10/15/2016.
 */
import { firebase } from '../../config';
import {FirebaseCloudMessager} from './firebase.cm';

export const firebaseCloudMessager = new FirebaseCloudMessager(firebase.cmApiKey);
