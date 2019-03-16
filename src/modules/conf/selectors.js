import { createSelector } from 'reselect'

const getConfPart = (state) => state.conf;
const getConfs = (state) => state.conf.conferences;
const loadingConfs = (state) => state.conf.loading;
const loadedConfs = (state) => state.conf.loaded;

const getConfsFromImmutable = createSelector(
    getConfs,
    items => items.toJS()
)

const selectedIdsSelector = createSelector(
    getConfPart,
    (state) => state.selected
  )

const eventListSelector = createSelector(
    getConfs,
    (entities) => entities.toArray()
)

const getSelectedEvents = createSelector(
    selectedIdsSelector,
    eventListSelector,
    (id, events) => {
        return events.filter(event => id.has(event.id))
    }
)


export default{
    getConfPart,
    getConfs,
    loadingConfs,
    loadedConfs,
    getConfsFromImmutable,
    selectedIdsSelector,
    eventListSelector,
    getSelectedEvents
}