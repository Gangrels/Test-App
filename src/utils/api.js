import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () =>
    this.fb
      .database()
      .ref('events')
      .once('value')
      .then((res) => res.val())

  fetchAllPeople = (lastPeople) =>{
    return this.fb
      .database()
      .ref('people')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastPeople ? lastPeople.firstName : '')
  }

  lazyFetchAllEvents = (lastEvent) =>{
    return this.fb
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.id : '')
  }

  addPeopleToFB(people) {
    const peopleRef = firebase.database().ref('/people')
    return peopleRef.push(people);
  }

  addPersonToEvent = (eventId, peopleIds) =>
    this.fb
      .database()
      .ref(`events/${eventId}/peopleIds`)
      .set(peopleIds)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()