import { createSelector } from 'reselect';

const peopleSelector = (state) => state.people;
const isDragging = (state) => state.people.isDragging;
const users = createSelector(
    peopleSelector,
    people => people.users.valueSeq().toJS()
)

const loadingPeople = createSelector(
    peopleSelector,
    people => people.loading
)

const loadedPeople = createSelector(
    peopleSelector,
    people => people.loaded
)

const peopleByIdsSelector = (state, ids) => {
    const peoples = peopleSelector(state).toJS().users;
    const arr = []

    ids.map(id =>peoples.forEach(peop => {
        if (peop.id === id) arr.push(peop) ;
    }))

    return arr;
}

const idItemSelector = (_, props) => props.item.id;

const personSelector = createSelector(
    users,
    idItemSelector,
    (state, id) => state.find(item => item.id === id)
  )

export default {
    peopleSelector,
    users,
    loadingPeople,
    loadedPeople,
    peopleByIdsSelector,
    personSelector,
    isDragging
};